# UI geral

Use este modulo apenas quando o projeto tiver interface visual ou a tarefa tocar telas, estilos, componentes ou responsividade.

## Principios

- Priorizar consistencia sobre criatividade, salvo quando o projeto pedir direcao visual exploratoria.
- Priorizar legibilidade sobre densidade.
- Interfaces devem ser previsiveis e estaveis.
- Evitar variacoes visuais desnecessarias entre telas semelhantes.
- Hierarquia visual deve ser clara: titulo, subtitulo, conteudo e acoes.
- Preservar linguagem visual existente quando ja houver design system ou padrao consolidado.

## Regras

- Nao usar cores hardcoded fora do sistema de tokens quando existir sistema de tokens.
- Nao criar novos componentes se ja existir equivalente funcional.
- Preferir reutilizacao e extensao ao inves de duplicacao.
- Manter escala consistente de espacamento quando o projeto ja tiver escala definida.
- Evitar nesting visual profundo sem necessidade.
- Nao criar novas variantes visuais sem justificativa clara.
- Validar desktop e mobile quando aplicavel.

## Anti patterns

- Misturar estilos diferentes na mesma tela.
- Criar componentes altamente especificos e nao reutilizaveis sem motivo claro.
- Usar muitas cores diferentes para a mesma funcao.
- Usar espacamentos aleatorios sem escala definida.
- Criar layouts complexos sem necessidade real.

## Criterio de pronto UI

- Conferir consistencia com outras telas.
- Validar hierarquia visual.
- Conferir espacamentos.
- Conferir estados relevantes, como hover, focus, erro, loading e desabilitado.
- Validar responsividade minima em desktop e mobile quando aplicavel.
- Evitar variacoes desnecessarias.

## Componentes base

Todo projeto com UI deve avaliar se precisa destes padroes base:

- Button, com variantes primaria e secundaria quando necessario.
- Input.
- Card.
- Table simples.
- Form layout consistente.

Sempre reutilizar esses padroes antes de criar novos.
