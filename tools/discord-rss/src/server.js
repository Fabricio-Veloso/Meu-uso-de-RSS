require('dotenv').config();

const fs = require('node:fs');
const express = require('express');
const RSS = require('rss');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { channelById, readChannels } = require('./channels');
const { readMessages, upsertMessage } = require('./store');

function readToken() {
  if (process.env.DISCORD_BOT_TOKEN) return process.env.DISCORD_BOT_TOKEN;
  if (process.env.DISCORD_BOT_TOKEN_FILE) {
    return fs.readFileSync(process.env.DISCORD_BOT_TOKEN_FILE, 'utf8').trim();
  }
  return undefined;
}

const config = {
  token: readToken(),
  port: Number(process.env.PORT || 8090),
  feedSiteUrl: process.env.FEED_SITE_URL || 'http://localhost:8090',
  dataFile: process.env.DATA_FILE || './data/messages.json',
  channelsFile: process.env.CHANNELS_FILE || './channels.json',
};

const channels = readChannels(config.channelsFile);
const channelsById = channelById(channels);

function textFromEmbed(embed) {
  const parts = [embed.title, embed.description, embed.url].filter(Boolean);
  return parts.join('\n');
}

function messageToRecord(message) {
  const embeds = message.embeds.map((embed) => ({
    title: embed.title,
    description: embed.description,
    url: embed.url,
  }));

  const attachments = [...message.attachments.values()].map((attachment) => ({
    name: attachment.name,
    url: attachment.url,
  }));

  return {
    message_id: message.id,
    channel_id: message.channelId,
    author_name: message.author?.username || 'Discord',
    content: message.content || '',
    created_at: message.createdAt.toISOString(),
    jump_url: message.url,
    embeds,
    attachments,
  };
}

function renderDescription(message) {
  const lines = [];
  if (message.content) lines.push(message.content);
  for (const embed of message.embeds || []) {
    const text = textFromEmbed(embed);
    if (text) lines.push(text);
  }
  for (const attachment of message.attachments || []) {
    lines.push(`${attachment.name || 'attachment'}: ${attachment.url}`);
  }
  return lines.join('\n\n') || 'Mensagem sem texto; abrir no Discord.';
}

function titleFor(message) {
  const firstLine = (message.content || message.embeds?.[0]?.title || 'novo anuncio')
    .split('\n')[0]
    .trim()
    .slice(0, 90);
  return `[Discord] ${message.author_name} - ${firstLine}`;
}

function feedPath(channel) {
  return `/discord/${channel.slug}.xml`;
}

function buildFeed(channel, messages) {
  const feed = new RSS({
    title: `Discord - ${channel.title}`,
    description: `Mensagens espelhadas do Discord para ${channel.title}.`,
    feed_url: `${config.feedSiteUrl}${feedPath(channel)}`,
    site_url: config.feedSiteUrl,
    language: 'pt-BR',
  });

  for (const message of messages) {
    feed.item({
      title: titleFor(message),
      description: renderDescription(message),
      url: message.jump_url || config.feedSiteUrl,
      guid: message.message_id,
      date: message.created_at,
      author: message.author_name,
    });
  }

  return feed.xml({ indent: true });
}

function messagesForChannel(messages, channel) {
  return messages.filter((message) => message.channel_id === channel.channel_id);
}

function startHttp() {
  const app = express();

  app.get('/', (_request, response) => {
    const lines = channels.map((channel) => `${channel.title}: ${feedPath(channel)}`);
    response.type('text/plain').send(`Feeds:\n${lines.join('\n')}\n`);
  });

  for (const channel of channels) {
    app.get(feedPath(channel), (_request, response) => {
      const messages = messagesForChannel(readMessages(config.dataFile), channel);
      response.type('application/rss+xml').send(buildFeed(channel, messages));
    });
  }

  app.listen(config.port, () => {
    console.log(`RSS local em http://localhost:${config.port}`);
    for (const channel of channels) {
      console.log(`- ${channel.title}: http://localhost:${config.port}${feedPath(channel)}`);
    }
  });
}

async function startDiscordBot() {
  if (!config.token) {
    console.log('Discord bot desativado: configure DISCORD_BOT_TOKEN no .env.');
    return;
  }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    partials: [Partials.Channel],
  });

  async function saveRecentMessages(source) {
    const discordChannel = await client.channels.fetch(source.channel_id);
    if (!discordChannel?.isTextBased()) {
      throw new Error(`Canal ${source.channel_id} nao e canal de texto acessivel pelo bot.`);
    }

    const recent = await discordChannel.messages.fetch({ limit: 50 });
    for (const message of recent.values()) {
      upsertMessage(config.dataFile, messageToRecord(message));
    }
    console.log(`${source.title}: historico recente sincronizado (${recent.size} mensagens lidas).`);
  }

  client.on('messageCreate', (message) => {
    if (!channelsById.has(message.channelId)) return;
    const saved = upsertMessage(config.dataFile, messageToRecord(message));
    if (saved) console.log(`Mensagem salva: ${message.id}`);
  });

  client.once('clientReady', async () => {
    console.log(`Bot conectado como ${client.user.tag}; lendo ${channels.length} canais.`);
    for (const source of channels) {
      await saveRecentMessages(source);
    }
  });

  await client.login(config.token);
}

if (require.main === module) {
  startHttp();
  startDiscordBot().catch((error) => {
    console.error(`Falha ao iniciar bot Discord: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  buildFeed,
  feedPath,
  messagesForChannel,
  renderDescription,
  startDiscordBot,
  startHttp,
  titleFor,
};
