# UI Django templates

Use este modulo apenas quando o projeto usar Django templates ou HTML renderizado no servidor.

- Centralizar estilos em arquivos CSS, evitando inline sem necessidade.
- Nunca repetir valores de cor diretamente nos templates quando houver tokens ou variaveis CSS.
- Reutilizar estruturas via includes/parciais.
- Manter estrutura consistente entre paginas.
- Formularios devem ter label visivel, mensagem de erro proxima ao campo e alinhamento consistente.
- Evitar layouts complexos sem necessidade.
- Usar largura maxima de conteudo quando full width prejudicar leitura.
- Priorizar HTML simples, legivel e previsivel.
- Evitar logica complexa no template; mover regras para view, form, service ou helper adequado.
