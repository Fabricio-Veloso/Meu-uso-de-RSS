# Workboard operacional

## Objetivo

Registrar trabalho ativo ou imediatamente proximo.

Workboard estrategico: `Docs/tracking/WORKBOARD-ESTRATEGICO.md`.

## Spec curta da rodada atual

- objetivo: testar FreshRSS local como hub principal e validar POC Discord espelhado para RSS.
- contexto atual: FreshRSS local esta rodando; Inoreader validou o valor do fluxo, mas FreshRSS parece melhor para privacidade/controle.
- entrada: OPML inicial importado, FreshRSS ativo, canais Discord desejados confirmados com opcao `Seguir`.
- saida esperada: servidor/canal inbox no Discord, bot autorizado, feed RSS local consumivel pelo FreshRSS com mensagem espelhada real.
- restricoes: nao usar token pessoal/curl scraping/self-bot; usar apenas canais espelhados, bot autorizado ou fonte externa publica.
- criterio de aceite: pelo menos um canal Discord espelhado gera item em RSS local e aparece no FreshRSS.

## Estado atual

- RSS foi identificado como solucao central candidata.
- FreshRSS e candidato forte para uso local/gratis.
- Inoreader/Feedly podem ser usados para teste rapido.
- Inventario inicial de jogos foi preenchido com links Steam, appids e feeds candidatos.
- Inventario inicial de Discord foi revisado com acoes sugeridas por servidor.
- Fontes profissionais iniciais foram preenchidas com feeds RSS candidatos.
- Inoreader foi usado como validacao inicial porque o teste manual mostrou melhora imediata.
- OPML inicial criado em `Docs/import/inoreader-feeds-iniciais.opml` e importado com sucesso.
- Import OPML no Inoreader pode nao fazer backfill dos feeds Steam; adicionar manualmente puxa historico antigo.
- Teste FreshRSS local foi preparado via Docker Compose em `docker/freshrss/` e container subiu com sucesso.
- FreshRSS esta acessivel em `http://localhost:8080` e foi escolhido para teste prolongado por privacidade e controle local.
- Embeds YouTube dentro do FreshRSS podem falhar por sandbox/referrer; decisao atual e abrir video original quando valer a pena.
- Canais Discord desejados suportam `Seguir`; isso habilita testar espelhamento para servidor proprio e gerar RSS.
- Ponte escolhida: microservico local Node.js com bot autorizado, em `tools/discord-rss/`.
- Decisao de organizacao: 1 canal espelho por jogo no servidor `rss`, agrupando multiplos canais originais do mesmo jogo no mesmo destino.
- POC local agora gera 1 feed por jogo em `http://localhost:8090/discord/<slug>.xml` e foi validada com seed (`HTTP 200`).
- Canais destino configurados: `#battlebit`, `#mage-arena`, `#project-reality`, `#operation-harsh-doorstop`, `#survive-the-nights`, `#beta-decay`, `#expresslane`, `#totem-arts`.
- `discord-rss` foi integrado ao Docker Compose do FreshRSS e conectou como `RSS Bridge` lendo 8 canais.
- Suite minima de testes criada; `npm run check` passou com 5 testes.
- Posts demo podem ser gerados com `npm run demo`; FreshRSS atualiza automaticamente via cron `*/20` ou manualmente na hora.

## Blocos ativos

| Bloco | Pai estrategico | Status | Prioridade | Motivo | Base atual |
| --- | --- | --- | --- | --- | --- |
| Criar servidor/canal inbox Discord | Discord para RSS | ready | alta | canais desejados suportam `Seguir`; precisa destino controlado pelo usuario | `Docs/specs/discord-espelhado-para-rss.md` |
| Testar espelhamento Discord | Discord para RSS | ready | alta | validar se novos anuncios aparecem no servidor proprio | `Docs/templates/inventario-discord.md` |
| Assinar feeds Discord no FreshRSS | Discord para RSS | pending | alta | usar URL interna `http://discord-rss:8090/discord/<slug>.xml` e validar item real | `tools/discord-rss/README.md` |
| Validar anuncio real espelhado | Discord para RSS | pending | alta | posts demo funcionam; falta observar noticia real chegando pelo fluxo `Seguir` | `tools/discord-rss/README.md` |
| Levantar canais YouTube | Inventario de fontes | ready | media | YouTube ainda e fonte de distracao e pode virar RSS por canal | `Docs/templates/inventario-fontes.md` |
| Gerar OPML de YouTube | Hub de informacao | pending | media | importar canais escolhidos sem abrir home do YouTube | `Docs/specs/expandir-fontes-inoreader.md` |
| Reimportar/adicionar jogos prioritarios manualmente | Jogos e updates | ready | media | Inoreader faz backfill manual melhor que via OPML para Steam | `Docs/templates/inventario-jogos.md` |
| Criar OPML incremental de novas fontes | Hub de informacao | pending | media | manter importacao repetivel conforme surgirem fontes | `Docs/import/` |
| Ajustar FreshRSS local | Hub de informacao | continuo | media | acompanhar incomodos, backup, filtros e rotina | `Docs/specs/teste-freshrss-local.md` |

## Blocos acompanhados como continuo

| Bloco | Pai estrategico | Status | Motivo | Base atual |
| --- | --- | --- | --- | --- |
| Revisar fontes que geram ruido | Reducao de distracoes | continuo | manter qualidade do fluxo | `Docs/estudo-inicial.md` |
| Ajustar rotina diaria/semanal | Hub de informacao | continuo | garantir que ferramenta resolva comportamento, nao so tecnologia | `Docs/estudo-inicial.md` |

## Registro externo ao workboard

- concluidos: `Docs/tracking/done/`
- specs concluidas: `Docs/specs/done/`
- itens postergados: `Docs/backlogs/produto/`

## Proxima sessao

1. Ler `Docs/estudo-inicial.md`.
2. Ler `Docs/tracking/WORKBOARD.md`.
3. Focar em `Docs/specs/discord-espelhado-para-rss.md`.
4. Confirmar que os canais por jogo existem no servidor `rss` e batem com `tools/discord-rss/channels.json`.
5. Seguir canais Announcement desejados para o canal do jogo correspondente.
6. Criar app/bot no Discord Developer Portal, habilitar intents e preencher `.env` em `tools/discord-rss/`.
7. Rodar `npm start` em `tools/discord-rss/` e confirmar mensagens reais nos feeds por jogo.
8. Assinar no FreshRSS os feeds `http://host.docker.internal:8090/discord/<slug>.xml`.
9. Registrar resultado e decidir se expande para todos os Discords.
