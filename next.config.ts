import type { NextConfig } from "next";

// No GitHub Pages a página mora em /<nome-do-repo>. O workflow de deploy define NEXT_PUBLIC_BASE_PATH;
// localmente fica vazio e a página roda na raiz. Com domínio próprio em subdomínio, também fica vazio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // Tailwind v4 pelo loader do Turbopack, como o create-next-app 16 configura.
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
