import { useToasterStore } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ToastWithBlur() {
  const { toasts } = useToasterStore();
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    // Se há algum toast ativo, ativa o blur
    setIsToastVisible(toasts.some((t) => t.visible));
  }, [toasts]);

  return (
    <>
      {/* Overlay com blur */}
      {isToastVisible && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-[9998] transition-all duration-300" />
      )}
    </>
  );
}
