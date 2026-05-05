# Uso Melhor da Internet

Projeto pessoal para reduzir dispersao e centralizar fontes importantes em um hub RSS local, com controle e privacidade.

Estado atual: FreshRSS roda localmente via Docker Compose e recebe feeds comuns mais uma ponte Discord -> RSS para canais de anuncios de jogos.

## Objetivo

- Centralizar noticias, updates e fontes recorrentes em um unico leitor.
- Reduzir abertura direta de YouTube, Steam e Discord.
- Manter dados e automacoes localmente sempre que viavel.
- Evitar tecnicas inseguras ou contra termos, como token pessoal Discord, self-bot ou scraping autenticado.

## Arquitetura Atual

```text
Fontes RSS/OPML
-> FreshRSS local

Discord Announcement Channels
-> Seguir
-> servidor Discord proprio `rss`
-> canais por jogo
-> bot autorizado `RSS Bridge`
-> servico local `discord-rss`
-> feeds RSS por jogo
-> FreshRSS
```

Servicos Docker atuais:

- `freshrss`: leitor RSS em `http://localhost:8080`.
- `discord-rss`: ponte Discord -> RSS em `http://localhost:8090`.

## Estrutura Importante

```text
docker/freshrss/
  compose.yml
  start.ps1
  stop.ps1
  logs.ps1
  README.md

tools/discord-rss/
  channels.json
  discord_token.txt        # local, ignorado pelo git
  data/messages.json       # local, ignorado pelo git
  src/
  test/
  README.md

Docs/
  tracking/WORKBOARD.md
  tracking/WORKBOARD-ESTRATEGICO.md
  specs/
  templates/
  import/inoreader-feeds-iniciais.opml
```

## Setup Completo

### 1. Pre-requisitos

- Docker Desktop rodando.
- Docker Compose disponivel.
- Node.js 20+ apenas se for rodar testes/scripts locais fora do Docker.
- Conta Discord com permissao para criar bot e convidar bot para seu servidor proprio.

### 2. Configurar Token do Bot Discord

Crie ou confirme o bot no Discord Developer Portal:

```text
https://discord.com/developers/applications
```

Configuracao minima do bot:

- `Message Content Intent` ativado.
- Permissoes no servidor proprio: `View Channels` e `Read Message History`.
- Bot convidado apenas para o servidor proprio `rss`.

Crie o arquivo local:

```text
tools/discord-rss/discord_token.txt
```

Conteudo do arquivo: apenas o token do bot.

```text
seu_token_aqui
```

Nao use `DISCORD_BOT_TOKEN=` nesse arquivo. Nao commitar esse arquivo.

### 3. Conferir Canais Discord

O arquivo `tools/discord-rss/channels.json` mapeia cada jogo para um canal do servidor `rss`.

Canais atuais:

```text
#battlebit
#mage-arena
#project-reality
#operation-harsh-doorstop
#survive-the-nights
#beta-decay
#expresslane
#totem-arts
```

Regra adotada: 1 canal espelho por jogo e 1 feed por jogo no FreshRSS.

Se um jogo tiver varios canais originais uteis, siga todos para o mesmo canal do jogo no servidor `rss`.

### 4. Subir Tudo

Na raiz do projeto:

```powershell
./docker/freshrss/start.ps1
```

Equivalente:

```powershell
docker compose -f "docker/freshrss/compose.yml" up -d --build
```

Abrir FreshRSS:

```text
http://localhost:8080
```

Ver lista de feeds Discord no navegador do Windows:

```text
http://localhost:8090
```

### 5. Importar OPML Inicial

No FreshRSS, importar:

```text
Docs/import/inoreader-feeds-iniciais.opml
```

### 6. Adicionar Feeds Discord no FreshRSS

Como FreshRSS e `discord-rss` rodam no mesmo Docker Compose, use as URLs internas:

