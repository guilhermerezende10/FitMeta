// function Img({ src, alt = "", className = "" }) {
//   return (
//     <img
//       src={src}
//       alt={alt}
//       loading="lazy"        // Lazy loading automático
//       decoding="async"      // Render mais leve
//       className={className || "h-full w-full object-cover opacity-90"}
//     />
//   );
// }

// export default Img;

import { useState } from "react";

export default function Img({
  src,
  alt = "",
  className = "",
  blurClassName = "blur-xl scale-100",
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`
        h-full w-full object-cover
        transition-all duration-700 ease-out
        ${loaded ? "opacity-100 blur-0 scale-100" : `opacity-0 ${blurClassName}`}
        ${className}
      `}
      {...props}
    />
  );
}

