import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import supabase from "../../services/supabase";
import Card from "../../ui/Card";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

/**
 * Etapa 1 dos dois formulários — "Sobre você".
 *
 * FM-13: todo campo tem rótulo visível e associado.
 * A gravação em `info_basica` é a mesma de antes, com os mesmos campos.
 */

const SEXOS = ["Masculino", "Feminino"];

/**
 * Faixas do design. Sem isso, idade 999 ou peso 5 entram no cálculo de
 * macros e produzem um resultado sem sentido.
 */
function validar({ nome, idade, peso, altura }) {
  const erros = {};

  if (!String(nome ?? "").trim()) erros.nome = "Informe seu nome.";

  const n = { idade: Number(idade), peso: Number(peso), altura: Number(altura) };

  if (!n.idade || n.idade < 10 || n.idade > 100)
    erros.idade = "Informe uma idade entre 10 e 100.";
  if (!n.peso || n.peso < 30 || n.peso > 300)
    erros.peso = "Informe um peso entre 30 e 300 kg.";
  if (!n.altura || n.altura < 100 || n.altura > 250)
    erros.altura = "Informe uma altura entre 100 e 250 cm.";

  return erros;
}

function InfoBasicasStep({ fluxo }) {
  const { state, dispatch } = useForm();
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);
  const [erroServidor, setErroServidor] = useState(false);
  const [erros, setErros] = useState({});

  const { nome, idade, peso, altura, sexo } = state.infoBasicas;

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

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErroServidor(true);
      setSalvando(false);
      return;
    }

    const { error } = await supabase.from("info_basica").upsert(
      {
        user_id: user.id,
        nome,
        idade: Number(idade),
        sexo,
        peso: Number(peso),
        altura: Number(altura),
      },
      { onConflict: "user_id" }
    );

    setSalvando(false);

    if (error) {
      console.error(error);
      setErroServidor(true);
      return;
    }

    dispatch({ type: "RESET_PAGE" });
    navigate(`${fluxo.base}/questions`);
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
        <div className="grid grid-cols-2 gap-6">
          <Field
            className="col-span-2"
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

        <div className="flex items-center justify-between gap-6">
          <Button variant="secondary" to="/recomendado">
            Voltar
          </Button>

          <div className="flex flex-col items-end gap-2">
            <Button
              onClick={handleNext}
              disabled={!completo}
              loading={salvando}
              className="min-w-[180px]"
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
