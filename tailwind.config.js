/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Поддержка темной темы через класс .dark
  darkMode: ["class"],

  // 2. Где искать классы Tailwind (обязательно!)
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Если используешь src/:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 3. Кастомная тема — цвета, радиусы и т.д.
  theme: {
    extend: {
      // Закругления из твоих CSS-переменных
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Цвета — подключаем твои CSS-переменные
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",

        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },

        // Простые цвета (не объекты)
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",

        // Для графиков (если используешь)
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
      },
    },
  },

  // 4. Плагины
  plugins: [
    require("tailwindcss-animate"), // для анимаций в shadcn/ui
  ],
};
