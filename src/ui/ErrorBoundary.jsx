import { Component } from "react";

import Button from "./Button";

/**
 * Rede de seguranca no topo da arvore.
 *
 * Sem isto, qualquer excecao durante o render desmonta o app inteiro e o
 * usuario fica com a tela em branco, sem nenhuma saida a nao ser recarregar no
 * navegador. Foi exatamente o que acontecia quando a busca de alimentos
 * falhava (gh#7).
 *
 * Precisa ser classe: React nao expoe equivalente de componentDidCatch em
 * componentes de funcao.
 */
class ErrorBoundary extends Component {
  state = { erro: null };

  static getDerivedStateFromError(erro) {
    return { erro };
  }

  componentDidCatch(erro, info) {
    console.error("Erro nao tratado no render:", erro, info);
  }

  render() {
    if (!this.state.erro) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
        <h1 className="text-h2 text-primary">Algo deu errado</h1>
        <p className="max-w-prose text-body text-secondary">
          A tela nao pode ser carregada. Tente de novo — se continuar, recarregue
          a pagina.
        </p>
        <Button onClick={() => this.setState({ erro: null })}>
          Tentar novamente
        </Button>
      </div>
    );
  }
}

export default ErrorBoundary;
