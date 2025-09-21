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

      <div
        v-if="productStore.cartItems.length > 0"
        style="
          position: relative;
          margin-left: 10px;
          margin-right: -40px;
          margin-bottom: -25px;
          margin-top: -60px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          background-color: red;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        "
      >
        <span color="white">
          {{ productStore.cartItems.length }}
        </span>
      </div>
      <v-icon @click="drawer = !drawer" size="large" class="mr-4"
        >mdi-cart-outline</v-icon
      >
    </div>
    <div class="d-flex d-md-none">
      <v-menu height="1200">
        <template #activator="{ props }">
          <v-icon v-bind="props" class="mr-4">mdi-menu</v-icon>
        </template>
        <template #default>
          <v-list>
            <v-list-item>
              <NuxtLink to="/">About</NuxtLink>
            </v-list-item>
            <v-list-item>
              <NuxtLink to="/products">Products</NuxtLink>
            </v-list-item>
            <v-list-item>
              <NuxtLink to="/cart">
                <v-btn>Gå til utsjekk</v-btn>
              </NuxtLink>
            </v-list-item>
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
