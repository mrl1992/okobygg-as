<script setup lang="ts">
  import Footer from "~/components/Footer.vue";
  import Header from "~/components/Header.vue";
</script>

<template>
  <div class="bg-white text-black font-sans">
    <!-- style="max-width: 1200px; margin: 0 auto" -->
    <section class="min-h-screen pt-24">
      <Header />
      <v-main class="w-100 h-100"><slot /></v-main>
      <Footer />
    </section>
  </div>
</template>
