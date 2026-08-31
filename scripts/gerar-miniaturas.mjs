/**
 * Gera as miniaturas da fila de atletas da área motivacional (gh#18).
 *
 * A fila mostra 20 círculos de 40px, e usava o mesmo JPEG em resolução cheia
 * da foto principal — 1,6 MB baixados para renderizar 20 miniaturas.
 *
 * As saídas são versionadas no repositório, então este script só precisa rodar
 * quando alguma foto de `src/data/motivacional/` for adicionada ou trocada:
 *
 *     npm i -D sharp && npm run thumbs
 *
 * O `sharp` não é declarado em devDependencies de propósito: são ~29 MB que
 * toda instalação pagaria — inclusive cada build de deploy — por um script que
 * roda algumas vezes por ano. Como as miniaturas estão versionadas, instalar
 * sob demanda sai mais barato.
 *
 * 96px cobre 40px lógicos até 2,4x. O recorte sai do topo porque é assim que a
 * fila exibe (`object-cover object-top`) — recortar aqui evita mandar o corpo
 * inteiro do atleta para desenhar um rosto.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error(
    "Este script precisa do sharp, que não é dependência do projeto.\n" +
      "Instale sob demanda e rode de novo:\n\n" +
      "    npm i -D sharp && npm run thumbs\n\n" +
      "Depois, se quiser, remova com: npm uninstall sharp"
  );
  process.exit(1);
}

const ORIGEM = "src/data/motivacional";
const DESTINO = join(ORIGEM, "thumbs");
const LADO = 96;

const kb = (b) => `${(b / 1024).toFixed(1)} KB`;

async function main() {
  await mkdir(DESTINO, { recursive: true });

  const arquivos = (await readdir(ORIGEM)).filter((f) => f.endsWith(".jpg"));
  if (arquivos.length === 0) throw new Error(`Nenhum .jpg em ${ORIGEM}`);

  let entrada = 0;
  let saida = 0;

  for (const arquivo of arquivos) {
    const origem = join(ORIGEM, arquivo);
    const destino = join(DESTINO, `${parse(arquivo).name}.webp`);

    await sharp(origem)
      .resize(LADO, LADO, { fit: "cover", position: "top" })
      .webp({ quality: 72 })
      .toFile(destino);

    const antes = (await stat(origem)).size;
    const depois = (await stat(destino)).size;
    entrada += antes;
    saida += depois;

    console.log(
      `  ${arquivo.padEnd(32)} ${kb(antes).padStart(9)} -> ${kb(depois).padStart(8)}`
    );
  }

  console.log(`\n  ${arquivos.length} miniaturas`);
  console.log(`  fila antes:  ${kb(entrada)}`);
  console.log(`  fila depois: ${kb(saida)}`);
  console.log(`  redução:     ${(100 - (saida / entrada) * 100).toFixed(1)}%`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
