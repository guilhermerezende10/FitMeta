import { useCallback, useEffect, useState } from "react";
import supabase from "../../services/supabase";
import PhotoCard from "../../ui/PhotoCard";
import PlanoCard from "../../ui/PlanoCard";
import Alert from "../../ui/Alert";
import Button from "../../ui/Button";

const PLANOS = [
  {
    id: "treino",
    title: "Meu treino",
    description: "Seu plano de treino personalizado.",
    icon: "treino",
    to: "/meu-treino",
  },
  {
    id: "nutricao",
    title: "Minha nutrição",
    description: "Seus macros e calorias calculados.",
    icon: "nutricao",
    to: "/minha-nutricao",
  },
];

const EXPLORAR = [
  {
    id: "estudos",
    title: "Estudos científicos",
    meta: "10 min",
    to: "/estudos",
    image: "/images/estudos_cien.png",
  },
  {
    id: "montar",
    title: "Monte seu próprio treino",
    meta: "5 min",
    to: "/recomendacao-treino",
    image: "/images/monte_treino.png",
  },
  {
    id: "nutri",
    title: "Descubra sua recomendação nutricional",
    meta: "3 min",
    to: "/recomendacao-nutricional",
    image: "/images/recomendacao_nutri.png",
  },
  {
    id: "motivacional",
    title: "Área motivacional",
    meta: "8 min",
    to: "/motivacional",
    image: "/images/area_motiv.png",
  },
];

// Quando o plano existe, o card que levaria ao formulário sai do Explorar.
const CARD_DO_PLANO = { treino: "montar", nutricao: "nutri" };

/**
 * `nutricao_answers.frequencia` é gravado como número (1, 3 ou 5), enquanto
 * os demais campos são texto. A verificação antiga chamava `.trim()` em
 * todos, então estourava `frequencia.trim is not a function` — e como isso
 * acontecia dentro de um async sem captura, a checagem morria calada.
 */
function preenchido(valor) {
  return valor !== null && valor !== undefined && String(valor).trim() !== "";
}

function Skeleton() {
  return (
    <div className="h-60 w-full animate-shimmer rounded-card bg-shimmer bg-[length:300%_100%]" />
  );
}

function Secao({ titulo, children }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-caption uppercase text-dim">{titulo}</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>
    </section>
  );
}

function RecomendadoList() {
  const [planosSalvos, setPlanosSalvos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  // Mesmas consultas de sempre. O que muda é quando o resultado chega à tela.
  const verificarPlanos = useCallback(async () => {
    setLoading(true);
    setErro(false);

    try {
      const { data: session } = await supabase.auth.getUser();
      if (!session?.user) {
        setPlanosSalvos([]);
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data: treinoData } = await supabase
        .from("treino_answers")
        .select("freq_treino, duracao, experiencia")
        .eq("user_id", userId)
        .single();

      const { data: nutricaoData } = await supabase
        .from("nutricao_answers")
        .select("objetivo, frequencia")
        .eq("user_id", userId)
        .single();

      const respondeuTreino =
        preenchido(treinoData?.freq_treino) &&
        preenchido(treinoData?.duracao) &&
        preenchido(treinoData?.experiencia);

      const respondeuNutricao =
        preenchido(nutricaoData?.objetivo) &&
        preenchido(nutricaoData?.frequencia);

      // FM-24: a lista só é montada depois que as duas verificações terminam.
      setPlanosSalvos(
        [respondeuTreino && "treino", respondeuNutricao && "nutricao"].filter(
          Boolean
        )
      );
    } catch {
      setErro(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verificarPlanos();
  }, [verificarPlanos]);

  if (erro) {
    return (
      <Alert
        action={
          <Button variant="secondary" size="sm" onClick={verificarPlanos}>
            Tentar novamente
          </Button>
        }
      >
        Não foi possível carregar seus planos.
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-12">
        <Secao titulo="Seu plano">
          <Skeleton />
          <Skeleton />
        </Secao>
        <Secao titulo="Explorar">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Secao>
      </div>
    );
  }

  const planos = PLANOS.filter((p) => planosSalvos.includes(p.id));
  const descartados = planosSalvos.map((id) => CARD_DO_PLANO[id]);
  const explorar = EXPLORAR.filter((e) => !descartados.includes(e.id));

  return (
    <div className="flex flex-col gap-12">
      {planos.length > 0 && (
        <Secao titulo="Seu plano">
          {planos.map((p) => (
            <PlanoCard key={p.id} {...p} />
          ))}
        </Secao>
      )}

      <Secao titulo="Explorar">
        {explorar.map((c) => (
          <PhotoCard key={c.id} {...c} />
        ))}
      </Secao>
    </div>
  );
}

export default RecomendadoList;
