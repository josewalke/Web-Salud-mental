/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 20s ease-in-out infinite",
        "particle-float": "particle-float 15s ease-in-out infinite",
        "wave-pulse": "wave-pulse 10s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "shake": "shake 0.5s ease-in-out",
        "spin": "spin 1s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "25%": { transform: "translate(30px, -20px) rotate(90deg) scale(1.05)" },
          "50%": { transform: "translate(-20px, -40px) rotate(180deg) scale(0.95)" },
          "75%": { transform: "translate(-40px, 20px) rotate(270deg) scale(1.1)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" },
          "25%": { transform: "translate(15px, -10px) scale(1.2)", opacity: "0.5" },
          "50%": { transform: "translate(-10px, -25px) scale(0.8)", opacity: "0.2" },
          "75%": { transform: "translate(-20px, 10px) scale(1.1)", opacity: "0.4" },
        },
        "wave-pulse": {
          "0%": { opacity: "0.1", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.15", transform: "scale(1.1) rotate(180deg)" },
          "100%": { opacity: "0.08", transform: "scale(0.9) rotate(360deg)" },
        },
        "fadeInUp": {
          from: { opacity: "0", transform: "translate3d(0, 20px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        shake: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "25%": { transform: "translate3d(-5px, 0, 0)" },
          "75%": { transform: "translate3d(5px, 0, 0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
}
