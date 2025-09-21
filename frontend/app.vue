<template>
  <NuxtLoadingIndicator />
  <v-app>
    <NuxtLayout>
      <v-main class="v-main-container">
        <NuxtPage />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>
<style>
  /* Make the main area flexible and mobile-friendly */
  .v-main-container {
    min-height: 100dvh;
    width: 100vw; /* use viewport width to avoid %+padding overflow */
    max-width: 100vw; /* prevent children from expanding past viewport */
    overflow-x: hidden; /* hide any horizontal overflow */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    background-color: rgba(var(--v-theme-background));
    box-sizing: border-box;

    /* Safe-area insets for devices with notches */
    padding-top: env(safe-area-inset-top);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
  }

  /* Fallback for browsers that don't support 100dvh */
  @supports not (height: 100dvh) {
    .v-main-container {
      min-height: 100vh;
    }
  }

  /* Ensure the app root doesn't cause unwanted scrollbars */
  html,
  body,
  #__nuxt,
  #app {
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100%;
    overflow-x: hidden; /* prevent page-level horizontal scroll */
  }
</style>
