require('dotenv').config();

const { writeMessages } = require('./store');
const { readChannels } = require('./channels');

const dataFile = process.env.DATA_FILE || './data/messages.json';
const channelsFile = process.env.CHANNELS_FILE || './channels.json';
const channels = readChannels(channelsFile);

writeMessages(
  dataFile,
  channels.map((channel, index) => ({
    message_id: `seed-${String(index + 1).padStart(3, '0')}`,
    channel_id: channel.channel_id,
    author_name: 'Discord POC',
    content: `Item de teste para ${channel.title}: feed separado por jogo funcionando.`,
    created_at: new Date(Date.now() - index * 60_000).toISOString(),
    jump_url: 'https://discord.com/channels/@me',
    embeds: [
      {
        title: `Seed FreshRSS - ${channel.title}`,
        description: 'Use este item para validar importacao no FreshRSS.',
        url: `http://localhost:8090/discord/${channel.slug}.xml`,
      },
    ],
    attachments: [],
  }))
);

console.log(`Seed gravado em ${dataFile}`);
