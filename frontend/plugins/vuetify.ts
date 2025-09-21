import { defineNuxtPlugin } from "#app";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#66BB6A",
            "primary-light": "#E8F5E9",
            background: "#f7f7f7ff",
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
