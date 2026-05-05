# Estudo inicial: uso melhor da internet

## Contexto

Projeto pessoal para melhorar uso da internet, reduzindo dispersao e centralizando informacoes uteis.

Uso atual dominante:

- YouTube para noticias, entretenimento e conteudo aleatorio.
- Steam para acompanhar jogos gratis e updates de jogos.
- Discord principalmente para updates de jogos.

Problema principal informado:

```text
abrir muitos lugares > distracoes > perder tempo
```

## Leitura do problema

O problema nao parece ser falta de informacao. E excesso de pontos de entrada com alto potencial de distracao.

Fluxo atual provavel:

```text
quero checar algo -> abro Discord/Steam/YouTube -> vejo outras coisas -> perco foco -> gasto mais tempo que queria
```

Fluxo desejado:

```text
fontes espalhadas -> leitor central -> rotina curta de leitura -> abrir fonte original so quando necessario
```

## Ideia central

Criar uma caixa de entrada da internet: um local unico para receber atualizacoes de fontes escolhidas.

RSS e a tecnologia principal candidata. RSS e um formato usado por sites para publicar novas entradas. Um leitor RSS busca essas atualizacoes e mostra tudo em uma interface unica.

Beneficios:

- reduz necessidade de abrir varios sites e apps.
- remove boa parte do feed algoritmico.
- permite escolher fontes manualmente.
- facilita revisar novidades em blocos curtos.
- funciona bem com noticias, blogs, YouTube, Steam e alguns canais/publicacoes.

## Categorias iniciais

| Categoria | Conteudo esperado | Risco |
| --- | --- | --- |
| Noticias | fontes confiaveis e poucas | excesso de manchetes |
| Engenharia de software | blogs, carreira, arquitetura, ferramentas | backlog infinito de leitura |
| AI / Tech | IA, ferramentas e tendencias | hype e ruido |
| Games | updates oficiais, jogos gratis, devlogs | virar consumo de loja/comunidade |
| Pessoal | habitos, saude, leitura, financas | virar autoajuda generica |

## Ferramentas avaliadas

| Ferramenta | Tipo | Pontos fortes | Pontos fracos | Uso sugerido |
| --- | --- | --- | --- | --- |
| FreshRSS | leitor RSS self-hosted | gratis, local, controle proprio, leve, suporta filtros e extensoes | exige instalacao/configuracao | hub principal se optar por local |
| Inoreader | leitor RSS SaaS | poderoso, filtros, regras, newsletters, YouTube, Reddit, Telegram | recursos avancados podem ser pagos | teste rapido ou uso pronto |
| Feedly | leitor RSS SaaS | simples, popular, bom para noticias/blogs | menos flexivel no gratis | teste rapido simples |
| Readwise Reader | read-it-later + RSS | excelente para leitura profunda, highlights e revisao | pago apos trial | futuro, se foco virar leitura/estudo |
| RSS-Bridge | gerador de RSS | cria feeds para sites sem RSS; suporta YouTube, Reddit, Telegram e outros | mais tecnico | complemento para fontes dificeis |
| RSS.app | gerador de RSS/bots | facil para sites e redes sociais | servico pago/limitado | alternativa sem self-host |
| MonitoRSS | bot Discord RSS | envia RSS para Discord, filtros, gratis ate 3 feeds, self-host possivel | mantem Discord como ponto de entrada | usar so se Discord continuar central |

## Recomendacao atual

Comecar sem desenvolver nada.

Plano preferido:

1. Fazer inventario de jogos, fontes Discord e fontes de conteudo.
2. Classificar cada fonte por tipo: RSS direto, Steam RSS, YouTube RSS, site oficial, precisa RSS-Bridge, manter Discord.
3. Testar leitor pronto ou instalar FreshRSS local.
4. Montar rotina diaria curta.
5. Depois decidir se alguma automacao/projeto proprio realmente vale a pena.

## Steam e jogos

Steam tem RSS oficial para noticias gerais:

```text
https://store.steampowered.com/feeds/news.xml
```

Jogos especificos podem ter feed por appid, exemplo Team Fortress 2:

```text
https://store.steampowered.com/feeds/news/app/440/?cc=BR&l=portuguese
```

Isso pode substituir parte do uso de Steam e Discord para updates.

## YouTube

Canais do YouTube podem ser acompanhados por RSS, evitando abrir a home do YouTube.

Formato:

```text
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
```

Uso sugerido: acompanhar apenas canais escolhidos, nao recomendacoes.

## Discord

Discord deve perder papel de central de informacao.

Possiveis destinos por tipo de canal:

| Conteudo no Discord | Melhor destino |
| --- | --- |
| anuncios oficiais de jogo | Steam RSS, site oficial, newsletter ou feed oficial |
| videos de canal | YouTube RSS |
| posts de comunidade | manter apenas se for realmente util |
| conversa com amigos | manter Discord, mas fora do fluxo de leitura |

## Rotina sugerida

| Momento | Acao |
| --- | --- |
| Manha | abrir leitor RSS por 15 minutos |
| Durante o dia | salvar itens relevantes para ler depois |
| Noite | ler itens salvos, sem abrir feed infinito |
| Semanal | remover fontes ruins e adicionar fontes boas com criterio |

## Regras anti-distracao

- YouTube nao deve ser homepage informacional.
- Discord nao deve ser painel de updates, salvo excecoes claras.
- Steam nao deve ser aberta so para checar novidade.
- Cada fonte precisa justificar permanencia.
- Se uma fonte gera arrependimento ou ruido recorrente, remover.
- Comecar com poucas fontes por categoria.

## Fontes iniciais candidatas

Engenharia de software:

- Martin Fowler
- Pragmatic Engineer
- GitHub Blog
- Stack Overflow Blog
- InfoQ
- Netflix Tech Blog
- Cloudflare Blog
- AWS Architecture Blog
- Hacker News, com limite e filtro

Noticias/tech:

- BBC
- Reuters
- Ars Technica
- The Verge
- Wired
- MIT Technology Review

AI:

- OpenAI Blog
- Anthropic News
- Google DeepMind Blog
- Latent Space

Pessoal:

- Farnam Street
- The Marginalian
- James Clear
- Cal Newport

## Decisoes em aberto

- Escolher entre teste rapido SaaS e FreshRSS local.
- Levantar biblioteca Steam e jogos prioritarios.
- Levantar canais/servidores Discord usados para updates.
- Definir limite inicial de fontes por categoria.
- Decidir se Discord sera removido do fluxo de informacao ou usado como excecao.
