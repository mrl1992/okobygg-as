<template>
  <v-container fluid class="pa-6" max-width="1200">
    <!-- Loading state -->
    <div
      v-if="!currentProduct"
      class="d-flex justify-center align-center"
      style="height: 60vh"
    >
      <v-progress-circular indeterminate color="primary" size="48" />
    </div>

    <!-- Product layout -->
    <div v-else>
      <v-breadcrumbs class="mr-4" :items="crumbs" />

      <v-row dense>
        <!-- Image -->
        <v-col cols="12" md="12">
          <v-card elevation="2" class="pa-4">
            <v-row align="center">
              <v-col
                cols="12"
                md="6"
                class="d-flex align-center justify-center pr-4"
              >
                <v-img
                  :src="currentProduct?.imageUrl"
                  alt="Produktbilde"
                  contain
                  max-width="100%"
                  max-height="420"
                  class="rounded-lg"
                />
              </v-col>

              <v-col cols="12" md="6">
                <div class="d-flex flex-column h-100">
                  <div>
                    <h1 class="text-h5 font-weight-bold mb-2">
                      {{ currentProduct?.title }}
                    </h1>
                    <div class="text-h4 font-weight-bold mb-3">
                      {{ currentProduct?.price }} kr
                    </div>
                    <p class="grey--text mb-4">
                      {{ currentProduct?.description }}
                    </p>
                  </div>

                  <div class="mt-auto">
                    <v-row class="align-center">
                      <v-col cols="12" sm="6">
                        <v-btn
                          color="primary"
                          block
                          class="mb-2"
                          elevation="2"
                          @click="addToCart()"
                        >
                          Legg i handlekurv
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-expansion-panels
        class="mt-4"
        accordion
        v-model="panels"
        v-if="currentProduct?.specs"
      >
        <v-expansion-panel :value="'specs'">
          <v-expansion-panel-title> Produktdetaljer </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row dense class="align-start">
              <v-col cols="12" md="6" class="pr-md-4 pb-4 pb-md-0">
                <v-list dense>
                  <v-list-title>Spesifikasjoner</v-list-title>
                  <v-list-item
                    v-if="
                      currentProduct?.specs?.length ||
                      currentProduct?.specs?.width
                    "
                  >
                    <v-list-item-icon
                      ><v-icon small>mdi-ruler</v-icon></v-list-item-icon
                    >
                    <v-list-item-content>
                      <v-list-item-title>
                        Lengde:
                        <span v-if="currentProduct?.specs?.length">
                          {{ currentProduct?.specs?.length }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon
                      ><v-icon small>mdi-ruler</v-icon></v-list-item-icon
                    >
                    <v-list-item-content>
                      <v-list-item-title>
                        Bredde:
                        <span v-if="currentProduct?.specs?.width">
                          {{ currentProduct?.specs?.width }}
                        </span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-if="currentProduct?.specs?.thickness !== undefined"
                  >
                    <v-list-item-icon
                      ><v-icon small>mdi-ruler-square</v-icon></v-list-item-icon
                    >
                    <v-list-item-content>
                      <v-list-item-title>
                        Tykkelse:
                        {{ currentProduct?.specs?.thickness ?? "N/A" }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    v-if="currentProduct?.specs?.weight !== undefined"
                  >
                    <v-list-item-icon
                      ><v-icon small
                        >mdi-weight-kilogram</v-icon
                      ></v-list-item-icon
                    >
                    <v-list-item-content>
                      <v-list-item-title>
                        Vekt: {{ currentProduct?.specs?.weight ?? "N/A" }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-title>Anbefales til</v-list-title>

                  <v-list-item
                    v-for="item in currentProduct.usage"
                    :key="item._id"
                  >
                    <v-list-item-content class="d-flex">
                      <v-icon small color="primary" class="mr-2"
                        >mdi-check-circle</v-icon
                      >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import type { Product } from "~/models/product.interface";

  const route = useRoute();
  console.log("🚀 router:", route);

  const productsStore = useProductsStore();

  const currentProduct = ref<Product | null>(null);

  onMounted(async () => {
    if (productsStore) {
      const slug = route.params.slug as string;
      currentProduct.value = await productsStore.fetchProductBySlug(slug);
      console.log("🚀 ~ currentProduct.value:", currentProduct.value);
    }
    crumbs.value = [
      {
        title: "Hjem",
        disabled: false,
        href: "/",
      },
      {
        title: "Produkter",
        disabled: false,
        href: "/products",
      },
      {
        title: String(currentProduct.value?.title),
        disabled: true,
        href: "/",
      },
    ];
  });

  const crumbs = ref<Array<{ title: string; disabled: boolean; href: string }>>(
    []
  );

  const tab = ref(0);
  const panels = ref<string | null>("specs");

  const addToCart = () => {
    productsStore.addToCart(currentProduct.value);
  };
</script>

<style scoped>
  .image-container {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 16px;
  }
</style>
