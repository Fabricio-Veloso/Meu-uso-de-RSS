# Workboards

Use este modulo para criar ou atualizar workboards estrategicos e operacionais.

## Conceito

- Workboard estrategico: topicos maiores, decisoes macro, prioridades amplas e escopos relevantes do projeto.
- Workboard operacional: atividades concretas sendo feitas no momento, derivadas de um item estrategico.
- Um item do workboard estrategico pode virar um workboard operacional quando chegar a hora de executar aquele escopo.
- O operacional deve conter tarefas pequenas o suficiente para orientar implementacao, validacao e conclusao.
- Ao concluir trabalho operacional, registrar resultado e mover docs/specs/tracking concluidos para a respectiva pasta `done/` quando aplicavel.

## Formato minimo estrategico

Arquivo sugerido: `Docs/tracking/WORKBOARD-ESTRATEGICO.md`.

```markdown
# Workboard estrategico

## Objetivo

Manter visao das frentes maiores sem transformar o operacional em historico ou backlog amplo demais.

Workboard operacional: `Docs/tracking/WORKBOARD.md`.

## Estado estrategico atual

- <estado macro relevante do projeto>
- <decisao ou contexto que orienta prioridade>

## Frentes estrategicas

| Frente | Status | Por que importa | Filhos operacionais atuais |
| --- | --- | --- | --- |
| <frente> | <aberto/em andamento/continuo> | <motivo macro> | `Docs/tracking/WORKBOARD.md` |

## Observacoes

- atividades operacionais devem ser filhas de alguma frente estrategica
- este arquivo orienta prioridade; nao substitui specs, backlog ou decisao tecnica detalhada
```

## Formato minimo operacional

Arquivo sugerido: `Docs/tracking/WORKBOARD.md`.

```markdown
# Workboard operacional

## Objetivo

Registrar apenas trabalho ativo ou imediatamente proximo, mantendo historico e itens postergados fora deste quadro.

Workboard estrategico: `Docs/tracking/WORKBOARD-ESTRATEGICO.md`.

## Spec curta da rodada atual

- objetivo: <resultado esperado da rodada>
- contexto atual: <estado relevante antes da execucao>
- entrada: <insumos usados>
- saida esperada: <entregavel observavel>
- restricoes: <limites e cuidados>
- criterio de aceite: <como saber que terminou>

## Estado atual

- <fato operacional relevante>
- <fato operacional relevante>

## Blocos ativos

| Bloco | Pai estrategico | Status | Prioridade | Motivo | Base atual |
| --- | --- | --- | --- | --- | --- |
| <bloco> | <frente estrategica> | ready/em andamento | alta/media/baixa | <motivo> | <arquivo/pasta/spec> |

## Blocos acompanhados como continuo

| Bloco | Pai estrategico | Status | Motivo | Base atual |
| --- | --- | --- | --- | --- |
| <bloco continuo> | <frente estrategica> | continuo | <motivo> | <base> |

## Registro externo ao workboard

- concluidos: `Docs/tracking/done/`
- specs concluidas: `Docs/specs/<area>/done/`
- itens postergados: `Docs/backlogs/<area>/`

## Observacoes atuais

- tarefas concluidas nao devem permanecer neste arquivo depois de encerradas
- tarefas postergadas devem voltar para backlog, nao ficar no quadro operacional
```
