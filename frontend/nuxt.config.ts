import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-09-10",
  css: ["~/stylesheets/style.scss", "vuetify/styles"],
  runtimeConfig: {
    sanityToken: process.env.NUXT_SANITY_API_READ_TOKEN || "",
    public: {
      sanityProjectId: process.env.NUXT_SANITY_PROJECT_ID || "",
      sanityDataset: process.env.NUXT_SANITY_DATASET || "production",
      sanityApiVersion: process.env.NUXT_SANITY_API_VERSION || "2023-09-01",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt", // ✅ Pinia integration
  ],
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
    optimizeDeps: {
      include: ["shallowequal", "lodash/startCase.js"],
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    baseURL: "/okobygg/", // 👈 important for GitHub Pages
  },
});
