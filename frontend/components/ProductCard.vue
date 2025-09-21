<template>
  <v-card
    class="d-flex flex-column"
    style="flex: 0 0 320px; width: 360px; height: 570px; box-sizing: border-box"
  >
    <NuxtLink
      :to="`/products/${product.slug}`"
      style="text-decoration: none; color: inherit"
    >
      <v-img
        :src="product.imageUrl"
        :alt="product.title"
        height="300"
        class="w-100"
        cover
        style="min-height: 300px; aspect-ratio: 16/9; object-fit: cover"
      />
    </NuxtLink>
    <v-card-title class="pt-3 pb-0 d-flex justify-space-between align-center">
      {{ product.title }}
      <v-chip color="primary" variant="tonal" size="small">
        # {{ product.category?.title }}
      </v-chip>
    </v-card-title>

    <v-card-text
      class="mx-2"
      style="
        padding: 8px;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
      "
    >
      <span class="price-text"> Pris: {{ product.price }} kr </span>
      <p
        style="
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
        "
      >
        {{ product.description }}
      </p>
      <div
        style="
          display: flex;
          justify-content: center;
          margin-top: auto;
          padding: 12px 0 16px 0;
          flex: 0 0 auto;
        "
      >
        <v-btn @click="addToCart()" color="primary" class="ma-4">Kjøp</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { Product } from "~/models/product.interface";

  interface Props {
    product: Product;
  }

  const { product } = defineProps<Props>();

  const productStore = useProductsStore();

  const addToCart = () => {
    productStore.addToCart(product);
  };
</script>

<style scoped></style>
