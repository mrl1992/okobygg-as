<script setup lang="ts">
  import { useProductsStore } from "~/stores/products.store";

  const productsStore = useProductsStore();

  onMounted(async () => {
    if (productsStore) {
      await productsStore.fetchCategories();
    }
  });

  const rerouteToProducts = (category: string) => {
    productsStore.currentCategory = category;
    navigateTo("/products");
  };
</script>

<template>
  <v-container class="px-4" style="max-width: 1500px; width: 100%">
    <section class="w-100 d-flex justify-center mt-8">
      <v-sheet
        class="rounded-lg overflow-hidden hero"
        elevation="2"
        width="100%"
        style="min-height: 480px; height: clamp(480px, 75vh, 900px)"
      >
        <v-img
          src="/worker.png"
          alt="Worker insulating a room wall"
          class="fill-height"
          cover
        >
          <div
            class="fill-height d-flex align-center justify-center px-4 hero-overlay"
          >
            <div class="text-center hero-inner">
              <h1 class="hero-title">Økobygg</h1>
              <p class="hero-subtitle">
                Økobygg ble startet for å gjøre bærekraftige produkter mer
                tilgjengelige for alle som bygger eller pusser opp hjem
              </p>

              <div
                class="d-flex flex-column flex-sm-row align-center justify-center gap-3 mt-6"
              >
                <v-btn class="ma-2" color="primary" large>
                  <a href="mailto:post@okobygg.no">Kontakt oss</a>
                </v-btn>
                <NuxtLink to="/products">
                  <v-btn class="ma-2" color="white" variant="outlined" large
                    >Se produkter</v-btn
                  >
                </NuxtLink>
              </div>
            </div>
          </div>
        </v-img>
      </v-sheet>
    </section>

    <section class="my-12">
      <v-row v-if="productsStore.loading">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
          <v-card class="d-flex flex-column h-100">
            <v-skeleton-loader
              class="w-100"
              style="height: 220px"
              type="image"
            />

            <v-card-title class="pt-3 pb-1">
              <v-skeleton-loader type="heading" width="60%" />
            </v-card-title>
            <v-card-subtitle class="pb-2">
              <v-skeleton-loader type="text" width="40%" />
            </v-card-subtitle>

            <v-card-text class="card-text-flex">
              <div style="flex: 1 1 auto">
                <v-skeleton-loader type="text" width="100%" class="mb-2" />
                <v-skeleton-loader type="text" width="100%" class="mb-2" />
                <v-skeleton-loader type="text" width="80%" />
              </div>

              <div class="card-cta">
                <v-skeleton-loader type="button" width="120px" height="36px" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div v-else-if="productsStore.error" class="text-center">
        Error: {{ productsStore.error }}
      </div>

      <v-row v-else>
        <v-col
          v-for="category in productsStore.categories.filter(
            (c) => c.title !== 'Tilbehør'
          )"
          :key="category._id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="d-flex flex-column h-100">
            <v-img :src="category.imageUrl" height="320" class="w-100" cover />

            <v-card-title class="pt-3 pb-1">{{ category.title }}</v-card-title>

            <v-card-text class="card-text-flex mx-2">
              <p class="card-desc">
                {{ category.description }}
              </p>
              <div class="card-cta">
                <v-btn
                  color="primary"
                  class="ma-4"
                  block
                  @click="rerouteToProducts(category.title)"
                >
                  Se produkter</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-card>
        <div class="d-flex flex-column flex-md-row">
          <v-col cols="12" md="6">
            <div class="pa-6">
              <h4 class="text-h5 font-weight-medium mb-3">Om Økobygg</h4>

              <p class="body-1 mb-4">
                Økobygg AS er et lite byggevarehus som spesialiserer seg på
                unike byggevarer som ofte ikke er tilgjengelige i de større
                varehusene. Et godt eksempel er linisolasjon — et naturlig og
                pustende material som regulerer fukt og gir gode
                isolasjonsegenskaper.
              </p>

              <v-divider class="my-4" />

              <div class="mb-4">
                <p class="body-2">
                  Lin har en lang historie som tekstilfiber og har vært i bruk i
                  tusenvis av år (eldste funn fra Egypt). Linplantens fibre gir
                  både vakre tekstiler og effektive isolasjonsprodukter,
                  samtidig som de er et bærekraftig valg.
                </p>
              </div>

              <v-divider class="my-4" />

              <div class="mb-4">
                <p class="body-2">
                  Hos Økobygg AS tilbyr vi et bredt utvalg av produkter for
                  varme- og lydisolering, inkludert dyttestrimmel, laftevatt og
                  plateisolasjon. Våre produkter er laget av lin, og
                  produksjonen er forankret i miljøbevisste verdier
                </p>
              </div>
              <div class="d-flex justify-center justify-center">
                <div class="d-flex flex-column align-center mr-4">
                  <v-icon size="large" color="green">mdi-leaf</v-icon>
                  Miljøvennlig
                </div>
                <div class="d-flex flex-column align-center">
                  <v-icon size="large" color="green">mdi-leaf</v-icon>
                  Bærekraftig
                </div>
              </div>
            </div>
          </v-col>

          <v-col
            cols="12"
            md="6"
            class="d-none d-md-flex align-center justify-center"
          >
            <v-carousel
              class="rounded"
              cycle
              :show-arrows="false"
              hide-delimiters
            >
              <v-carousel-item
                src="../public//slide-1.png"
                cover
              ></v-carousel-item>
              <v-carousel-item
                src="../public/slide-2.png"
                cover
              ></v-carousel-item>
              <v-carousel-item
                src="../public/slide-3.png"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-col>
        </div>
      </v-card>
    </section>

    <section class="my-12">
      <v-row>
        <v-card
          class="w-100"
          style="
            background: linear-gradient(
              180deg,
              rgba(var(--v-theme-primary)) 0%,
              rgba(69, 138, 72, 1) 100%
            );
          "
        >
          <div
            class="d-flex flex-column align-center justify-center pa-8 pa-md-12"
          >
            <v-card-title class="text-h4 hero-cta-title">
              Klar for ditt prosjekt?
            </v-card-title>

            <v-card-text class="text-h6 text-center hero-cta-text">
              Ta kontakt med oss i dag for en uforpliktende samtale om ditt
              isolasjonsbehov eller prøv vår produktvelger. Vi hjelper deg med å
              finne den beste løsningen.
            </v-card-text>

            <div
              class="d-flex flex-column flex-sm-row align-center justify-center gap-3 mt-6"
            >
              <v-btn variant="outlined" color="white" class="ma-2">
                <a href="mailto:post@okobygg.no">Kontakt oss</a>
              </v-btn>
              <NuxtLink to="/product-picker">
                <v-btn variant="outlined" color="white" class="ma-2"
                  >Produktvelger</v-btn
                >
              </NuxtLink>
            </div>
          </div>
        </v-card>
      </v-row>
    </section>
  </v-container>
