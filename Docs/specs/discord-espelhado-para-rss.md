# Spec: Discord espelhado para RSS

## Objetivo

Levar anuncios importantes do Discord para o FreshRSS sem usar token pessoal, scraping ou self-bot.

## Contexto

- Muitos jogos usam Discord como `main output` de updates.
- Links `https://discord.com/channels/...` nao sao RSS e nao podem ser importados diretamente no FreshRSS.
- Usuario confirmou que os canais desejados possuem opcao `Seguir`, ou seja, sao canais de anuncio espelhaveis.
- FreshRSS local esta rodando em `http://localhost:8080` e e candidato principal por privacidade/controle.

## Decisao de seguranca

Nao usar:

- token pessoal do Discord.
- curl autenticado como usuario.
- self-bot.
- scraping de cliente web logado.

Usar apenas:

- canais de anuncio espelhados oficialmente para servidor proprio.
- bot autorizado no servidor proprio.
- servico local/self-host que leia apenas canais controlados pelo usuario.

## Fluxo desejado

```text
Servidor do jogo / canal Announcement
-> Seguir
-> Servidor proprio do usuario / canal inbox
-> Bot ou ponte local autorizada
-> Feed RSS local
-> FreshRSS
```

## Setup manual esperado no Discord

1. Criar ou confirmar servidor proprio, exemplo:

```text
RSS Inbox
```

2. Criar canal destino, exemplo:

```text
#updates-games
```

3. Em cada canal de anuncio dos servidores de jogos, clicar `Seguir`.
4. Escolher servidor proprio `RSS Inbox` e canal `#updates-games`.
5. Confirmar que novos anuncios aparecem no canal destino.

## Opcoes para gerar RSS

### Opcao A: bot local simples

Criar bot Discord autorizado apenas no servidor proprio.

Fluxo:

```text
Bot le mensagens do #updates-games -> grava SQLite/JSON -> expõe /feed.xml
```

Vantagens:

- controle total.
- dados locais.
- FreshRSS assina URL local.
- nao precisa acesso aos servidores originais, apenas ao servidor proprio.

Riscos/trabalho:

- precisa criar app/bot no Discord Developer Portal.
- precisa token de bot guardado em `.env` local fora de commit.
- precisa pequena implementacao Node/Python.

### Opcao B: ferramenta pronta/self-host

Avaliar ferramenta existente que transforme canal Discord em feed ou webhook.

Vantagens:

- menos codigo proprio.

Riscos/trabalho:

- pode exigir token/bot do mesmo jeito.
- pode ser mais complexa que microservico simples.
- pode gerar dependencia extra.

### Opcao C: manter Discord manual

Usar apenas se a ponte ficar complexa demais.

Vantagens:

- zero setup tecnico.

Riscos:

- quebra requisito de centralizar tudo no FreshRSS.
- mantem Discord como ponto de entrada.

## Recomendacao inicial

Testar Opcao A com prova de conceito minima.

Escopo da prova:

- um servidor proprio.
- um canal destino por jogo, agrupando multiplos canais originais do mesmo jogo quando necessario.
- um bot autorizado no servidor proprio.
- feed RSS local por jogo em `http://localhost:<porta>/discord/<slug>.xml`.
- FreshRSS assina cada jogo como fonte separada.

## Dados que o bot precisa guardar

Campos minimos por mensagem:

| Campo | Uso |
| --- | --- |
| message_id | evitar duplicacao |
| channel_id | origem no servidor proprio |
| author_name | contexto |
| content | corpo do item RSS |
| created_at | data do item |
| jump_url | abrir mensagem no Discord se necessario |
| embeds | preservar titulo/descricao/link quando houver |
| attachments | incluir imagens/links quando util |

## Feed RSS esperado

Um item por mensagem espelhada relevante.

Titulo sugerido:

```text
[Discord] <servidor/canal ou autor> - <primeira linha da mensagem>
```

Link sugerido:

```text
jump_url da mensagem no Discord
```

Conteudo:

```text
texto da mensagem + embeds + anexos relevantes
```

## Criterio de aceite da prova

- Nova mensagem espelhada chega no canal proprio.
- Bot registra a mensagem.
- Feed XML local abre no navegador.
- FreshRSS importa o feed.
- Item aparece no FreshRSS com link para abrir no Discord.

## Pendencias para proxima sessao

- Criar/confirmar servidor proprio e canais destino por jogo usados no Discord.
- Criar bot no Discord Developer Portal e obter token real fora do git.
- Preencher `.env` local em `tools/discord-rss/` com `DISCORD_BOT_TOKEN`.
- Conferir canais em `tools/discord-rss/channels.json`.
- Seguir pelo menos um canal Announcement para o canal destino do jogo.
- Rodar POC Node.js e validar mensagens reais no FreshRSS.

## Resultado parcial da POC

- Linguagem escolhida: Node.js.
- Arquivos criados em `tools/discord-rss/`.
- `.env.example` criado sem segredos.
- Decisao de organizacao: 1 feed por jogo no FreshRSS.
- Canais destino e IDs configurados em `tools/discord-rss/channels.json`.
- RSS local validado com seed em feeds por jogo, exemplo `http://localhost:8090/discord/battlebit.xml`.
- URL recomendada para FreshRSS em Docker: `http://host.docker.internal:8090/discord/<slug>.xml`.
- Bloqueio atual: sem token de bot e sem anuncio espelhado real.

## Estado apos Docker Compose

- `docker/freshrss/compose.yml` agora sobe `freshrss` e `discord-rss` juntos.
- `discord-rss` usa Docker secret em `tools/discord-rss/discord_token.txt` para nao expor token no compose.
- FreshRSS deve usar URL interna do Compose: `http://discord-rss:8090/discord/<slug>.xml`.
- Navegador no Windows pode usar `http://localhost:8090` para listar feeds.
- Suite minima criada em `tools/discord-rss/test/feed.test.js`.
- Smokecheck local: `npm run check`.
- Posts demo sem apagar mensagens reais: `npm run demo`.
- FreshRSS atualiza automaticamente pelo cron `*/20`; atualizar manualmente traz novidades na hora.
