import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import mw from "./eslint.mw.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...mw,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
