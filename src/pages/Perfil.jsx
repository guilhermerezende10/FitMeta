import { useEffect, useState } from "react";

import CamposInfoBasicas from "../features/formulario/CamposInfoBasicas";
import { infoBasicasDoBanco } from "../features/formulario/infoBasicasDoBanco";
import { validar } from "../features/formulario/validarInfoBasicas";
import { useInfoBasica, useSalvarInfoBasica } from "../services/usePlanos";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";

/**
 * Perfil — ver e editar os dados básicos (gh#25).
 *
 * Até aqui, `info_basica` só era gravada pela etapa 1 dos questionários. Para
 * atualizar o peso depois de ganhar ou perder alguns quilos, o usuário tinha
 * de refazer um questionário inteiro — e, enquanto não fizesse, o plano
 * continuava calculado sobre um peso desatualizado, sem nada indicar isso.
 *
 * O peso é a entrada mais importante do produto: `calculadorMacros` deriva
 * proteína, gordura e carboidrato diretamente dele.
 *
 * Salvar remove a chave `info_basica` do cache (`usePlanos`), então **Minha
 * nutrição** recalcula com os valores novos sem exigir refazer o questionário.
 *
 * Os campos e a validação são os mesmos da etapa 1, por construção: ambos usam
 * `CamposInfoBasicas` e `validar`.
 */
function Perfil() {
  const { dados, carregando, erro, recarregar } = useInfoBasica();
  const salvar = useSalvarInfoBasica();

  // `null` enquanto não semeado. Distinguir de "semeado vazio" importa: um
  // usuário que entrou pelo Google e nunca respondeu questionário não tem
  // linha, e precisa ver um formulário em branco utilizável, não um erro.
  const [valores, setValores] = useState(null);
  const [erros, setErros] = useState({});
  const [erroServidor, setErroServidor] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    if (valores || carregando) return;
    setValores(infoBasicasDoBanco(dados));
  }, [dados, carregando, valores]);

  function setCampo(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    setErros((e) => (e[campo] ? { ...e, [campo]: undefined } : e));
    // Editar de novo tira a confirmação: ela vale para o que está salvo.
    setSalvo(false);
  }

  async function handleSalvar() {
    if (salvar.isPending) return;

    const encontrados = validar(valores);
    if (Object.keys(encontrados).length > 0) {
      setErros(encontrados);
      return;
    }

    setErroServidor(false);

    try {
      await salvar.mutateAsync(valores);
    } catch (e) {
      // O que foi digitado continua na tela: `valores` não é tocado aqui.
      console.error(e.message, e);
      setErroServidor(true);
      return;
    }

    setSalvo(true);
  }

  if (carregando || !valores) return <Spinner />;

  if (erro)
    return (
      <div className="flex flex-col gap-8">
        <h1 className="font-display text-display-l text-primary">Perfil</h1>
        <Alert
          action={
            <Button variant="secondary" size="sm" onClick={recarregar}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível carregar seus dados.
        </Alert>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-display-l text-primary">Perfil</h1>
        <p className="text-body text-secondary">
          Estes são os dados que calculam sua recomendação nutricional. Manter o
          peso em dia é o que mantém o plano correto.
        </p>
      </div>

      {erroServidor && (
        <Alert
          action={
            <Button variant="secondary" size="sm" onClick={handleSalvar}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível salvar suas informações.
        </Alert>
      )}

      <Card className="flex flex-col gap-8">
        <CamposInfoBasicas
          valores={valores}
          erros={erros}
          onCampo={setCampo}
          idPrefixo="perfil"
          desabilitado={salvar.isPending}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          {salvo ? (
            <p className="flex h-8 items-center gap-2 rounded-pill border border-accent bg-accent-surface px-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-accent-on-card"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
              <span className="text-label text-primary">Dados atualizados</span>
            </p>
          ) : (
            <span />
          )}

          <Button
            onClick={handleSalvar}
            loading={salvar.isPending}
            className="w-full sm:w-auto sm:min-w-[180px]"
          >
            Salvar
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Perfil;
