<template>
  <v-footer
    class="text-center d-flex flex-column ga-2 py-4"
    color="grey-darken-4"
  >
    <!-- <div>E-post: post@økobygg.no</div>
    <div>Telefon: 123 45 678</div>

    <div class="mt-4 w-50">
      <h3 class="sr-only">Location</h3>
      <div class="w-full h-64 rounded overflow-hidden shadow-sm">
        <iframe
          title="Økobygg location"
          class="w-full h-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=59.4826531,11.6850471&z=18&output=embed"
        ></iframe>
      </div>
      <p class="text-sm mt-2">
        <a
          href="https://www.google.com/maps/@59.4826531,11.6850471,205m/data=!3m1!1e3?entry=ttu"
          target="_blank"
          rel="noopener"
          >Open in Google Maps</a
        >
      </p>
    </div> -->

    <div class="d-flex align-center justify-center ga-4">
      <v-col>
        <div class="d-flex mt-3">
          <v-icon class="mr-2">mdi-email-outline</v-icon>
          <span>post@økobygg.no</span>
        </div>
        <div class="d-flex mt-3">
          <v-icon class="mr-2">mdi-phone-outline</v-icon>
          <span>123 45 678</span>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex mt-3 gap-2">
          <v-icon class="mr-2">mdi-facebook</v-icon>

          <a
            href="https://www.facebook.com/okobygg"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            class="mr-3"
            title="Facebook"
          >
            Facebook
          </a>
        </div>
        <div class="d-flex mt-3 gap-2">
          <v-icon class="mr-2">mdi-instagram</v-icon>

          <a
            href="https://www.instagram.com/okobygg.no"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            class="mr-3"
            title="Instagram"
          >
            Instagram
          </a>
        </div>
      </v-col>
      <v-col class="d-none d-md-flex w-100">
        <div class="w-100 rounded-xl">
          <iframe
            class="rounded"
            title="Økobygg location"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=59.4828023,11.6856583&z=18&output=embed"
          ></iframe>
        </div>
      </v-col>
    </div>
    <div class="d-flex d-md-none">
      <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
      <span>Slettafeltet 22, 1870 Ørje, Norge</span>
    </div>
    <v-divider class="my-2" thickness="2" width="650"></v-divider>
    <div>© 2024 ØkoBygg AS. Alle rettigheter reservert</div>
  </v-footer>
</template>
