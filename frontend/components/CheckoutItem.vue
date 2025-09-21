<template>
  <div></div>
</template>

<script setup lang="ts">
  const productsStore = useProductsStore();

  const cartItems = computed(() => productsStore.cartItems);
</script>

<style scoped></style>
