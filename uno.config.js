import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      xl: "calc(var(--radius) + 4px)",
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
  },
  shortcuts: {
    "glass-bg":
      "bg-gradient-to-b from-white/80 to-white/58 border border-white/74 shadow-[0_22px_48px_rgba(35,113,186,0.12),inset_0_1px_0_rgba(255,255,255,0.84)] backdrop-blur-[18px]",
  },
  safelist: [
    "i-lucide-menu",
    "i-lucide-x",
    "i-lucide-search",
    "i-lucide-bell",
    "i-lucide-user",
    "i-lucide-chevron-down",
    "i-lucide-chevron-left",
    "i-lucide-chevron-right",
    "i-lucide-plus",
    "i-lucide-minus",
    "i-lucide-locate",
  ],
})
