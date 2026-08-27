import { Outlet, useLocation } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { fluxoDaRota } from "../formulario/fluxos";
import Stepper from "../../ui/Stepper";

/**
 * Casca compartilhada pelos dois formulários.
 *
 * FM-01: sai o bg-white.
 * O cabeçalho em pílula, que não dizia onde o usuário estava, dá lugar ao
 * indicador de etapa.
 */
function FormLayout() {
  const { pathname } = useLocation();
  const { state } = useForm();
  const fluxo = fluxoDaRota(pathname);

  // A tela de resultado usa a mesma casca, mas sem passo a passo.
  const ehResultado = pathname.endsWith("/resultado");
  const ehFormulario = pathname.includes("/formulario") && !ehResultado;

  if (!ehFormulario) {
    return <Outlet />;
  }

  // Etapa 1 é "Sobre você"; as perguntas seguem a partir da 2.
  const naIntro = pathname.endsWith("/iniciar");
  const etapaAtual = naIntro ? 1 : state.pageIndex + 1;

  return (
    <div className="flex w-full justify-center py-2">
      <div className="flex w-full max-w-[720px] flex-col gap-8">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="font-display text-display-l text-primary">
            {fluxo.titulo}
          </h1>
          <p className="text-body text-secondary">Leva menos de 2 minutos.</p>
        </header>

        <Stepper steps={fluxo.etapas} current={etapaAtual} />

        <Outlet />
      </div>
    </div>
  );
}

export default FormLayout;
