# Backlog de produto: descobertas e decisoes

## O que ja foi entendido

- Objetivo atual e melhorar uso da internet, nao criar software do zero.
- Problema principal: muitos pontos de consulta geram distracao e perda de tempo.
- YouTube, Steam e Discord hoje funcionam como pontos de entrada principais.
- Usuario aceita ferramentas prontas e tambem aceita hospedar localmente.
- Inglês e aceitavel para fontes profissionais.
- Foco profissional inicial: engenharia de software no geral.
- Inoreader foi testado por alguns minutos e ja mostrou ganho claro sobre abrir Steam/Discord/YouTube manualmente.
- FreshRSS local foi instalado via Docker e sera usado por um tempo por privacidade/controle.
- Canais Discord desejados possuem opcao `Seguir`, permitindo espelhar anuncios para servidor proprio.

## Decisoes provisoriamente boas

- Usar RSS como conceito central de agregacao.
- Comecar com inventario antes de escolher ferramenta definitiva.
- Usar FreshRSS local como candidato principal por enquanto.
- Manter Inoreader como baseline/validacao, nao como escolha definitiva.
- Usar Steam RSS para updates de jogos quando possivel.
- Usar YouTube RSS para canais escolhidos, evitando homepage do YouTube.
- Reduzir Discord como central de updates.
- Para jogos acompanhados via Steam, preferir feed por appid e abrir Steam so quando houver update relevante.
- Para Discord que e canal principal, testar espelhamento oficial `Seguir` -> servidor proprio -> RSS -> FreshRSS.
- Manter Discord manual apenas se espelhamento/ponte RSS falhar ou ficar complexo demais.
- Import OPML no Inoreader funciona para assinar feeds, mas pode nao puxar historico antigo de Steam; adicionar manualmente pode fazer backfill.

## Pendencias abertas

- Lista inicial de canais YouTube pessoais.
- Converter canais YouTube escolhidos para RSS e OPML.
- Prova de conceito Discord espelhado para RSS.
- Definir quais canais Discord entram no servidor proprio `RSS Inbox`.
- Decidir linguagem/ferramenta da ponte local Discord -> RSS.
- Definicao de rotina exata de leitura.
- Decisao sobre notificacoes e horarios de consulta.

## Perguntas para proxima sessao

- Quais canais YouTube devem entrar no Inoreader?
- Qual nome/canal do servidor proprio sera usado como inbox do Discord?
- Ponte local Discord -> RSS sera feita em Node.js, Python ou ferramenta pronta?
- Qual limite inicial por categoria: 3, 5 ou 10 fontes?
- O painel central deve ser acessado no desktop, celular ou ambos?
