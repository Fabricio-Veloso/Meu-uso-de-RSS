# Spec: teste FreshRSS local

## Objetivo

Testar FreshRSS como alternativa self-host ao Inoreader, mantendo o mesmo inventario de feeds.

## Por que testar

- Inoreader funcionou muito bem como experiencia inicial.
- FreshRSS pode ser melhor no longo prazo por controle local, custo zero e manutencao assistida por automacao/arquivos.
- Rodando localmente, fica mais facil gerar OPMLs, ajustar configuracao e manter historico sem depender tanto da GUI.

## Setup local

Arquivo Compose:

```text
docker/freshrss/compose.yml
```

Scripts auxiliares:

```text
docker/freshrss/start.ps1
docker/freshrss/stop.ps1
docker/freshrss/logs.ps1
```

Comando para subir:

```powershell
docker compose -f "docker/freshrss/compose.yml" up -d
```

Atalho equivalente:

```powershell
./docker/freshrss/start.ps1
```

URL local:

```text
http://localhost:8080
```

Pastas persistentes:

```text
docker/freshrss/data
docker/freshrss/extensions
```

## Primeiro acesso

1. Abrir `http://localhost:8080`.
2. Seguir instalador web.
3. Usar SQLite, salvo se houver motivo para banco externo.
4. Criar usuario admin.
5. Importar OPML inicial:

```text
Docs/import/inoreader-feeds-iniciais.opml
```

## Estado do teste

- Docker CLI encontrado.
- Docker Compose encontrado.
- Container subiu com sucesso apos Docker Desktop ficar disponivel.
- FreshRSS responde em `http://localhost:8080`.

Erro anterior observado quando Docker Desktop estava parado:

```text
failed to connect to the docker API at npipe:////./pipe/docker_engine
```

Acao necessaria:

1. Abrir `http://localhost:8080`.
2. Escolher `Portugues (Brasil)` ou idioma preferido.
3. Passar checks.
4. Escolher SQLite.
5. Criar usuario admin.
6. Importar OPML inicial.

## Recursos a comparar com Inoreader

| Recurso | O que observar |
| --- | --- |
| Import OPML | categorias e feeds aparecem corretamente? |
| Steam RSS | historico antigo aparece? atualiza bem? |
| YouTube RSS | videos entram sem abrir YouTube? |
| UI desktop | leitura e marcar lido sao rapidos? |
| Mobile | web mobile serve ou precisa app? |
| Favoritos | salvar item relevante funciona bem? |
| Filtros | da para reduzir hotfix/promocao/ruido? |
| Backup | dados ficam simples de preservar? |

## Comandos uteis

Subir:

```powershell
docker compose -f "docker/freshrss/compose.yml" up -d
```

Parar:

```powershell
docker compose -f "docker/freshrss/compose.yml" down
```

Ver logs:

```powershell
docker compose -f "docker/freshrss/compose.yml" logs -f
```

Atualizar imagem futuramente:

```powershell
docker compose -f "docker/freshrss/compose.yml" pull
docker compose -f "docker/freshrss/compose.yml" up -d
```

## Decisao esperada

Depois do teste, escolher uma direcao:

- manter Inoreader como principal se FreshRSS tiver friccao demais.
- migrar para FreshRSS se UI/atualizacao/mobile forem bons o bastante.
- usar Inoreader agora e FreshRSS como experimento paralelo ate amadurecer.
