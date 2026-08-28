import {
  estudosFrequencia,
  estudosVolume,
  estudosNutricao,
  estudosDivisaoTreino,
} from "../../data/data-estudos-cientificos";

/**
 * Registro único das categorias de estudos.
 *
 * Antes existiam quatro componentes quase idênticos (EstudosFrequencia,
 * EstudosVolume, EstudosNutricao, EstudosDivisaoTreino). As rotas continuam
 * as mesmas; o que muda é que agora há uma tela só, parametrizada.
 */

const imagens = import.meta.glob(
  "../../data/estudos-cientificos/*.{jpg,jpeg,webp,png}",
  { eager: true, import: "default" }
);

export function imagemDoEstudo(imgSrc) {
  return imagens[`../../data/estudos-cientificos/${imgSrc}`];
}

export const CATEGORIAS = [
  {
    slug: "frequencia",
    pill: "Frequência",
    titulo: "Frequência de treino",
    estudos: estudosFrequencia,
  },
  {
    slug: "volume",
    pill: "Volume",
    titulo: "Volume de treino",
    estudos: estudosVolume,
  },
  {
    slug: "nutricao",
    pill: "Nutrição",
    titulo: "Recomendação nutricional",
    estudos: estudosNutricao,
  },
  {
    slug: "divisao-treino",
    pill: "Divisão",
    titulo: "Divisão de treino",
    estudos: estudosDivisaoTreino,
  },
];

export function categoriaPorSlug(slug) {
  return CATEGORIAS.find((c) => c.slug === slug);
}

/** "1 estudo" / "7 estudos" — a categoria de nutrição tem um item só. */
export function contagem(n) {
  return `${n} ${n === 1 ? "estudo" : "estudos"}`;
}
