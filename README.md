# hub

Índice das páginas estáticas, publicado em `https://wenderu00.github.io/hub/`. Feito com o [@mw/ui](https://wenderu00.github.io/mwds/) v0.22.1, como as páginas.

## Como uma página entra no hub

O hub não guarda lista nenhuma. A cada build, `scripts/coletar-paginas.mjs`:

1. busca na API do GitHub os repos de `wenderu00` com a topic **`mwds-hub`** (arquivados ficam de fora);
2. lê o `hub.json` da branch padrão de cada um;
3. mantém só os que têm `"status": "no-ar"`;
4. grava `data/paginas.json`, ordenado pelo último push.

O link do card é o **Website** do repo quando preenchido (útil com domínio próprio em subdomínio); senão, `https://wenderu00.github.io/<repo>/`.

## Quando o hub atualiza

O workflow `Publicar no GitHub Pages` roda:

- em todo push na `main`;
- todo dia às 06:17 (horário de Brasília), para pegar páginas novas ou alteradas;
- na mão, pela aba Actions (**Run workflow**);
- por `repository_dispatch` com o tipo `pagina-atualizada`, se um dia você quiser que as páginas avisem o hub na hora (exige um token pessoal com acesso a este repo guardado como secret na página).

## Configurar

1. Crie o repo `hub` e suba este código.
2. Em **Settings > Pages**, escolha **Source: GitHub Actions**.
3. Pronto. O `GITHUB_TOKEN` padrão do Actions basta para a busca.

## Desenvolver

```bash
npm install
npm run dev
npm run check
```

Sem acesso à API, o script avisa e usa `data/paginas.exemplo.json`, então dá para mexer no visual offline. Para consultar a API localmente sem esbarrar no limite de requisições, exporte um `GITHUB_TOKEN`.

Variáveis opcionais: `HUB_OWNER` (padrão `wenderu00`) e `HUB_TOPIC` (padrão `mwds-hub`).
