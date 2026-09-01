import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CamposInfoBasicas from "../features/formulario/CamposInfoBasicas";
import { infoBasicasDoBanco } from "../features/formulario/infoBasicasDoBanco";
import { validar } from "../features/formulario/validarInfoBasicas";
import { useInfoBasica, useSalvarInfoBasica } from "../services/usePlanos";
import Alert from "../ui/Alert";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Confirmacao from "../ui/Confirmacao";
import Spinner from "../ui/Spinner";

/**
 * Meus dados — o corpo que alimenta as recomendações (gh#25).
 *
 * Até a gh#25, `info_basica` só era gravada pela etapa 1 dos questionários.
 * Para atualizar o peso depois de ganhar ou perder alguns quilos, o usuário
 * tinha de refazer um questionário inteiro — e, enquanto não fizesse, o plano
 * continuava calculado sobre um peso desatualizado, sem nada indicar isso.
 *
 * O peso é a entrada mais importante do produto: `calculadorMacros` deriva
 * proteína, gordura e carboidrato diretamente dele.
 *
 * Salvar remove a chave `info_basica` do cache (`usePlanos`), então **Minha
 * nutrição** e **Meu treino** recalculam com os valores novos.
 *
 * Os campos e a validação são os mesmos da etapa 1, por construção: ambos usam
 * `CamposInfoBasicas` e `validar`.
 */

/**
 * O `nome` continua no estado e continua sendo enviado — só não aparece na
 * tela, porque quem o edita agora é **Minha conta**.
 *
 * Ele precisa continuar viajando no payload: `salvarInfoBasica` faz upsert das
 * cinco colunas, e omitir o nome apagaria o valor gravado na primeira vez que
 * alguém salvasse um peso novo. Semear tudo e enviar tudo, mostrando só quatro
 * campos, é o que evita isso sem nenhum passo de mesclagem.
 */
const CAMPOS_CORPO = ["idade", "sexo", "peso", "altura"];

function MeusDados() {
  const { state } = useLocation();
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

    const encontrados = validar(valores, CAMPOS_CORPO);
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
        <h1 className="font-display text-display-l text-primary">Meus dados</h1>
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
      {/* Sem `to`, o BackButton cai em `navigate(-1)` — o que cobre quem chegou
          por URL direta, sem estado de navegação. */}
      <BackButton to={state?.voltarPara} className="self-start" />

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-display-l text-primary">Meus dados</h1>
        <p className="text-body text-secondary">
          Peso, altura, idade e sexo. São eles que calculam sua nutrição e seu
          treino — manter o peso em dia é o que mantém o plano correto.
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
          idPrefixo="dados"
          campos={CAMPOS_CORPO}
          desabilitado={salvar.isPending}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          {salvo ? <Confirmacao>Dados atualizados</Confirmacao> : <span />}

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

export default MeusDados;
