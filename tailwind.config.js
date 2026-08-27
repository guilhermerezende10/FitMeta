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

        // ---- Rampas legadas — saem na Etapa 5, quando nenhuma tela as referenciar ----
        brand: {
          bgDarkGray:  '#192126',
          button1Violet: '#3F2B57',
          button2Purple: '#2B1546',
        },

        graydark: {
          50:  '#E7EAED',
          100: '#C2C8CD',
          200: '#9CA3AA',
          300: '#747C84',
          400: '#50575E',
          500: '#30363C',
          600: '#23292F',
          700: '#192126', // bgDarkGray
          800: '#141A1E',
          900: '#0C0F12',
        },

        darkblue: {
          50:  '#E3E9F6',
          100: '#C2CBEF',
          200: '#9AA9E5',
          300: '#7487DB',
          400: '#4D64D1',
          500: '#364EBE',
          600: '#2B409C',
          700: '#223479',
          800: '#1A2858',
          900: '#121C3A',
          150: '#1b2124',
        },

        darkpurple: {
          50:  '#EFE5F7',
          100: '#D5BEEF',
          200: '#B78AE2',
          300: '#9956D6',
          400: '#7C29C9',
          500: '#6515B0',
          600: '#50108D',
          700: '#3C0C6A',
          800: '#290847',
          900: '#190529',
        },

        darkteal: {
          50:  '#E3F5F3',
          100: '#BFE8E4',
          200: '#95D8D2',
          300: '#6BC8C0',
          400: '#42B8AE',
          500: '#2B9F95',
          600: '#227D76',
          700: '#195A57',
          800: '#113838',
          900: '#0A1F1F',
        },

        darkred: {
          50:  '#F9E6E6',
          100: '#F1BDBD',
          200: '#E58C8C',
          300: '#DA5B5B',
          400: '#CF2A2A',
          500: '#B31212',
          600: '#900E0E',
          700: '#6E0A0A',
          800: '#4C0606',
          900: '#2B0303',
        },

        darkorange: {
          50:  '#FFF1E6',
          100: '#FFD9B8',
          200: '#FFC088',
          300: '#FFA758',
          400: '#FF8E28',
          500: '#E6720E',
          600: '#B8590B',
          700: '#8A4108',
          800: '#5C2905',
          900: '#2E1202',
        },
      },

      // Papéis de texto (text-primary, text-secondary, text-muted, text-faint)
      textColor: {
        primary: "#F2F5F7",
        secondary: "#A8B2B9",
        muted: "#8E979E",   // piso para qualquer texto (4.6:1)
        faint: "#7A858C",   // só placeholder e rótulo de eixo
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
