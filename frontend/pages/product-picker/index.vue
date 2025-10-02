<template>
  <v-container>
    <div>
      <h1>Produktvelger</h1>
      <v-select
        v-model="selectedArea"
        :items="areasOfApplication"
        item-text="title"
        item-value="value"
        label="Velg bruksområde"
      />
      <v-select
        v-if="selectedArea === 'walls' || selectedArea === 'roof'"
        :items="[50, 100]"
        label="Ønsket isolasjonstykkelse(mm)"
        v-model="selectedThickness"
        :rules="[validationRules.notEmpty]"
      ></v-select>
      <div v-if="selectedArea === 'walls'">
        <v-text-field
          label="Hvor mange vegger skal isoleres?"
          v-model="numberOfWalls"
          type="number"
          :rules="[validationRules.notEmpty]"
        />
        <v-card
          v-for="(wall, i) in numberOfWallsList"
          :key="i"
          style="
            border-left: 10px solid rgba(var(--v-theme-primary));
            padding: 1rem;
            margin-top: 1rem;
          "
          class="rounded"
        >
          <p>Vegg {{ i + 1 }}</p>
          <v-text-field
            v-model="wall.height"
            label="Høyde (cm)"
            type="number"
            :rules="[validationRules.notEmpty]"
          ></v-text-field>
          <v-text-field
            v-model="wall.length"
            label="Lengde (cm)"
            type="number"
            :rules="[validationRules.notEmpty]"
          ></v-text-field>
        </v-card>
      </div>

      <v-checkbox
        v-if="selectedArea === 'walls'"
        :label="'Skal vinduene på veggen isoleres?'"
        v-model="includeWindows"
      />
      <div>
        <v-text-field
          :label="'Hvor mange vinduer skal isoleres?'"
          v-model="numberOfWindows"
          v-if="selectedArea === 'window' || includeWindows === true"
          :rules="[validationRules.notEmpty]"
        />
        <v-card
          v-for="(window, i) in numberOfWindowsList"
          style="
            border-left: 10px solid rgba(var(--v-theme-primary));
            padding: 1rem;
            margin-top: 1rem;
          "
          class="rounded"
        >
          <p>Vindu {{ i + 1 }}</p>
          <v-text-field
            v-model="window.height"
            label="Høyde (cm)"
            type="number"
            :rules="[validationRules.notEmpty]"
          ></v-text-field>
          <v-text-field
            v-model="window.width"
            label="Bredde (cm)"
            type="number"
            :rules="[validationRules.notEmpty]"
          ></v-text-field>
        </v-card>
      </div>
      <v-text-field
        v-if="selectedArea !== 'walls' && selectedArea !== 'window'"
        label="Areal (m²)"
        type="number"
        class="mt-4"
        v-model="areaSize"
        :rules="[validationRules.notEmpty]"
      />

      <v-card class="assembly-card">
        <div class="pa-4 pb-0">
          Beregnet pris for montering:
          <strong>{{ totalInstallationPrice.toFixed(2) }} NOK</strong>
          <p style="font-style: italic; font-size: 0.9em">
            Vi tar forbehold om at pris kan variere basert på faktiske mål og
            forhold.
          </p>
          <v-checkbox :label="'Ønsker du montering?'" />
        </div>
      </v-card>
    </div>
    <v-card
      class="mt-4 w-25"
      style="position: sticky; top: 16px; max-height: 600px; overflow: auto"
    >
      <v-card-text>
        <v-list>
          <v-list-item-title>Samlet Areal</v-list-item-title>
          <v-list-item v-if="wallArea > 0">
            <v-list-item-content class="d-flex align-center">
              <v-list-item-title class="mr-2">Vegger:</v-list-item-title>
              <v-list-item-subtitle>{{ wallArea + "m²" }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="windowArea > 0">
            <v-list-item-content class="d-flex align-center">
              <v-list-item-title class="mr-2">Vinduer:</v-list-item-title>
              <v-list-item-subtitle>{{
                windowArea + "m²"
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <div v-for="product in suggestedProducts">
      <div v-if="product.meassurement != null">
        <div v-if="selectedArea === 'walls'">
          Til disse veggene anbefaler vi at du kjøper:
          <p>{{ product.title }}</p>
          antall pakker: {{ Math.ceil(wallArea / product.meassurement) }}
        </div>
        <div v-else-if="selectedArea === 'roof'">
          Til dette taket anbefaler vi at du kjøper:
          <p>{{ product.title }}</p>
          antall pakker: {{ Math.ceil(areaSize / product.meassurement) }}
          <v-btn
            @click="add(product, Math.ceil(areaSize / product.meassurement))"
            >Legg til handlekurv</v-btn
          >
        </div>
      </div>
    </div>
    <v-btn @click="fetchSuggestedProducts">fetch suggested products</v-btn>
  </v-container>
</template>

<script setup lang="ts">
  import type { Product } from "~/models/product.interface";
  import { sanityService } from "~/services/sanity-service";

  const areasOfApplication = await sanityService.getPlacements();

  const selectedArea = ref<string | null>("walls");

  const wallHeight = ref<number | null>(null);
  const wallLength = ref<number | null>(null);
  const areaSize = ref(0);

  const installationPricePerM2 = 300; // NOK
  const totalInstallationPrice = computed(() => {
    return (wallArea.value + windowArea.value) * installationPricePerM2;
  });

  const numberOfWalls = ref<number | string | null>(null);
  const numberOfWallsList: Ref<
    { text: string | null; height: number | null; length: number | null }[]
  > = ref([]);

  watch(
    () => numberOfWalls.value,
    (newVal) => {
      const n = Number(newVal);
      if (Number.isInteger(n) && n > 0) {
        numberOfWallsList.value = Array.from({ length: n }, () => ({
          text: null,
          height: null,
          length: null,
        }));
      } else {
        numberOfWallsList.value = [];
      }
    }
  );

  const numberOfWindows = ref<number | string | null>(null);

  const numberOfWindowsList: Ref<
    {
      text: string | null;
      height: number | null;
      width: number | null;
      area: number | null;
    }[]
  > = ref([]);

  watch(
    () => numberOfWindows.value,
    (newVal) => {
      const n = Number(newVal);
      if (Number.isInteger(n) && n > 0) {
        numberOfWindowsList.value = Array.from({ length: n }, () => ({
          text: null,
          height: null,
          width: null,
          area: null,
        }));
      } else {
        numberOfWindowsList.value = [];
      }
    }
  );

  const includeWindows = ref(false);

  const updateWindowAreas = () => {
    for (const window of numberOfWindowsList.value) {
      if (
        window.height !== null &&
        window.width !== null &&
        window.height > 0 &&
        window.width > 0
      ) {
        window.area = (window.height / 100) * (window.width / 100);
      } else {
        window.area = null;
      }
    }
    console.log("🚀 ~ window areas:", numberOfWindowsList.value);
  };

  watch(
    () => numberOfWindowsList.value.map((w) => [w.height, w.width]),
    updateWindowAreas,
    { deep: true }
  );

  const wallArea = computed(() => {
    return (
      numberOfWallsList.value.reduce(
        (acc, wall) =>
          acc + (Number(wall.height) || 0) * (Number(wall.length) || 0),
        0
      ) / 10000
    );
  });
  const windowArea = computed(() => {
    return numberOfWindowsList.value.reduce(
      (acc, window) => acc + (window.area ?? 0),
      0
    );
  });

  const selectedThickness = ref<number | null>(null);

  const suggestedProducts = ref(new Array<Product>());
  async function fetchSuggestedProducts() {
    console.log(selectedThickness);

    suggestedProducts.value = await sanityService.getProductsByPlacement(
      selectedArea.value || "",
      selectedThickness.value || 50
    );
    console.log("🚀 ~ res:", suggestedProducts.value);
  }

  function add(product: Product, quantity = 1) {
    useProductsStore().addToCart(product, quantity);
  }
</script>

<style scoped></style>
