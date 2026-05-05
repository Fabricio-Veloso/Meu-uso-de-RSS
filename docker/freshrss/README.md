# FreshRSS local

## Subir

```powershell
./docker/freshrss/start.ps1
```

Esse Compose tambem sobe a ponte Discord -> RSS (`discord-rss`).

Abrir:

```text
http://localhost:8080
```

## Parar

```powershell
./docker/freshrss/stop.ps1
```

## Logs

```powershell
./docker/freshrss/logs.ps1
```

## Dados persistentes

```text
docker/freshrss/data
docker/freshrss/extensions
tools/discord-rss/data
```

## Discord RSS

Antes de subir pelo Docker Compose, crie `tools/discord-rss/discord_token.txt` com apenas o token do bot:

```text
<token do bot>
```

Nao commitar esse arquivo. Ele esta no `.gitignore`.

Dentro do FreshRSS, prefira URLs internas do Compose:

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

No navegador do Windows, use `http://localhost:8090` para ver a lista de feeds.

## Atualizacao dos feeds

O FreshRSS busca os feeds sozinho pelo cron configurado:

```text
CRON_MIN=*/20
```

Ou seja, novidades devem chegar automaticamente em ate ~20 minutos enquanto o Docker Compose estiver rodando.

Para ver imediatamente, clique em atualizar no FreshRSS.

## Smokecheck Discord RSS

Rodar testes locais:

```powershell
cd tools/discord-rss
npm run check
```

Criar posts demo sem apagar mensagens reais:

```powershell
cd tools/discord-rss
npm run demo
```

Se mudar codigo da ponte, rebuildar o servico:

```powershell
docker compose -f "docker/freshrss/compose.yml" up -d --build discord-rss
```

## OPML inicial

Importar no setup web:

```text
Docs/import/inoreader-feeds-iniciais.opml
```
