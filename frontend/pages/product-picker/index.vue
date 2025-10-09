<script setup lang="ts">
  import { ref, reactive, computed } from "vue";
  import { sanityService } from "~/services/sanity-service";

  // --- STATE ---
  const step = ref(1);
  const usage = ref<string | null>(null);
  const wallCount = ref<number>(1);
  const walls = reactive<{ length: number | null; width: number | null }[]>([
    { length: null, width: null },
  ]);
  const totalArea = computed(() =>
    elements.value.reduce((sum, e) => sum + e.width * e.height, 0)
  );
  const installation = ref<string | null>(null);
  const recommended = ref<any[]>([]);

  // --- OPTIONS ---
  const usageOptions = [
    { label: "Vegger", value: "Vegger" },
    { label: "Tak", value: "Tak" },
    { label: "Gulv", value: "Gulv" },
    { label: "Vindu", value: "Vindu" },
  ];
  const installationOptions = [
    { label: "Kun materiale", value: "material" },
    { label: "Materiale + montering", value: "material_and_install" },
  ];

  // --- FUNCTIONS ---
  const next = () => step.value++;
  const back = () => step.value--;
  const reset = () => {
    step.value = 1;
    usage.value = null;
    wallCount.value = 1;
    walls.splice(0, walls.length, { length: null, width: null });
    installation.value = null;
    recommended.value = [];
  };

  const updateWallCount = () => {
    if (wallCount.value > walls.length) {
      for (let i = walls.length; i < wallCount.value; i++) {
        walls.push({ length: null, width: null });
      }
    } else if (wallCount.value < walls.length) {
      walls.splice(wallCount.value);
    }
  };
  const elements = ref<{ height: number; width: number }[]>([
    { height: 0, width: 0 },
  ]);
  const elementCount = ref(1);

  function calculateInsulationNeed({
    type,
    items,
    coverage,
  }: {
    type: "Vegger" | "Vindu";
    items: { height: number; width: number }[];
    coverage: number; // coverage per product (m² or lm)
  }) {
    if (!coverage || coverage <= 0) return 0;

    let total = 0;

    if (type === "Vegger") {
      // Calculate total m²
      total = items.reduce((sum, i) => sum + i.height * i.width, 0);
    } else if (type === "Vindu") {
      // Calculate total linear meters
      total = items.reduce((sum, i) => sum + 2 * (i.height + i.width), 0);
    }

    // Round up to nearest product unit
    return Math.ceil(total / coverage);
  }

  async function fetchProducts() {
    const products = await sanityService.fetchProductsByUsage(usage.value);
    recommended.value = products.map((p: any) => {
      const neededUnits = calculateInsulationNeed({
        type: usage.value === "Vindu" ? "Vindu" : "Vegger",
        items: elements.value,
        coverage: p.coverage,
      });
      return { ...p, neededUnits };
    });
  }

  // ✅ total area (walls)

  // ✅ total perimeter (windows)
  const totalPerimeter = computed(() =>
    elements.value.reduce((sum, e) => sum + 2 * (e.width + e.height), 0)
  );
</script>

