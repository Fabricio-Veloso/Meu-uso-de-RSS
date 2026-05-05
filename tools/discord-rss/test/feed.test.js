const assert = require('node:assert/strict');
const test = require('node:test');

const { channelById, readChannels } = require('../src/channels');
const { buildFeed, feedPath, messagesForChannel, renderDescription, titleFor } = require('../src/server');

const channels = readChannels('./channels.json');

test('channels.json tem slugs e ids unicos', () => {
  assert.equal(channels.length, 8);
  assert.equal(new Set(channels.map((channel) => channel.slug)).size, channels.length);
  assert.equal(new Set(channels.map((channel) => channel.channel_id)).size, channels.length);
  assert.equal(channelById(channels).get('1501061040191045763').slug, 'battlebit');
});

test('feedPath gera URL estavel por jogo', () => {
  assert.equal(feedPath(channels[0]), '/discord/battlebit.xml');
  assert.equal(feedPath(channels[2]), '/discord/project-reality.xml');
});

test('messagesForChannel separa mensagens por canal destino', () => {
  const messages = [
    { message_id: '1', channel_id: channels[0].channel_id },
    { message_id: '2', channel_id: channels[1].channel_id },
    { message_id: '3', channel_id: channels[0].channel_id },
  ];

  assert.deepEqual(messagesForChannel(messages, channels[0]).map((message) => message.message_id), ['1', '3']);
});

test('buildFeed inclui titulo, guid e conteudo esperado', () => {
  const xml = buildFeed(channels[0], [
    {
      message_id: 'msg-1',
      channel_id: channels[0].channel_id,
      author_name: 'Tester',
      content: 'Patch notes disponivel',
      created_at: '2026-05-05T00:00:00.000Z',
      jump_url: 'https://discord.com/channels/test/msg-1',
      embeds: [
        {
          title: 'Patch 1.0',
          description: 'Correcoes e melhorias.',
          url: 'https://example.com/patch',
        },
      ],
      attachments: [],
    },
  ]);

  assert.match(xml, /Discord - BattleBit Remastered/);
  assert.match(xml, /Patch notes disponivel/);
  assert.match(xml, /msg-1/);
  assert.match(xml, /https:\/\/discord.com\/channels\/test\/msg-1/);
});

test('titulo e descricao preservam fallback util', () => {
  const message = {
    author_name: 'Discord',
    content: '',
    embeds: [{ title: 'Anuncio embed', description: 'Detalhe', url: 'https://example.com' }],
    attachments: [{ name: 'image.png', url: 'https://example.com/image.png' }],
  };

  assert.equal(titleFor(message), '[Discord] Discord - Anuncio embed');
  assert.match(renderDescription(message), /Anuncio embed/);
  assert.match(renderDescription(message), /image.png/);
});
