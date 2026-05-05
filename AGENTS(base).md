# AGENTS.md

Responda a configuracao inicial em `Docs/agents/setup.md` e mantenha apenas os modulos aplicaveis ao projeto.

Durante o setup, preserve a estrutura e a intencao deste arquivo. Nao reescreva tudo sem necessidade; prefira preencher lacunas, remover apenas blocos claramente nao aplicaveis e manter o fluxo principal intacto.

## Projeto

- Objetivo:
- Problema resolvido:
- Publico/usuario:
- Escopo positivo:
- Escopo negativo:

## Stack

- Linguagem:
- Framework:
- Banco de dados:
- UI:
- Testes:
- Deploy/ambiente:

## Modulos de contexto

Antes de executar uma tarefa, verificar se algum modulo abaixo e relevante. Ler apenas os modulos necessarios para a tarefa atual; se durante a execucao surgir impacto em outro escopo, carregar o modulo correspondente antes de continuar.

- Setup do projeto: `Docs/agents/setup.md`
- Estrutura de docs: `Docs/agents/docs-structure.md`
- Workboards: `Docs/agents/workboards.md`
- Commits atomicos: `Docs/agents/commits.md`
- Testes e TDD: `Docs/agents/testing.md`
- UI geral: `Docs/agents/ui.md`
- UI Django templates: `Docs/agents/ui-django.md`
- Backend: `Docs/agents/backend.md`

## Protocolo de carregamento

- Se a tarefa for setup inicial, ler `Docs/agents/setup.md`, `Docs/agents/docs-structure.md` e `Docs/agents/workboards.md`.
- Se a tarefa envolver planejamento, specs, tracking, backlog ou organizacao de docs, ler `Docs/agents/docs-structure.md` e `Docs/agents/workboards.md`.
- Se a tarefa envolver commits, particionamento de diff ou mensagem de commit, ler `Docs/agents/commits.md`.
- Se a tarefa envolver testes, regressao, TDD ou validacao automatizada, ler `Docs/agents/testing.md`.
- Se a tarefa envolver UI, telas, estilos, componentes ou responsividade, ler `Docs/agents/ui.md` e o modulo de stack visual aplicavel.
- Se a tarefa envolver Django templates ou HTML renderizado no servidor, ler `Docs/agents/ui-django.md`.
- Se a tarefa tocar backend, persistencia, APIs, autenticacao, autorizacao ou integracoes, ler `Docs/agents/backend.md`.
- Nao carregar modulos irrelevantes por padrao.
- Em caso de duvida razoavel, carregar o modulo relacionado antes de editar.

## Principios de implementacao

- Preferir simplicidade e mudancas pequenas.
- Respeitar os padroes ja usados no projeto sempre que forem suficientes.
- Nao mover o projeto para uma arquitetura mais complexa antes da necessidade.
- Fazer a menor mudanca que entregue comportamento correto e verificavel.
- Evitar compatibilidade retroativa sem necessidade concreta, como dados persistidos, comportamento ja entregue ou consumidores externos.
- Localizar pontos afetados antes de editar.
- Consolidar neste arquivo apenas decisoes estaveis e realmente globais do projeto.

## Modo de trabalho

- Trabalhar em iteracoes curtas, com alinhamento frequente sobre a proxima feature.
- Registrar uma spec curta quando a tarefa nao for trivial.
- Usar workboard estrategico e operacional quando o modulo de workboards estiver ativo.
- Implementar em pequenos passos, priorizando comportamento principal.
- Validar com testes automatizados relevantes e fluxo manual proporcional ao impacto.
- Revisar efeitos colaterais em autenticacao, autorizacao, persistencia, integracoes, UI e coerencia com a estrutura atual.

## Criterio de pronto

Uma tarefa so deve ser considerada pronta quando:

- os testes relevantes estiverem passando ou atualizados de forma coerente
- o comportamento estiver de acordo com a spec combinada
- o fluxo manual principal afetado tiver sido revisado
- ajustes de configuracao, estrutura de dados ou compatibilidade tiverem sido tratados quando necessario
- a mudanca nao quebrar fluxos existentes essenciais do sistema
- a implementacao mantiver a simplicidade esperada do projeto

## Decisoes em aberto

- consolidar a estrategia de testes e as ferramentas principais do projeto
- definir quais regras de negocio dependem de integracoes externas
- revisar criterios de elegibilidade, validacao e bloqueio nos fluxos principais
- revisar quais campos, entradas ou parametros devem ser obrigatorios
- decidir onde concentrar regras mais complexas entre camadas e modulos do sistema
- priorizar melhorias tecnicas nas areas mais sensiveis da aplicacao
