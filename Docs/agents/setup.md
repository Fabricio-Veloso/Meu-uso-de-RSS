# Setup do projeto

Use este modulo ao preparar um projeto novo a partir do `AGENTS.md` base.

## Perguntas iniciais

Responda antes de comecar a implementar:

1. Qual e o objetivo principal do projeto?
2. Qual problema ele resolve e para quem?
3. O projeto tera interface visual?
4. Se tiver UI, qual stack sera usada? Ex: React, Vue, Django templates, HTML/CSS simples.
5. O projeto tera backend?
6. Se tiver backend, qual stack sera usada? Ex: Django, FastAPI, Node, Laravel.
7. O projeto tera banco de dados ou persistencia local?
8. Existem integracoes externas criticas? Ex: pagamentos, APIs de terceiros, email, IA.
9. Qual nivel de teste esperado neste momento? Ex: nenhum, basico, TDD quando fizer sentido, cobertura forte.
10. O projeto precisa seguir um fluxo de branch/PR?
11. Commits atomicos serao exigidos neste projeto?
12. O projeto usara workboards estrategico e operacional?
13. Quais escopos iniciais devem existir em `Docs/backlogs/`? Ex: `infra`, `front`, `ui`, `backend`, `produto`.
14. Existem partes grandes do software que precisam de workboard proprio em `Docs/escopos/`?
15. Existe alguma restricao importante? Ex: prazo curto, prototipo, codigo legado, deploy especifico.
16. Quais modulos de contexto devem ficar ativos?

## Protocolo de setup do AGENTS.md

- Responder primeiro as perguntas de configuracao inicial.
- Preencher apenas as secoes do nucleo que tiverem informacao real.
- Manter secoes vazias quando a decisao ainda nao existir, em vez de inventar arquitetura ou regras.
- Remover referencias a modulos claramente fora do projeto.
- Nao remover o nucleo do arquivo: projeto, stack, modulos de contexto, protocolo de carregamento, principios, modo de trabalho, criterio de pronto e decisoes em aberto.
- Nao alterar o sentido das regras ja existentes sem pedir confirmacao.
- Nao transformar detalhes de um projeto especifico em regra global.
- Quando houver duvida se um modulo deve ficar, manter o modulo e marcar a decisao como aberta.
- Preferir pequenas edicoes locais ao inves de reescrever blocos grandes.

## Resultado esperado do setup

- `AGENTS.md` core preenchido com contexto real do projeto.
- Modulos nao aplicaveis removidos do protocolo de carregamento.
- Estrutura `Docs/` criada conforme `Docs/agents/docs-structure.md`.
- Workboards iniciais criados quando aplicavel conforme `Docs/agents/workboards.md`.
- Primeira spec criada apenas quando ja houver bloco executavel claro.
