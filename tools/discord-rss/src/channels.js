const fs = require('node:fs');

function readChannels(filePath) {
  const channels = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const seenSlugs = new Set();
  const seenIds = new Set();

  for (const channel of channels) {
    if (!channel.slug || !channel.title || !channel.channel_id) {
      throw new Error('Cada canal precisa de slug, title e channel_id.');
    }
    if (seenSlugs.has(channel.slug)) throw new Error(`Slug duplicado: ${channel.slug}`);
    if (seenIds.has(channel.channel_id)) throw new Error(`channel_id duplicado: ${channel.channel_id}`);
    seenSlugs.add(channel.slug);
    seenIds.add(channel.channel_id);
  }

  return channels;
}

function channelById(channels) {
  return new Map(channels.map((channel) => [channel.channel_id, channel]));
}

module.exports = {
  channelById,
  readChannels,
};
