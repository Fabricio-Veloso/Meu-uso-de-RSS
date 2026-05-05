# Workboard estrategico

## Objetivo

Manter visao das frentes maiores do projeto de melhoria do uso da internet.

Workboard operacional: `Docs/tracking/WORKBOARD.md`.

## Estado estrategico atual

- Projeto saiu de descoberta pura e entrou em teste operacional de hub RSS.
- FreshRSS local esta em teste como hub principal por privacidade, controle local e facilidade de manutencao assistida.
- Direcao principal: centralizar fontes em FreshRSS, reduzindo abertura de YouTube, Steam e Discord.
- Usuario aceita ferramentas prontas e self-host local.
- Discord espelhado para RSS virou frente tecnica relevante porque canais importantes suportam `Seguir`/Announcement Channel.

## Frentes estrategicas

| Frente | Status | Por que importa | Filhos operacionais atuais |
| --- | --- | --- | --- |
| Inventario de fontes | aberto | entender o que realmente precisa ser acompanhado antes de escolher ferramenta | `Docs/tracking/WORKBOARD.md` |
| Hub de informacao | aberto | reduzir muitos pontos de entrada e consolidar novidades | `Docs/tracking/WORKBOARD.md` |
| Reducao de distracoes | aberto | atacar o problema central de tempo perdido | `Docs/tracking/WORKBOARD.md` |
| Conteudo profissional | aberto | criar fluxo de engenharia de software sem depender de recomendacoes | `Docs/tracking/WORKBOARD.md` |
| Jogos e updates | aberto | substituir Steam/Discord por feeds quando possivel | `Docs/tracking/WORKBOARD.md` |
| Discord para RSS | aberto | varios jogos usam Discord como canal principal; espelhar anuncios para um servidor proprio pode permitir centralizacao no FreshRSS | `Docs/specs/discord-espelhado-para-rss.md` |

## Observacoes

- Atividades operacionais devem ser filhas de alguma frente estrategica.
- Este arquivo orienta prioridade; nao substitui specs ou backlog.
- Construir software proprio so deve entrar como frente se ferramentas existentes falharem, exceto ponte pequena Discord->RSS se ela for necessaria para centralizar anuncios espelhados.
