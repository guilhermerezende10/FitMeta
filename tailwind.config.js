/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Corpo e interface
        sans: ["Poppins", "system-ui", "sans-serif"],
        // Display / títulos
        display: ["'Barlow Condensed'", "'Poppins'", "sans-serif"],
      },

      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "3.25rem", fontWeight: "700" }],   // 56 / 52
        "display-l":  ["2.5rem", { lineHeight: "2.5rem",  fontWeight: "700" }],   // 40 / 40
        "display-m":  ["1.75rem", { lineHeight: "2rem",   fontWeight: "700" }],   // 28 / 32
        title:        ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],  // 20 / 28
        "body-l":     ["1rem",      { lineHeight: "1.5rem" }],                    // 16 / 24
        "body-long":  ["1rem",      { lineHeight: "1.75rem" }],                   // 16 / 28 (documento)
        body:         ["0.9375rem", { lineHeight: "1.5rem" }],                    // 15 / 24
        label:        ["0.8125rem", { lineHeight: "1rem", fontWeight: "500" }],   // 13 / 16
        caption:      ["0.75rem",   { lineHeight: "1rem", fontWeight: "600", letterSpacing: "0.1em" }], // 12 / 16
      },

      colors: {
        // ---- Tokens v1 (semânticos) ----
        canvas: "#10161A",

        surface: {
          DEFAULT: "#192126",
          sunken: "#0B0F12",
          raised: "#232C32",
          accent: "#241A33",
        },

        // Cinza de apoio do design (rótulo de seção, e-mail, ícone inativo)
        dim: "#6F7A82",

        // Linhas / divisores (para uso com bg-*)
        line: {
          DEFAULT: "#2C353B",
          strong: "#3D474E",
        },

        accent: {
          DEFAULT: "#8B45E0",
          hover: "#9E63E8",
          press: "#7C29C9",
          "on-card": "#B78AE2",
          surface: "#241A33",
        },

        danger: {
          DEFAULT: "#DA5B5B",
          "on-card": "#E07070",
        },

        // Cores de dados (ordem fixa: proteína, carboidrato, gordura)
        macro: {
          protein: "#9956D6",
          carb: "#00A99D",
          fat: "#E46D00",
        },

      },

      // Papéis de texto (text-primary, text-secondary, text-muted, text-faint)
      textColor: {
        primary: "#F2F5F7",
        secondary: "#A8B2B9",
        muted: "#8E979E",
        faint: "#7A858C",
        dim: "#6F7A82",
      },

      // border, border-strong, border-accent
      borderColor: {
        DEFAULT: "#2C353B",
        strong: "#3D474E",
      },

      borderRadius: {
        "field-sm": "8px",
        field: "10px",
        row: "12px",
        card: "20px",
        pill: "999px",
      },

      boxShadow: {
        e1: "0 1px 2px rgba(0,0,0,.4)",
        e2: "0 4px 16px rgba(0,0,0,.45)",
        e3: "0 12px 32px rgba(0,0,0,.55)",
        glow: "0 6px 20px rgba(139,69,224,.28)",
        "glow-lg": "0 8px 28px rgba(139,69,224,.36)",
        focus: "0 0 0 3px rgba(139,69,224,.25)",
      },

      backgroundImage: {
        // FM-02: o gradiente primário passa a ser um token de verdade
        "gradient-primary": "linear-gradient(135deg, #9450E4, #7C29C9)",
        "gradient-primary-hover": "linear-gradient(135deg, #A66BEA, #8B45E0)",
        // Véu obrigatório sobre foto (de baixo para cima) — FM-12
        scrim:
          "linear-gradient(180deg, rgba(11,15,18,.75) 0%, rgba(11,15,18,.25) 45%, rgba(11,15,18,.55) 100%)",
        "scrim-hero":
          "linear-gradient(180deg, rgba(11,15,18,.62) 0%, rgba(11,15,18,.30) 45%, rgba(11,15,18,.80) 100%)",
        "scrim-right":
          "linear-gradient(90deg, rgba(11,15,18,0) 55%, rgba(11,15,18,.55) 100%)",
        // Véu do card de foto do painel — de baixo para cima
        "scrim-card":
          "linear-gradient(0deg, rgba(11,15,18,.94) 0%, rgba(11,15,18,.72) 28%, rgba(11,15,18,.20) 60%, rgba(11,15,18,0) 82%)",
        // Brilho do card de plano salvo
        "plano-glow":
          "radial-gradient(260px 180px at 0% 0%, rgba(139,69,224,.16), rgba(25,33,38,0) 70%)",
        shimmer:
          "linear-gradient(100deg, #232C32 30%, #2C353B 50%, #232C32 70%)",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" },
        },
      },

      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
      },

      spacing: {
        sidebar: "240px",
      },

      maxWidth: {
        content: "1104px", // área de conteúdo do shell (1440 - 240 sidebar - 96 padding)
        doc: "700px",      // coluna de documento legal
        form: "420px",     // coluna de formulário de autenticação
      },

      height: {
        control: "48px",
      },

      minHeight: {
        control: "48px",
      },
    },
  },
  plugins: [],
}
