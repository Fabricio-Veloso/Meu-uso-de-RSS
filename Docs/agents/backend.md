# Backend

Use este modulo quando a tarefa tocar backend, persistencia, APIs, autenticacao, autorizacao ou integracoes.

## Principios

- Entender fluxo de dados antes de editar.
- Preservar contratos existentes quando houver consumidores externos ou dados persistidos.
- Evitar criar camada nova sem necessidade concreta.
- Manter regras de negocio em local coerente com a arquitetura atual.
- Tratar erros de forma explicita e proporcional ao risco.
- Nao registrar segredos, tokens ou dados sensiveis em logs.

## Ao alterar backend

- Identificar entradas, saidas, validacoes, persistencia e efeitos colaterais.
- Revisar autenticacao e autorizacao quando houver acesso a dados ou acoes sensiveis.
- Revisar impacto em migracoes, comandos, jobs, filas, webhooks e integracoes.
- Usar mocks para integracoes externas quando validar testes automatizados.
- Validar regressao para bugs corrigidos sempre que possivel.

## Pronto para backend

- Fluxo principal validado.
- Regras de negocio cobertas por teste quando viavel.
- Erros esperados tratados.
- Persistencia e compatibilidade consideradas.
- Integracoes externas isoladas ou mockadas em teste quando aplicavel.
