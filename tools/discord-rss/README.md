# Discord RSS POC

POC local para transformar mensagens espelhadas do Discord em RSS consumido pelo FreshRSS.

## Fluxo

```text
Canal Announcement do jogo
-> Seguir
-> servidor proprio / canal do jogo
-> bot autorizado nesse servidor
-> http://localhost:8090/discord/<jogo>.xml
-> FreshRSS
```

## Setup

1. Instale dependencias:

```powershell
npm install
```

2. Crie `.env` a partir de `.env.example`:

```text
DISCORD_BOT_TOKEN=<token do bot>
PORT=8090
FEED_SITE_URL=http://localhost:8090
DATA_FILE=./data/messages.json
CHANNELS_FILE=./channels.json
```

Nao commitar `.env`.

Se rodar via Docker Compose de `docker/freshrss/compose.yml`, crie `discord_token.txt` com apenas o token:

```text
<token do bot>
```

O Compose monta esse arquivo como secret em `/run/secrets/discord_bot_token`.

3. Rode sem Discord real para validar RSS:

```powershell
npm run seed
npm start
```

Abra `http://localhost:8090` para ver lista de feeds.

4. Canais configurados no servidor `rss`:

```text
#battlebit -> /discord/battlebit.xml
#mage-arena -> /discord/mage-arena.xml
#project-reality -> /discord/project-reality.xml
#operation-harsh-doorstop -> /discord/operation-harsh-doorstop.xml
#survive-the-nights -> /discord/survive-the-nights.xml
#beta-decay -> /discord/beta-decay.xml
#expresslane -> /discord/expresslane.xml
#totem-arts -> /discord/totem-arts.xml
```

Os IDs ficam em `channels.json`. Para adicionar jogo novo, crie canal no Discord e adicione item com `slug`, `title` e `channel_id`.

5. Crie app/bot no Discord Developer Portal, convide para esse servidor, copie o token para `.env` e rode `npm start`.

6. Em cada canal Announcement original, clique `Seguir` e escolha o canal do jogo correspondente no servidor `rss`.

## Permissoes Discord

- Bot autorizado apenas no servidor proprio.
- Intents necessarios: `Guilds`, `GuildMessages`, `Message Content Intent`.
- Nao usar token pessoal, self-bot, scraping ou curl autenticado.

## FreshRSS

Adicionar feed:

```text
http://host.docker.internal:8090/discord/battlebit.xml
http://host.docker.internal:8090/discord/mage-arena.xml
http://host.docker.internal:8090/discord/project-reality.xml
http://host.docker.internal:8090/discord/operation-harsh-doorstop.xml
http://host.docker.internal:8090/discord/survive-the-nights.xml
http://host.docker.internal:8090/discord/beta-decay.xml
http://host.docker.internal:8090/discord/expresslane.xml
http://host.docker.internal:8090/discord/totem-arts.xml
```

Se abrir FreshRSS fora do Docker, troque `host.docker.internal` por `localhost`.

Se FreshRSS e `discord-rss` estiverem no mesmo Docker Compose, prefira URL interna:

```text
http://discord-rss:8090/discord/battlebit.xml
```

## Testes e smokecheck

Rodar validacao local:

```powershell
npm run check
```

Esse comando faz:

- `node --check` nos scripts principais, validando sintaxe.
- `node --test test/*.test.js`, validando comportamento minimo.

Cobertura atual:

- `channels.json` tem 8 canais, slugs unicos e IDs unicos.
- `feedPath()` gera URL estavel por jogo.
- `messagesForChannel()` separa mensagens por canal destino.
- `buildFeed()` gera XML com titulo, guid, conteudo e link esperados.
- `titleFor()` e `renderDescription()` preservam texto util de embeds/anexos.

## Posts demo

Para criar posts falsos sem apagar mensagens reais:

```powershell
npm run demo
```

Isso adiciona 1 item demo por jogo em `data/messages.json`. Como `tools/discord-rss/data` e montado no Docker Compose, o container passa a servir esses itens nos feeds.

Depois, atualize os feeds no FreshRSS para ver os novos itens imediatamente.
