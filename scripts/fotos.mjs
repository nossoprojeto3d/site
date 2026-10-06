// Prepara as fotos do site: npm run fotos [pasta]
//
// Lê as fotos originais (padrão: ~/Desktop/Fotos do site), nomeadas só com o número do espaço
// (01.jpg, 07.heic, 12.png...), e grava em public/assets/fotos/<número>-<nome>.jpg:
// 4:5 em 1080×1350, enquadrada no que mais chama atenção, JPEG sRGB com no máximo ~250 KB.
// Os nomes vêm do próprio código: todo "NN-nome" usado em <Foto arquivo="..."> ou nos "fotos:" das páginas.
// Arquivos com letra (02a.jpg, 02b.jpg) são opções pra escolher e ficam de fora.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = process.argv[2] ?? path.join(os.homedir(), "Desktop", "Fotos do site");
const DESTINO = path.join(RAIZ, "public/assets/fotos");
const LARGURA = 1080, ALTURA = 1350, LIMITE = 250 * 1024;

// número → nome do arquivo, procurando "NN-nome" no código
const nomes = new Map();
(function ler(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) ler(p);
    else if (/\.(astro|ts)$/.test(f.name))
      for (const [, nome] of fs.readFileSync(p, "utf8").matchAll(/["'](\d{2}-[a-z0-9-]+)["']/g)) nomes.set(nome.slice(0, 2), nome);
  }
})(path.join(RAIZ, "src"));

fs.mkdirSync(DESTINO, { recursive: true });
const arquivos = fs.readdirSync(ORIGEM).filter((f) => /^\d{2}\.(jpe?g|png|heic|heif|webp|tiff?)$/i.test(f)).sort();
if (!arquivos.length) console.log(`Nenhuma foto numerada em "${ORIGEM}".`);

for (const arq of arquivos) {
  const num = arq.slice(0, 2);
  const nome = nomes.get(num);
  if (!nome) { console.log(`${arq}: o site não tem espaço ${num}, ignorada`); continue; }

  let entrada = path.join(ORIGEM, arq);
  // HEIC do iPhone: o sharp nem sempre decodifica, então o sips do macOS converte antes
  if (/\.hei[cf]$/i.test(arq)) {
    const tmp = path.join(os.tmpdir(), `${num}-foto.png`);
    execFileSync("sips", ["-s", "format", "png", entrada, "--out", tmp], { stdio: "ignore" });
    entrada = tmp;
  }

  const base = sharp(entrada).rotate().resize(LARGURA, ALTURA, { fit: "cover", position: "attention" }).toColorspace("srgb");
  let saida, qualidade;
  for (qualidade = 82; qualidade >= 55; qualidade -= 4) {
    saida = await base.clone().jpeg({ quality: qualidade, mozjpeg: true, progressive: true }).toBuffer();
    if (saida.length <= LIMITE) break;
  }
  fs.writeFileSync(path.join(DESTINO, `${nome}.jpg`), saida);
  console.log(`${arq} → ${nome}.jpg  (${Math.round(saida.length / 1024)} KB, qualidade ${qualidade})`);
}