```text
http://discord-rss:8090/discord/battlebit.xml
http://discord-rss:8090/discord/mage-arena.xml
http://discord-rss:8090/discord/project-reality.xml
http://discord-rss:8090/discord/operation-harsh-doorstop.xml
http://discord-rss:8090/discord/survive-the-nights.xml
http://discord-rss:8090/discord/beta-decay.xml
http://discord-rss:8090/discord/expresslane.xml
http://discord-rss:8090/discord/totem-arts.xml
```

Tipo de feed no FreshRSS:

```text
RSS / Atom (default)
```

Categoria sugerida:

```text
Games
```

## Uso Diario

Subir:

```powershell
./docker/freshrss/start.ps1
```

Parar:

```powershell
./docker/freshrss/stop.ps1
```

Ver logs:

```powershell
./docker/freshrss/logs.ps1
```

Ver logs apenas da ponte Discord:

```powershell
docker compose -f "docker/freshrss/compose.yml" logs -f discord-rss
```

Atualizacao dos feeds:

- FreshRSS atualiza automaticamente pelo cron `*/20`.
- Para ver algo na hora, clique em atualizar no FreshRSS.
- O servico `discord-rss` precisa estar rodando para FreshRSS conseguir buscar os feeds Discord.

## Smokecheck e Testes

Entrar na pasta da ponte:

```powershell
cd tools/discord-rss
```

Rodar validacao minima:

```powershell
npm run check
```

Esse comando valida:

- sintaxe dos scripts principais.
- `channels.json` com slugs e IDs unicos.
- URL estavel por jogo.
- filtro de mensagens por canal/jogo.
- XML RSS com titulo, conteudo, GUID e link.
- fallback de texto para embeds/anexos.

Criar posts demo sem apagar mensagens reais:

```powershell
npm run demo
```

Depois atualize os feeds no FreshRSS para ver os posts demo.

## Como a Ponte Discord Funciona

1. Canais Announcement dos servidores originais sao seguidos para canais do servidor proprio `rss`.
2. Bot `RSS Bridge` le apenas canais configurados em `channels.json`.
3. Mensagens sao salvas em `tools/discord-rss/data/messages.json`.
4. `discord-rss` expoe 1 feed RSS por jogo.
5. FreshRSS assina esses feeds.

Nao usado:

- token pessoal Discord.
- self-bot.
- scraping de cliente web logado.
- curl autenticado como usuario.

## Manutencao

Adicionar novo jogo Discord:

1. Criar canal no servidor `rss`, exemplo `#novo-jogo`.
2. Copiar ID do canal.
3. Adicionar item em `tools/discord-rss/channels.json`.
4. Rebuildar ponte:

```powershell
docker compose -f "docker/freshrss/compose.yml" up -d --build discord-rss
```

5. Adicionar novo feed no FreshRSS:

```text
http://discord-rss:8090/discord/novo-jogo.xml
```

Resetar token do bot:

1. Resetar no Discord Developer Portal.
2. Substituir conteudo de `tools/discord-rss/discord_token.txt`.
3. Reiniciar ponte:

```powershell
docker compose -f "docker/freshrss/compose.yml" restart discord-rss
```

## Estado Atual

- FreshRSS local funcionando em Docker.
- OPML inicial importado/testado.
- Ponte Discord -> RSS integrada ao mesmo Docker Compose.
- Bot conectou como `RSS Bridge` e sincronizou 8 canais.
- Feeds Discord por jogo foram adicionados/testados no FreshRSS.
- Suite minima de smokecheck criada com `node:test`.
- Posts demo funcionam para validacao manual.
- Pendente principal: observar anuncios reais chegando ao longo do tempo e ajustar fontes ruidosas.

## Docs de Referencia

- `docker/freshrss/README.md`: detalhes do Compose FreshRSS.
- `tools/discord-rss/README.md`: detalhes da ponte Discord RSS.
- `Docs/tracking/WORKBOARD.md`: trabalho operacional atual.
- `Docs/tracking/WORKBOARD-ESTRATEGICO.md`: frentes estrategicas.
- `Docs/specs/discord-espelhado-para-rss.md`: decisao tecnica Discord -> RSS.
- `Docs/specs/teste-freshrss-local.md`: setup/teste FreshRSS local.
