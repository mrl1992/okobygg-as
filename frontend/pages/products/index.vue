<template>
  <v-container>
    <div style="position: relative; z-index: 1">
      <v-row class="d-flex justify-center my-4">
        <div
          class="d-none d-md-flex w-100"
          style="background-color: #f5f5f5; padding: 8px; border-radius: 8px"
        >
          <v-btn-toggle
            v-model="activeCategory"
            color="deep-purple-accent-3"
            rounded="md"
            group
            class="flex-grow-1"
          >
            <v-btn
              v-for="category in productsStore.categories"
              :key="category._id"
              class="ma-2"
              color="primary"
              outlined
              :value="category.title"
              toggle
              mandatory
            >
              {{ category?.title }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <div class="d-flex d-md-none w-100">
          <v-select
            v-model="activeCategory"
            :items="productsStore.categories.map((c) => c.title)"
            label="Kategori"
            outlined
            dense
            hide-details
            class="ma-2 flex-grow-1"
            style="background-color: #f5f5f5; border-radius: 8px"
          />
        </div>
      </v-row>
      <v-row class="d-block d-md-flex flex-wrap">
        <v-col v-for="product in productsFromStore" :key="product._id">
          <product-card :product="product" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import type { Product } from "~/models/product.interface";
  import { useProductsStore } from "~/stores/products.store";

  const productsStore = useProductsStore();
  const productsFromStore = ref<Product[]>([]);
  const activeCategory = ref("Alle");
  onMounted(async () => {
    if (productsStore) {
      await productsStore.fetchProducts();
      productsFromStore.value = productsStore.products.sort((a, b) =>
        (a.category?.title ?? "").localeCompare(b.category?.title ?? "")
      );
      await productsStore.fetchCategories();
      productsStore.categories.unshift({
        _id: "all",
        title: "Alle",
        description: "All products",
      });
      if (productsStore.currentCategory !== "") {
        activeCategory.value = productsStore.currentCategory;
      }
    }
  });

  watch(
    activeCategory,
    (newCategory) => {
      if (newCategory === "Alle") {
        productsFromStore.value = productsStore.products.sort((a, b) =>
          (a.category?.title ?? "").localeCompare(b.category?.title ?? "")
        );
      } else {
        productsFromStore.value = productsStore.products.filter(
          (p) => p.category?.title === newCategory
        );
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    productsStore.currentCategory = "";
  });
</script>
