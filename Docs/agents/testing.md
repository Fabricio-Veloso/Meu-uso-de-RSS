# Testes e TDD

Use este modulo quando a tarefa envolver testes, regressao, TDD ou validacao automatizada.

## Fluxo de TDD

- Usar TDD quando o projeto tiver testes suficientes para sustentar o ciclo ou quando a tarefa for sensivel.
- Escrever primeiro um teste que descreva o comportamento esperado.
- Confirmar que o teste falha pelo motivo esperado.
- Implementar o minimo necessario para passar.
- Refatorar mantendo os testes verdes.
- Nao forcar TDD em exploracoes pequenas, prototipos descartaveis ou tarefas sem base de teste viavel.

## Convencoes de teste

- Priorizar testes pequenos, legiveis e focados.
- Cobrir comportamento principal antes de detalhes de implementacao.
- Testar regras de negocio e fluxos criticos quando forem afetados.
- Usar mock para integracoes externas e cenarios nao deterministicos.
- Reaproveitar a base de testes e os padroes ja existentes no projeto, salvo decisao explicita de evolucao.
- Sempre que possivel, validar regressao para bugs corrigidos.

## Validacao

- Validar com testes automatizados relevantes e revisao manual proporcional ao impacto.
- Se testes nao existirem, indicar validacao manual feita e sugerir cobertura minima quando fizer sentido.
- Nao criar suite complexa apenas para tarefa pequena sem necessidade concreta.
