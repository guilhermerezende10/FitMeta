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
 * 96px cobre 40px lógicos até 2,4x, e o recorte sai do topo — é onde está o
 * rosto numa foto de corpo inteiro.
 *
 * O conteúdo ocupa 80px e ganha uma moldura de 8px em cada lado, na cor do
 * botão. Sem ela, o recorte era preenchido de ponta a ponta pelo atleta, e a
 * máscara circular de 40px da fila cortava cabeça e braços — são fotos de corpo
 * inteiro, muitas com os braços abertos. Não era problema de CSS: não sobrava
 * imagem para o `object-position` deslocar. A moldura resolve na origem, dando
 * ao círculo a margem que a foto não tinha.
 *
 * E o recorte sai redondo, não quadrado. Com um quadrado de 80px dentro do
 * círculo de 96px, a moldura só existia nos quatro pontos cardeais: nas
 * diagonais o canto do recorte fica a 56,6px do centro, atravessa o corte de
 * 48px e encosta na borda. O resultado parecia um quadrado dentro de um aro.
 * Mascarar o conteúdo em círculo antes de compor deixa o anel com 8px iguais
 * em toda a volta.
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
const RESPIRO = 8; // moldura em cada lado, para o atleta não encostar no círculo
const INTERNO = LADO - RESPIRO * 2; // 80
const FUNDO = "#232C32"; // surface-raised: o mesmo fundo do botão

// Recorta o conteúdo em círculo. O SVG rasteriza com antialias, então a borda
// sai suave em vez de serrilhada.
const MASCARA = Buffer.from(
  `<svg width="${INTERNO}" height="${INTERNO}">` +
    `<circle cx="${INTERNO / 2}" cy="${INTERNO / 2}" r="${INTERNO / 2}" fill="#fff"/>` +
    `</svg>`
);

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

    const disco = await sharp(origem)
      .resize(INTERNO, INTERNO, { fit: "cover", position: "top" })
      .ensureAlpha() // `dest-in` precisa de canal alfa no destino para recortar
      .composite([{ input: MASCARA, blend: "dest-in" }])
      .png()
      .toBuffer();

    // Compor sobre fundo opaco, e não deixar o alfa passar para o WebP: o anel
    // tem a cor do botão de qualquer jeito, e o arquivo sai menor.
    await sharp({
      create: { width: LADO, height: LADO, channels: 4, background: FUNDO },
    })
      .composite([{ input: disco, top: RESPIRO, left: RESPIRO }])
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
