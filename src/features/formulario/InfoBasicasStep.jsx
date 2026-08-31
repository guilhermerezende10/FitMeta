import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import { useInfoBasica, useSalvarInfoBasica } from "../../services/usePlanos";
import Card from "../../ui/Card";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { validar } from "./validarInfoBasicas";
import { infoBasicasDoBanco } from "./infoBasicasDoBanco";

/**
 * Etapa 1 dos dois formulários — "Sobre você".
 *
 * FM-13: todo campo tem rótulo visível e associado.
 * A gravação em `info_basica` é a mesma de antes, com os mesmos campos.
 */

const SEXOS = ["Masculino", "Feminino"];

function InfoBasicasStep({ fluxo }) {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [erroServidor, setErroServidor] = useState(false);
  const [erros, setErros] = useState({});

  const { nome, idade, peso, altura, sexo } = state.infoBasicas;

  // Se o contexto já tem valores, eles vêm do rascunho da sessão (gh#24) ou de
  // uma passagem anterior por esta etapa — pode ser edição em andamento, e
  // semear por cima a apagaria.
  const contextoVazio = !(nome || idade || peso || altura || sexo);

  const { dados: salvos, carregando } = useInfoBasica();
  const salvar = useSalvarInfoBasica();

  /**
   * gh#17: o contexto nasce vazio a cada carregamento, então quem já tinha
   * preenchido a etapa redigitava os cinco campos. A etapa vira "conferir e
   * ajustar" em vez de "digitar do zero".
   *
   * gh#16: a busca era um efeito próprio, com `supabase.auth.getUser()` e
   * controle manual de carregamento — e foi ali que nasceu o bug de skeleton
   * eterno sob StrictMode. Vindo do React Query, o ciclo de vida deixa de ser
   * responsabilidade desta tela.
   */
  useEffect(() => {
    if (!contextoVazio || !salvos) return;
    dispatch({ type: "SEED_INFO", payload: infoBasicasDoBanco(salvos) });
  }, [contextoVazio, salvos, dispatch]);

  // Os campos são controlados: não podem aparecer vazios e preencher depois.
  // Sem linha salva, ou com falha na busca, `carregando` fecha e o formulário
  // fica utilizável em branco — perde-se a conveniência, não a funcionalidade.
  const semeando = contextoVazio && carregando;

  function setCampo(field, value) {
    dispatch({ type: "SET_INFO", payload: { field, value } });
    // O erro some assim que o usuário volta a mexer no campo.
    setErros((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }

  const completo =
    nome?.trim() &&
    idade?.trim() &&
    sexo?.trim() &&
    peso?.trim() &&
    altura?.trim();

  async function handleNext() {
    if (!completo || salvando) return;

    const encontrados = validar({ nome, idade, peso, altura });
    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      return;
    }

    setSalvando(true);
    setErroServidor(false);

    try {
      await salvar.mutateAsync({ nome, idade, sexo, peso, altura });
    } catch (erro) {
      console.error(erro.message, erro);
      setErroServidor(true);
      return;
    } finally {
      setSalvando(false);
    }

    dispatch({ type: "RESET_PAGE" });
    navigate(`${fluxo.base}/questions`);
  }

  // Placeholder com a mesma silhueta do formulário: dois campos largos, quatro
  // em grade e a barra de ações. Evita o salto de layout quando os campos
  // chegam preenchidos.
  if (semeando) {
    return (
      <div className="flex w-full flex-col gap-4">
        <Card className="flex flex-col gap-8" aria-busy="true">
          <span className="sr-only">Carregando seus dados…</span>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="h-control w-full animate-shimmer rounded-field bg-shimmer bg-[length:300%_100%] sm:col-span-2" />
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-control w-full animate-shimmer rounded-field bg-shimmer bg-[length:300%_100%]"
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="h-control w-28 animate-shimmer rounded-field bg-shimmer bg-[length:300%_100%]" />
            <div className="h-control w-full animate-shimmer rounded-field bg-shimmer bg-[length:300%_100%] sm:w-[180px]" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {erroServidor && (
        <Alert
          action={
            <Button variant="secondary" size="sm" onClick={handleNext}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível salvar suas informações.
        </Alert>
      )}

      <Card className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            className="sm:col-span-2"
            tone="card"
            label="Nome"
            id="fm-nome"
            type="text"
            placeholder="Como você se chama"
            value={nome}
            onChange={(e) => setCampo("nome", e.target.value)}
            error={erros.nome}
          />

          <Field
            tone="card"
            label="Idade"
            id="fm-idade"
            type="number"
            inputMode="numeric"
            placeholder="0"
            unit="anos"
            value={idade}
            onChange={(e) => setCampo("idade", e.target.value)}
            error={erros.idade}
          />

          <div className="flex flex-col gap-2">
            <span className="text-caption uppercase text-muted">Sexo</span>
            <div
              role="radiogroup"
              aria-label="Sexo"
              className="flex h-control gap-1 rounded-field border border-line bg-canvas p-1"
            >
              {SEXOS.map((opcao) => {
                const ativo = sexo?.toLowerCase() === opcao.toLowerCase();
                return (
                  <button
                    key={opcao}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setCampo("sexo", opcao.toLowerCase())}
                    className={`flex-1 rounded-field-sm text-body font-medium outline-none transition-colors focus-visible:shadow-focus ${
                      ativo
                        ? "bg-accent-surface text-primary"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {opcao}
                  </button>
                );
              })}
            </div>
          </div>

          <Field
            tone="card"
            label="Peso"
            id="fm-peso"
            type="number"
            inputMode="decimal"
            placeholder="0"
            unit="kg"
            value={peso}
            onChange={(e) => setCampo("peso", e.target.value)}
            error={erros.peso}
          />

          <Field
            tone="card"
            label="Altura"
            id="fm-altura"
            type="number"
            inputMode="numeric"
            placeholder="0"
            unit="cm"
            value={altura}
            onChange={(e) => setCampo("altura", e.target.value)}
            error={erros.altura}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <Button variant="secondary" to="/recomendado">
            Voltar
          </Button>

          <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
            <Button
              onClick={handleNext}
              disabled={!completo}
              loading={salvando}
              className="w-full sm:w-auto sm:min-w-[180px]"
            >
              Próximo
            </Button>
            {!completo && (
              <p className="text-label text-muted">
                Preencha todos os campos para continuar.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default InfoBasicasStep;
