import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "**/*.glb",
                "**/*.gltf",
                "**/*.bin",
                "**/*.hdr",
                "**/*.ktx2",
                "**/*.png",
                "**/*.jpg",
                "**/*.jpeg",
                "**/*.webp",
              ],
              message:
                "Binary assets must be served from /public and referenced by URL paths (e.g. /models/house.glb). Do not import them.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
