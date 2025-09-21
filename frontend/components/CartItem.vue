<template>
  <div v-for="id in uniqueIds" :key="id" class="d-flex pa-4 align-start">
    <v-img
      :src="productById(id)?.imageUrl"
      :alt="productById(id)?.title"
      width="120"
      height="120"
      class="ma-0 pa-0"
    />
    <div>
      <h4 class="mb-1">
        {{
          productById(id)?.category?.title !== "Tilbehør"
            ? productById(id)?.category?.title + " - " + productById(id)?.title
            : productById(id)?.title
        }}
      </h4>

      <p v-if="count(id) > 0" class="mb-1 d-flex align-center">
        Antall:
        <span class="mx-2">{{ count(id) }}</span>

        <!-- Minus button: remove one item of this id from the cart -->
        <!-- <v-btn
          small
          icon
          @click="removeOne(id)"
          :disabled="count(id) === 0"
          class="mr-1"
        >
          <v-icon small>mdi-minus</v-icon>
        </v-btn> -->

        <!-- Plus button: add one more of this product to the cart -->
        <!-- <v-btn small icon @click="addOne(id)" class="ml-1">
          <v-icon small>mdi-plus</v-icon>
        </v-btn> -->

        <!-- Delete button: remove all items with this id from the cart -->
        <!-- <v-btn
          small
          icon
          color="red"
          class="ml-2"
          @click="
            productStore.cartItems = productStore.cartItems.filter(
              (p) => p._id !== id
            )
          "
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn> -->
      </p>
      <div>
        <v-btn size="x-small" variant="outlined" @click="removeOne(id)">
          <v-icon small>mdi-minus</v-icon>
        </v-btn>
        <v-btn
          class="ml-2"
          size="x-small"
          variant="outlined"
          @click="addOne(id)"
        >
          <v-icon small>mdi-plus</v-icon>
        </v-btn>
      </div>
      <p v-if="count(id) >= 1" class="font-weight-bold mt-2">
        Pris:
        {{ (count(id) * (productById(id)?.price ?? 0)).toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from "vue";

  const productStore = useProductsStore();

  // keep a persistent order of unique ids so the UI order doesn't jump
  // when earlier duplicates are removed; we initialize from the current cart
  // and update on changes to cartItems.
  const addedOrder = ref<string[]>([
    ...new Set(productStore.cartItems.map((p) => p._id)),
  ]);

  watch(
    () => productStore.cartItems.map((p) => p._id),
    (newIds) => {
      const unique = [...new Set(newIds)];
      // append any newly added ids in the order they appear
      for (const id of unique) {
        if (!addedOrder.value.includes(id)) {
          addedOrder.value.push(id);
        }
      }
      // remove ids that no longer exist in the cart
      addedOrder.value = addedOrder.value.filter((id) => unique.includes(id));
    },
    { immediate: true }
  );

  const uniqueIds = computed(() => addedOrder.value);

  function count(id: string) {
    return productStore.cartItems.filter((p) => p._id === id).length;
  }

  function productById(id: string) {
    return productStore.cartItems.find((p) => p._id === id);
  }

  function addOne(id: string) {
    const p = productById(id);
    if (!p) return;
    // call the store's addToCart with the product
    productStore.addToCart?.(p);
  }

  function removeOne(id: string) {
    removeOneFromCart(id);
  }

  function removeOneFromCart(id: string) {
    const idx = productStore.cartItems.findIndex((p) => p._id === id);
    if (idx < 0) return false;
    productStore.cartItems.splice(idx, 1);
    return true;
  }

  console.log("🚀 cartItems:", productStore.cartItems);
</script>

<style lang="scss" scoped></style>
