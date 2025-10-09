<template>
  <v-app-bar :elevation="4" style="width: 100vw">
    <template v-slot:prepend>
      <img
        class="ml-4"
        src="../public/logo.png"
        alt="Logo"
        style="height: 40px; width: 40px"
      />
    </template>

    <v-app-bar-title>
      <NuxtLink to="/">
        <h4>Økobygg</h4>
      </NuxtLink>
    </v-app-bar-title>
    <div class="d-none d-md-flex align-center">
      <NuxtLink class="mr-4" to="/products">Produkter</NuxtLink>
      <NuxtLink to="/about">Om oss</NuxtLink>
      <v-divider vertical class="mx-4" />

      <v-badge
        class="mr-4"
        v-if="productStore.cartItems.length > 0"
        :content="productStore.cartItems.length"
        color="red"
        overlap
      >
        <v-icon @click="drawer = !drawer" size="large" class=""
          >mdi-cart-outline</v-icon
        >
      </v-badge>
      <v-icon v-else @click="drawer = !drawer" size="large" class="mr-4"
        >mdi-cart-outline</v-icon
      >
    </div>
    <div class="d-flex d-md-none">
      <v-menu
        offset-y
        transition="fade-transition"
        close-on-content-click
        max-height="400"
        min-width="200"
      >
        <template #activator="{ props }">
          <v-badge
            class="mr-4"
            v-if="productStore.cartItems.length > 0"
            :content="productStore.cartItems.length"
            color="red"
            overlap
          >
            <v-icon v-bind="props">mdi-menu</v-icon>
          </v-badge>
          <v-icon v-else v-bind="props" class="mr-4">mdi-menu</v-icon>
        </template>
        <template #default>
          <v-list style="overflow: auto">
            <NuxtLink to="/products">
              <v-list-item> Produkter </v-list-item>
            </NuxtLink>
            <NuxtLink to="/about">
              <v-list-item> Om oss </v-list-item>
            </NuxtLink>
            <NuxtLink to="/checkout">
              <v-list-item>
                <v-btn
                  color="primary"
                  class="mx-4"
                  :disabled="calculateTotal === 0"
                >
                  Gå til utsjekk
                </v-btn>
              </v-list-item>
            </NuxtLink>
          </v-list>
        </template>
      </v-menu>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary location="right" width="450">
    <div class="d-flex flex-column justify-space-between h-100">
      <div>
        <CartItem />
      </div>

      <div>
        <p class="text-center pa-4 pb-1 font-weight-bold">
          Total: {{ calculateTotal }} kr
        </p>
        <v-divider></v-divider>

        <div class="d-flex justify-center w-100 pa-4">
          <NuxtLink to="/checkout">
            <v-btn
              color="primary"
              class="mx-4"
              :disabled="calculateTotal === 0"
            >
              Gå til utsjekk
            </v-btn>
          </NuxtLink>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  const drawer = ref(false);
  const productStore = useProductsStore();
  const calculateTotal = computed(() =>
    productStore.cartItems.reduce((total, item) => total + item.price, 0)
  );

  watch(
    () => productStore.cartItems.length,
    (newLength) => {
      if (newLength === 0) {
        drawer.value = false;
      }
    }
  );
</script>
