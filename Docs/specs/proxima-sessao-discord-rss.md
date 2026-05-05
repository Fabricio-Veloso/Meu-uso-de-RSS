# Proxima sessao: Discord espelhado para RSS

## Objetivo da sessao

Fazer prova de conceito para transformar anuncios espelhados do Discord em feed RSS local consumido pelo FreshRSS.

## Contexto rapido

- FreshRSS local esta rodando em `http://localhost:8080` via Docker Compose.
- Compose e scripts estao em `docker/freshrss/`.
- OPML inicial esta em `Docs/import/inoreader-feeds-iniciais.opml`.
- Usuario prefere FreshRSS por privacidade/controle, mas ainda esta testando incomodos.
- Embeds YouTube dentro do FreshRSS podem falhar; decisao atual e abrir video original quando valer a pena.
- Canais Discord desejados possuem `Seguir`, o que permite espelhar anuncios para servidor proprio.

## Ler primeiro

1. `Docs/tracking/WORKBOARD.md`
2. `Docs/tracking/WORKBOARD-ESTRATEGICO.md`
3. `Docs/specs/discord-espelhado-para-rss.md`
4. `Docs/templates/inventario-discord.md`
5. `Docs/specs/teste-freshrss-local.md`

## Decisoes ja tomadas

- Nao usar token pessoal do Discord.
- Nao fazer curl/scraping autenticado como usuario.
- Usar apenas espelhamento oficial `Seguir`, bot autorizado e servidor proprio.
- Criterio da POC: um canal espelhado precisa aparecer no FreshRSS via RSS local.

## Perguntas para o usuario no inicio

1. Qual nome do servidor proprio criado para receber anuncios?
2. Qual canal destino foi usado? Exemplo: `#updates-games`.
3. Algum anuncio espelhado ja chegou nesse canal?
4. Preferencia para ponte local: Node.js ou Python?

## Plano da POC

1. Confirmar servidor `rss` e canais destino por jogo.
2. Criar app/bot no Discord Developer Portal.
3. Convidar bot apenas para servidor proprio.
4. Guardar token em `.env` local, sem commit.
5. Microservico local criado em `tools/discord-rss/`:
   - conecta no Discord via bot.
   - le mensagens novas do canal inbox.
   - guarda mensagens em arquivo/SQLite.
   - expõe RSS em `http://localhost:<porta>/discord/updates-games.xml`.
6. Adicionar feeds por jogo ao FreshRSS.
7. Validar item novo real no FreshRSS.

## Arquivos da POC

Criados:

```text
tools/discord-rss/
tools/discord-rss/.env.example
tools/discord-rss/README.md
tools/discord-rss/package.json
tools/discord-rss/src/
```

Nao commitar `.env` real.

## Resultado esperado

- Prova de conceito funcionando ou bloqueio claro documentado.
- Workboard atualizado com proximo passo: expandir para todos os canais ou escolher outra abordagem.

## Estado apos implementacao local

- Stack escolhida: Node.js.
- Decisao de organizacao: 1 canal espelho por jogo e 1 feed por jogo no FreshRSS.
- Feed local validado com seed (`HTTP 200`) em URLs por jogo, exemplo `http://localhost:8090/discord/battlebit.xml`.
- Canais destino configurados em `tools/discord-rss/channels.json`.
- Falta criar bot, preencher `.env` real e testar anuncio espelhado.
