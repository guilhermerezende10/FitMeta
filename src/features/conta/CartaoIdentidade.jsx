import Card from "../../ui/Card";

/**
 * Quem é você, e por onde entra.
 *
 * A tela se chamava "Minha conta" e não mostrava nada sobre a conta: nem
 * identidade, nem por qual provedor a pessoa entra — informação que o app já
 * tem em `provedores.js` e nunca exibia.
 *
 * Sem botão de propósito: é identidade, não ação. As ações moram nos cartões
 * de baixo, cada uma com o seu.
 */
function CartaoIdentidade({ nome, email, porSenha }) {
  const inicial = (nome?.[0] || "?").toUpperCase();

  return (
    <Card className="flex flex-wrap items-center gap-6">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 flex-none items-center justify-center rounded-pill bg-accent-surface font-display text-[28px] leading-none text-accent-on-card"
      >
        {inicial}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-display text-display-m text-primary">
          {nome}
        </span>
        <span className="truncate text-body text-secondary">{email}</span>
      </div>

      <span className="flex h-7 flex-none items-center gap-2 self-end rounded-pill border border-strong bg-surface-raised px-3 text-caption uppercase text-secondary">
        {!porSenha && (
          <span
            aria-hidden="true"
            className="flex h-[14px] w-[14px] items-center justify-center rounded-pill border border-strong text-[9px] font-semibold tracking-normal text-primary"
          >
            G
          </span>
        )}
        {porSenha ? "Entra com e-mail e senha" : "Entra com Google"}
      </span>
    </Card>
  );
}

export default CartaoIdentidade;
