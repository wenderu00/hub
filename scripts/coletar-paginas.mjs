// Monta data/paginas.json com as páginas do hub: repos do dono com a topic mwds-hub
// e hub.json com status "no-ar". Roda antes de todo build (prebuild).
import { existsSync, copyFileSync, writeFileSync } from "node:fs";

const owner = process.env.HUB_OWNER ?? "wenderu00";
const topic = process.env.HUB_TOPIC ?? "mwds-hub";
const destino = new URL("../data/paginas.json", import.meta.url);
const exemplo = new URL("../data/paginas.exemplo.json", import.meta.url);

const headers = { accept: "application/vnd.github+json", "user-agent": `${owner}-hub` };
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function json(url) {
  const resposta = await fetch(url, { headers });
  if (!resposta.ok) throw new Error(`${resposta.status} em ${url}`);
  return resposta.json();
}

async function ficha(repo) {
  const url = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/hub.json`;
  const resposta = await fetch(url, { headers: { "user-agent": headers["user-agent"] } });
  if (!resposta.ok) {
    console.warn(`! ${repo.name}: sem hub.json (${resposta.status}), ignorado`);
    return null;
  }
  try {
    return await resposta.json();
  } catch {
    console.warn(`! ${repo.name}: hub.json inválido, ignorado`);
    return null;
  }
}

async function coletar() {
  const busca = await json(`https://api.github.com/search/repositories?q=${encodeURIComponent(`user:${owner} topic:${topic} archived:false`)}&per_page=100`);
  const paginas = [];
  for (const repo of busca.items) {
    const dados = await ficha(repo);
    if (!dados || dados.status !== "no-ar") continue;
    paginas.push({
      repo: repo.name,
      nome: String(dados.nome ?? repo.name),
      descricao: String(dados.descricao ?? repo.description ?? ""),
      tags: Array.isArray(dados.tags) ? dados.tags.slice(0, 5).map(String) : [],
      // O homepage do repo vence quando existe, para cobrir domínio próprio em subdomínio.
      url: repo.homepage || `https://${owner}.github.io/${repo.name}/`,
      atualizadaEm: repo.pushed_at,
    });
  }
  paginas.sort((a, b) => b.atualizadaEm.localeCompare(a.atualizadaEm));
  return paginas;
}

try {
  const paginas = await coletar();
  writeFileSync(destino, `${JSON.stringify(paginas, null, 2)}\n`);
  console.log(`✓ ${paginas.length} página(s) no hub`);
} catch (erro) {
  // No CI a falha precisa aparecer; localmente, sem rede, o build segue com o que houver.
  if (process.env.CI) throw erro;
  console.warn(`! Não consegui consultar o GitHub (${erro.message}).`);
  if (!existsSync(destino)) {
    copyFileSync(exemplo, destino);
    console.warn("  Usando data/paginas.exemplo.json.");
  } else {
    console.warn("  Mantendo o data/paginas.json atual.");
  }
}
