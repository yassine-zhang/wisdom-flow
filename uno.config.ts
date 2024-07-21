// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetWind from "@unocss/preset-wind";

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetAttributify(), presetWind({ important: true })],
});
