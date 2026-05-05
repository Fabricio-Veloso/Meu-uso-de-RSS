# Estrutura de docs

Use este modulo para criar, revisar ou organizar documentacao operacional do projeto.

## Objetivo

Concentrar contexto funcional e tecnico que ajuda a retomar trabalho em blocos menores, com menos dependencia da memoria da sessao anterior.

## Estrutura base

```text
Docs/
  agents/
  backlogs/
    infra/
    front/
    ui/
  escopos/
    done/
  specs/
    done/
  tracking/
    done/
```

## Exemplo com areas

```text
Docs/
  backlogs/
    infra/
    front/
    ui/
  escopos/
    <escopo-maior>/
    done/
  specs/
    features/
      done/
    refactors/
      done/
    ui/
      done/
  tracking/
    WORKBOARD-ESTRATEGICO.md
    WORKBOARD.md
    done/
```

## Regras

- `Docs/backlogs/` guarda assuntos abertos por tema amplo e decisoes relevantes macro por escopo.
- Cada subpasta de `Docs/backlogs/` deve explicar o que foi decidido, por que a decisao importa e quais pendencias ainda nao viraram iteracao.
- `Docs/specs/` guarda specs curtas e implementaveis por bloco de trabalho.
- `Docs/escopos/` guarda referencia operacional e contexto consolidado de partes grandes do software que precisam de workboard proprio ou apoiam varias iteracoes.
- `Docs/tracking/` guarda mapas de trabalho, ordem sugerida, status dos blocos e proximos passos.
- `Docs/escopos/done/`, `Docs/specs/done/` e `Docs/tracking/done/` guardam itens concluidos.
- Criar novas pastas de backlog por escopo apenas quando houver necessidade real.

## Uso diario

1. Consultar `Docs/tracking/` para ver o quadro geral da frente ativa.
2. Abrir a spec do bloco escolhido em `Docs/specs/`.
3. Implementar e validar o bloco.
4. Atualizar tracking e backlog apenas quando a decisao ficar estavel.

## Regra pratica

- Backlog guarda assunto aberto.
- Spec guarda bloco executavel.
- Tracking guarda ordem, status e proximos passos.
- Itens concluidos saem das pastas ativas e vao para `done/` quando aplicavel.