</template>

<style scoped>
  /* Hero responsiveness */
  .hero {
    height: 50vh;
    min-height: 320px;
  }
  @media (max-width: 960px) {
    .hero {
      height: 44vh;
      min-height: 280px;
    }
  }
  @media (max-width: 480px) {
    .hero {
      height: 36vh;
      min-height: 220px;
    }
  }
  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.45)
    );
  }
  .hero-inner {
    max-width: 48rem;
    padding: 0 8px;
  }
  .hero-title {
    color: #eee;
    margin: 0;
    font-weight: 600;
    font-size: 3.25rem;
    line-height: 1.05;
  }
  .hero-subtitle {
    color: #eee;
    margin-top: 0.5rem;
    font-size: 1.125rem;
  }

  /* Larger on medium+ screens */
  @media (min-width: 960px) {
    .hero-title {
      font-size: 6.25rem;
    }
    .hero-subtitle {
      font-size: 1.5rem;
    }
  }

  /* Cards */
  .card-text-flex {
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
  .card-cta {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 12px 0 16px 0;
    flex: 0 0 auto;
    width: 100%;
  }
  .card-desc {
    margin: 0;
    color: inherit;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25rem;
    min-height: calc(1.25rem * 4);
  }

  /* Make buttons full width on small screens for easier tapping */
  @media (max-width: 600px) {
    .card-cta .v-btn {
      width: 100% !important;
    }
    .hero-title {
      font-size: 1.85rem;
    }
    .hero-subtitle {
      font-size: 1.2rem;
    }
  }

  /* CTA section */
  .hero-cta-title {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .hero-cta-text {
    color: #fff;
    max-width: 40em;
  }

  /* Make sure columns stack nicely */
  @media (max-width: 960px) {
    .d-md-flex {
      display: none !important;
    }
  }
</style>
