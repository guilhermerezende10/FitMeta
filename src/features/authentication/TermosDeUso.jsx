import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

function TermosDeUso() {
  return (
    <div>
      <input type="checkbox" />
      <p>
        Li e concordo com a <span>Política de Privacidade</span> e com os{" "}
        <span>Termos de uso</span>
      </p>
    </div>
  );
}

export default TermosDeUso;
