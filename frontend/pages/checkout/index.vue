<template>
  <v-container class="d-flex">
    <v-card class="w-50 mr-6">
      <v-card-title class="d-flex align-center my-6">
        <v-icon color="primary" class="mr-2">mdi-account-outline</v-icon>
        Personlig informasjon
      </v-card-title>
      <v-card-text>
        <v-text-field label="Fornavn"></v-text-field>
        <v-text-field label="Etternavn"></v-text-field>
        <v-text-field label="E-post"></v-text-field>
        <v-text-field label="Telefon"></v-text-field>
        <v-textarea :label="'Kommentar til bestilling'"></v-textarea>
      </v-card-text>
    </v-card>
    <v-card class="w-66">
      <v-card-title class="d-flex align-center my-6">
        <v-icon class="mr-2" color="primary">mdi-cart-outline</v-icon>
        Bestillingsoversikt
      </v-card-title>
      <v-card-text>
        <CartItem :checkout="true" />
        <v-divider></v-divider>
        <div>
          <div class="d-flex justify-space-between pa-4">
            <span> Subtotal: </span>
            <span> {{ 56569 }} kr </span>
          </div>
          <div class="d-flex justify-space-between pa-4">
            <span> Mva (25%): </span>
            <span> {{ 56569 * 0.25 }} kr </span>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between pa-4 text-h6">
          <span> Total: </span>
          <span> {{ 56569 }} kr </span>
        </div>
        <v-btn @click="send" color="primary w-100 mt-5">Send bestilling</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import CartItem from "~/components/CartItem.vue";

  const productStore = useProductsStore();

  const send = async () => {
    console.log("🚀 ~ productStore.cartItems:", productStore.cartItems);
    const unique = [...new Set(productStore.cartItems.map((item) => item._id))];
    console.log(
      "🚀 ~ unique:",
      unique.filter((id) => unique.includes(id))
    );

    await $fetch("/api/order", {
      method: "POST",
      body: {
        customer: {
          name: "Ola Nordmann",
          email: "ola@example.com",
          phone: "12345678",
        },
        cart: productStore.cartItems.map((item: any) => ({
          title: item.title ?? item.name ?? "",
          quantity: item.quantity ?? item.qty ?? 1,
          thickness: item.thickness ?? item.spec?.thickness,
          unit: item.unit ?? item.uom ?? "stk",
        })),
      },
    });
  };
</script>

<style scoped></style>
