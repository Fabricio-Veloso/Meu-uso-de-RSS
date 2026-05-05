require('dotenv').config();

const { readChannels } = require('./channels');
const { upsertMessage } = require('./store');

const dataFile = process.env.DATA_FILE || './data/messages.json';
const channelsFile = process.env.CHANNELS_FILE || './channels.json';
const channels = readChannels(channelsFile);
const now = Date.now();

for (const [index, channel] of channels.entries()) {
  const createdAt = new Date(now - index * 60_000).toISOString();
  upsertMessage(dataFile, {
    message_id: `demo-${channel.slug}-${now}`,
    channel_id: channel.channel_id,
    author_name: 'Discord Demo',
    content: `Post demo para ${channel.title}: smokecheck manual do feed no FreshRSS.`,
    created_at: createdAt,
    jump_url: 'https://discord.com/channels/@me',
    embeds: [
      {
        title: `Demo RSS - ${channel.title}`,
        description: `Gerado em ${createdAt}.`,
        url: `http://localhost:8090/discord/${channel.slug}.xml`,
      },
    ],
    attachments: [],
  });
}

console.log(`Posts demo adicionados em ${dataFile}: ${channels.length}`);
