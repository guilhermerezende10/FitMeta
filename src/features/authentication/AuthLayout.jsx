import { Outlet } from "react-router-dom";
import Brand from "../../ui/Brand";

/**
 * Layout da autenticação: foto à esquerda, formulário à direita.
 *
 * FM-01: sai o fundo branco.
 * FM-10: nada de `w-screen` — a largura vem do fluxo, não de 100vw.
 * FM-12: a foto tem véu obrigatório; o texto branco nunca fica solto sobre ela.
 */
function AuthLayout() {
  return (
    <div className="flex h-screen bg-canvas">
      {/* Coluna da foto — só no desktop */}
      <div className="relative hidden w-[45%] flex-col justify-between p-16 lg:flex">
        <img
          src="/images/tela_ini.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover [object-position:60%_center]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-scrim-hero" />
        <div aria-hidden="true" className="absolute inset-0 bg-scrim-right" />

        <Brand className="relative" />

        <div className="relative flex max-w-[460px] flex-col gap-6">
          <p className="font-display text-display-xl text-primary [text-wrap:pretty]">
            Treino e nutrição calculados para o seu corpo.
          </p>
          <p className="text-body-l text-secondary">
            Séries, cargas e macros em um só lugar, revisados a cada ciclo.
          </p>
        </div>
      </div>

      {/* Coluna do formulário */}
      <div className="flex w-full flex-col overflow-y-auto p-8 lg:w-[55%] lg:p-16">
        <div className="lg:hidden">
          <Brand />
        </div>

        <div className="m-auto w-full max-w-form">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
