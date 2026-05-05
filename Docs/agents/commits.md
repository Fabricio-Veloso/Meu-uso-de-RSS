# Commits atomicos

Use este modulo quando commits atomicos forem importantes ou quando preparar particionamento de diff.

## Diretriz

- Todo commit deve ser atomico.
- A regra para fechar um bloco de commit e: esta mudanca pode sofrer rollback sozinha sem afetar as demais?
- Se a resposta for sim, esse bloco pode virar um commit.
- O alvo e usar a maior granularidade saudavel que preserve contexto, integridade e capacidade de rollback.
- No pior caso, aceitar um commit por arquivo inteiro, mas isso e o limite minimo de granularidade, nao o alvo.
- Quando um mesmo arquivo reunir mudancas de naturezas diferentes, separar os commits por hunk sempre que isso permitir isolar melhor cada comportamento ou responsabilidade.
- Se um arquivo novo representar sozinho uma responsabilidade clara e independente, ele pode virar um commit por si so.
- Se um arquivo novo misturar responsabilidades diferentes, particionar por hunk ou reorganizar a implementacao antes de commitar.
- Agrupar varios arquivos no mesmo commit apenas quando eles formarem uma unica unidade de rollback e o comportamento nao ficar coerente se separado.
- Sempre que possivel, cada commit deve deixar o repositorio em estado coerente, legivel e validavel.
- O contexto mais amplo da feature, iteracao ou decisao arquitetural deve ficar concentrado na PR e nas specs, nao dentro de commits excessivamente grandes.
- Ao preparar commits, separar refatoracoes estruturais por bloco coerente de responsabilidade, evitando misturar docs, regra de negocio e reorganizacao sem necessidade.
- Nao agrupar commits por arquivo quando o diff puder ser particionado por comportamento observavel, motivo da mudanca ou unidade de rollback.
- Antes de commitar, propor um plano curto de particionamento quando houver duvida razoavel sobre como dividir os blocos.

## Mensagem de commit

- Usar prefixos comuns e amplamente reconhecidos em historicos de commit, como `chore`, `feat`, `refac`, `fix`, `docs`, `test` e equivalentes apropriados ao contexto.
- `feat` para comportamento novo entregue ao sistema.
- `fix` para correcao de bug ou regressao.
- `refac` para reorganizacao interna sem mudar comportamento.
- `docs` para documentacao quando esse for o foco principal do commit.
- `test` para cobertura automatizada quando esse for o foco principal do commit.
- `chore` para manutencao, docs operacionais, ajustes de suporte e infraestrutura quando nao houver prefixo mais especifico.
- Formato obrigatorio: `<tipo>: <dominio ou area> - <porque da mudanca>`.
- A mensagem deve explicar principalmente o porque, e nao apenas listar o que foi alterado.
- Exemplo: `refac: eventos views - reduzir acoplamento do modulo sem mudar as rotas`.