<template>
  <v-card class="mx-auto pa-6 rounded-xl elevation-3" max-width="600">
    <v-card-title class="text-h5 font-weight-bold mb-4">
      Produktvelger
    </v-card-title>
    {{ usage }}
    <!-- STEP 1: Bruksområde -->
    <v-slide-y-transition>
      <div v-if="step === 1">
        <div class="text-subtitle-1 mb-3">Hva skal isoleres?</div>
        <v-select
          v-model="usage"
          :items="usageOptions"
          item-title="label"
          item-value="value"
          label="Velg bruksområde"
          variant="outlined"
          density="comfortable"
        />
        <v-btn class="mt-4" color="primary" :disabled="!usage" @click="next">
          Neste
        </v-btn>
      </div>
    </v-slide-y-transition>

    <!-- STEP 2: Antall vegger -->
    <v-slide-y-transition>
      <div v-if="step === 2">
        <div class="text-subtitle-1 mb-3">Hvor mange flater skal isoleres?</div>
        <v-text-field
          v-model.number="wallCount"
          type="number"
          min="1"
          label="Antall"
          variant="outlined"
          density="comfortable"
          @update:model-value="updateWallCount"
        />

        <v-btn
          color="primary"
          class="mt-4"
          :disabled="wallCount < 1"
          @click="next"
        >
          Neste
        </v-btn>
      </div>
    </v-slide-y-transition>

    <!-- STEP 3: Lengde og bredde -->
    <v-slide-y-transition>
      <div v-if="step === 3">
        <div class="text-subtitle-1 mb-3">
          {{
            usage === "Vindu"
              ? "Oppgi mål for hvert vindu (meter)"
              : "Oppgi mål for hver flate (meter)"
          }}
        </div>

        <!-- Antall flater/vinduer -->
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model.number="elementCount"
              type="number"
              :label="usage === 'Vindu' ? 'Antall vinduer' : 'Antall vegger'"
              variant="outlined"
              density="comfortable"
              min="1"
              @update:model-value="
                elements = Array.from({ length: elementCount }, () => ({
                  width: 0,
                  height: 0,
                }))
              "
            />
          </v-col>
        </v-row>

        <!-- Input fields for each -->
        <v-row dense>
          <v-col v-for="(e, i) in elements" :key="i" cols="12">
            <v-card class="pa-3 mb-3" variant="outlined">
              <div class="text-body-1 mb-2">
                {{ usage === "Vindu" ? `Vindu ${i + 1}` : `Flate ${i + 1}` }}
              </div>

              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="e.width"
                    type="number"
                    :label="usage === 'Vindu' ? 'Bredde (m)' : 'Lengde (m)'"
                    variant="outlined"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="e.height"
                    type="number"
                    :label="usage === 'Vindu' ? 'Høyde (m)' : 'Høyde (m)'"
                    variant="outlined"
                    density="comfortable"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Calculated summary -->
        <div class="text-subtitle-2 mt-3">
          <template v-if="usage === 'Vindu'">
            <strong>Total omkrets:</strong> {{ totalPerimeter.toFixed(2) }} lm
          </template>
          <template v-else>
            <strong>Totalt areal:</strong> {{ totalArea.toFixed(2) }} m²
          </template>
        </div>

        <!-- Navigation buttons -->
        <div class="d-flex justify-space-between mt-4">
          <v-btn variant="text" @click="back">Tilbake</v-btn>
          <v-btn
            color="primary"
            :disabled="usage === 'Vindu' ? totalPerimeter <= 0 : totalArea <= 0"
            @click="next"
          >
            Neste
          </v-btn>
        </div>
      </div>
    </v-slide-y-transition>

    <!-- STEP 4: Monteringstype -->
    <v-slide-y-transition>
      <div v-if="step === 4">
        <div class="text-subtitle-1 mb-3">
          Ønsker du kun materiale eller også montering?
        </div>
        <v-select
          v-model="installation"
          :items="installationOptions"
          item-title="label"
          item-value="value"
          label="Velg type"
          variant="outlined"
          density="comfortable"
        />
        <div class="d-flex justify-space-between mt-4">
          <v-btn variant="text" @click="back">Tilbake</v-btn>
          <v-btn
            color="primary"
            :disabled="!installation"
            @click="
              async () => {
                await fetchProducts();
                next();
              }
            "
          >
            Vis anbefaling
          </v-btn>
        </div>
      </div>
    </v-slide-y-transition>

    <!-- STEP 5: Resultat -->
    <v-slide-y-transition>
      <div v-if="step === 5">
        <div class="text-subtitle-1 mb-4">Anbefalte produkter</div>

        <div v-if="recommended.length === 0" class="text-grey">
          Ingen produkter funnet for disse valgene.
        </div>

        <v-row dense>
          <v-col v-for="prod in recommended" :key="prod._id" cols="12">
            <v-card class="pa-3 mb-4" variant="outlined">
              <v-img
                :src="prod.image"
                height="140"
                class="rounded mb-2"
                cover
              />
              <div class="text-h6">{{ prod.title }}</div>
              <div class="text-body-2 mb-1">{{ prod.description }}</div>
              <div class="font-weight-medium">{{ prod.price }} kr / enhet</div>

              <div v-if="prod.neededUnits" class="mt-2">
                <strong>Du trenger ca. {{ prod.neededUnits }} stk</strong>
                (basert på
                {{
                  usage === "Vindu"
                    ? totalPerimeter.toFixed(2) + " lm"
                    : totalArea.toFixed(2) + " m²"
                }})
              </div>

              <!-- Installation cost and totals when installation includes montasje -->
              <div v-if="installation === 'material_and_install'" class="mt-3">
                <div>
                  <strong>Monteringskostnad:</strong>
                  {{
                    (usage === "Vindu"
                      ? totalPerimeter * 150
                      : totalArea * 300
                    ).toFixed(0)
                  }}
                  kr
                </div>

                <div class="mt-1">
                  <strong>Totalkostnad (material + montering):</strong>
                  {{
                    (
                      Number(prod.price) * Number(prod.neededUnits || 0) +
                      (usage === "Vindu"
                        ? totalPerimeter * 150
                        : totalArea * 300)
                    ).toFixed(0)
                  }}
                  kr
                </div>
              </div>

              <v-btn class="mt-3" color="primary" block>
                Legg i handlekurv
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-between mt-6">
          <v-btn variant="text" @click="back">Tilbake</v-btn>
          <v-btn color="secondary" @click="reset">Start på nytt</v-btn>
        </div>
      </div>
    </v-slide-y-transition>
  </v-card>
</template>

<style scoped>
  .v-card {
    transition: all 0.3s ease;
  }
</style>
