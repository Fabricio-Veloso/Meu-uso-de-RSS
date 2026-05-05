# Spec: expandir fontes no leitor RSS

## Objetivo

Transformar o leitor RSS principal em hub de atualizacoes, cobrindo Steam, YouTube, fontes profissionais e Discord quando possivel.

## Decisao atual

- Inoreader foi validado como melhor que abrir Steam, Discord e YouTube diretamente.
- FreshRSS local foi instalado e sera testado por um tempo por privacidade/controle.
- Nao precisa esperar semanas para expandir fontes.

## Regra operacional

Cada fonte deve cair em uma destas categorias:

| Origem | Destino preferido | Observacao |
| --- | --- | --- |
| Steam | feed Steam por appid | bom para updates oficiais |
| YouTube | RSS oficial por channel_id | evita homepage e recomendacoes |
| Blog/site | RSS oficial | importar direto |
| Newsletter | RSS, email dedicado ou Inoreader email | avaliar caso a caso |
| Discord com anuncio espelhavel | servidor proprio -> ponte RSS -> FreshRSS | proxima frente tecnica |
| Discord sem espelhamento | excecao manual | manter so se valor claro |

## YouTube

Formato do feed:

```text
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
```

Entrada necessaria do usuario:

```text
Nome do canal - URL do canal
```

Exemplos aceitos:

```text
https://www.youtube.com/@HandleDoCanal
https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxxx
https://www.youtube.com/c/NomeDoCanal
```

Saida esperada:

- atualizar `Docs/templates/inventario-fontes.md`.
- gerar OPML incremental em `Docs/import/`.
- importar no leitor RSS principal em pasta `YouTube`.

## Discord

Discord nao deve ser tratado como RSS direto. Links de canais como `https://discord.com/channels/...` nao entram no FreshRSS/Inoreader.

Decisao nova: canais desejados possuem opcao `Seguir`, entao a proxima frente e testar espelhamento oficial para servidor proprio e gerar RSS local.

Spec propria:

```text
Docs/specs/discord-espelhado-para-rss.md
```

Para cada servidor/canal:

1. identificar jogo/projeto associado.
2. procurar Steam news por appid.
3. procurar site oficial/blog/newsletter.
4. procurar YouTube oficial e feed RSS.
5. se Discord for canal principal e tiver `Seguir`, testar espelhamento para RSS.
6. se nada funcionar, marcar excecao manual.

Excecao aceita:

```text
Discord exclusivo + baixo risco + informacao realmente util
```

Excecao rejeitada:

```text
Discord duplicado + alto ruido + update tambem aparece em Steam/site/YouTube
```

## Steam

Feed por jogo:

```text
https://store.steampowered.com/feeds/news/app/APPID/?cc=BR&l=portuguese
```

Nota Inoreader:

- importar via OPML assina os feeds.
- para alguns feeds Steam, historico antigo pode ficar zerado.
- adicionar manualmente o mesmo feed pode puxar backfill.

Acao sugerida:

- deixar todos importados via OPML.
- re-adicionar manualmente apenas jogos em que historico antigo importa.

## Proximos passos

1. Focar primeiro em `Docs/specs/discord-espelhado-para-rss.md`.
2. Fazer prova de conceito com um canal Discord espelhado.
3. Depois usuario envia lista de canais YouTube.
4. Gerar OPML incremental de YouTube.
5. Registrar excecoes finais de Discord apenas se ponte falhar.
