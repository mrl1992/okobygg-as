<template>
  <v-container class="d-flex">
    <v-card class="w-66 mr-6">
      <v-card-title class="d-flex align-center">
        <v-icon>mdi-account-outline</v-icon>
        Personlig informasjon
      </v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-text-field label="Fornavn"></v-text-field>
          <v-text-field class="ml-4" label="Etternavn"></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field label="E-post"></v-text-field>
          <v-text-field class="ml-4" label="Telefon"></v-text-field>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="w-33">
      <v-card-title class="d-flex align-center">
        Bestillingsoversikt
      </v-card-title>
      <v-card-text>
        <CartItem />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import CartItem from "~/components/CartItem.vue";

  const productStore = useProductsStore();
</script>

<style scoped></style>
