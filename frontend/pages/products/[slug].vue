<template>
  <v-card>
    <v-card-title class="d-flex- justify-center w-100">
      <h1 class="text-h4 ml-6 mt-4">{{ currentProduct?.title }}</h1>
    </v-card-title>
    <v-card-text class="d-flex">
      <div class="image-container pa-6">
        <v-img
          :src="currentProduct?.imageUrl"
          height="500"
          width="500"
          cover
          class="rounded-lg"
        ></v-img>
      </div>
      <div class="pa-6">
        <p class="mb-4">Kategori: {{ currentProduct?.category?.title }}</p>
        <p class="text-h5 font-weight-bold mb-4">
          Pris: {{ currentProduct?.price }} kr
        </p>
        <p>{{ currentProduct?.description }}</p>
      </div>
      <div class="pa-6" style="min-width: 280px">
        <v-card outlined class="rounded-lg">
          <v-card-title class="text-subtitle-1 font-weight-medium"
            >Mål & vekt</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-item
                :title="`Tykkelse: ${currentProduct?.thickness ?? 'N/A'} cm`"
              >
                <v-list-item-content>
                  <v-list-item-title
                    >Tykkelse:
                    {{
                      currentProduct?.thickness ?? "N/A"
                    }}
                    cm</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
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
  });
</script>

<style scoped>
  .image-container {
    width: 500px;
    height: 500px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 16px;
  }
</style>
