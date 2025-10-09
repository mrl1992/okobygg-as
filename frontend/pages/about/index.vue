<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h4 font-weight-bold text-center"
        >Om Oss</v-card-title
      >
      <v-card-text class="w-50 text-center mx-auto text-subtitle-1">
        Vi er Norges ledende leverandør av isolasjonsløsninger med fokus på
        kvalitet, miljø og kundetilfredshet. Siden 2003 har vi hjulpet tusenvis
        av kunder med deres isolasjonsbehov.
      </v-card-text>
    </v-card>

    <v-card class="d-flex pa-6 h-50 mt-12">
      <div class="mr-8 mt-8 w-50">
        <p class="text-h5">Vår Historie</p>
        <p class="text-subtitle-1 mt-4">
          ØkoBygg AS ble grunnlagt i 2003 med en visjon om å levere de beste
          isolasjonsløsningene til norsk byggebransje. Fra beskjedne begynnelser
          har vi vokst til å bli en av landets mest respekterte leverandører.
        </p>
        <p class="text-subtitle-1 mt-2 mb-2">
          Gjennom årene har vi kontinuerlig investert i ny teknologi og
          kompetanse, og i dag kan vi tilby et komplett sortiment av
          isolasjonsløsninger for alle typer prosjekter.
        </p>
        <p class="text-subtitle-1">
          Vår suksess bygger på sterke kundeforhold, høy kvalitet og en
          kompromissløs holdning til service og leveringspresisjon.
        </p>
      </div>
      <div class="w-50 h-50">
        <v-img src="../../public//slide-1.png" cover class="rounded-lg" />
      </div>
    </v-card>

    <v-card class="mt-12">
      <v-card-title class="text-h4 font-weight-bold text-center"
        >Våre verdier</v-card-title
      >
      <v-card-text>
        <v-row justify="center" align="stretch" class="py-4">
          <v-col cols="12" sm="6" md="4" class="d-flex">
            <div
              class="d-flex flex-column align-center justify-center mx-auto py-4"
            >
              <v-avatar size="64" class="d-sm-none mb-3" color="primary">
                <v-icon color="primary-dark" size="30"
                  >mdi-shield-outline</v-icon
                >
              </v-avatar>
              <v-avatar
                size="100"
                class="d-none d-sm-flex mb-3"
                color="primary"
              >
                <v-icon size="36" color="primary-dark"
                  >mdi-shield-outline</v-icon
                >
              </v-avatar>

              <p class="text-h6 font-weight-bold mb-2">Kvalitet</p>
              <p class="body-2 text-center mx-auto" style="max-width: 280px">
                Vi leverer kun produkter av høyeste kvalitet som oppfyller alle
                relevante standarder og krav.
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="d-flex">
            <div
              class="d-flex flex-column align-center justify-center mx-auto py-4"
            >
              <v-avatar size="64" class="d-sm-none mb-3" color="primary">
                <v-icon color="primary-dark" size="30">mdi-leaf</v-icon>
              </v-avatar>
              <v-avatar
                size="100"
                class="d-none d-sm-flex mb-3"
                color="primary"
              >
                <v-icon size="36" color="primary-dark">mdi-leaf</v-icon>
              </v-avatar>

              <p class="text-h6 font-weight-bold mb-2">Miljø</p>
              <p class="body-2 text-center mx-auto" style="max-width: 280px">
                Miljøvennlige løsninger er en hjørnestein i vår virksomhet. Vi
                prioriterer bærekraftige produkter og prosesser.
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="d-flex">
            <div
              class="d-flex flex-column align-center justify-center mx-auto py-4"
            >
              <v-avatar size="64" class="d-sm-none mb-3" color="primary">
                <v-icon size="30" color="primary-dark"
                  >mdi-account-multiple-outline</v-icon
                >
              </v-avatar>
              <v-avatar
                size="100"
                class="d-none d-sm-flex mb-3"
                color="primary"
              >
                <v-icon size="36" color="primary-dark"
                  >mdi-account-multiple-outline</v-icon
                >
              </v-avatar>

              <p class="text-h6 font-weight-bold mb-2">Service</p>
              <p class="body-2 text-center mx-auto" style="max-width: 280px">
                Våre kunder står i sentrum. Vi tilbyr personlig service og
                skreddersydde løsninger for hvert prosjekt.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="mt-12">
      <v-row dense>
        <!-- Employees column: stacks on mobile, sits left on md+ -->
        <v-col cols="12" class="d-flex justify-center">
          <v-row class="my-4" justify="center" align="center" dense>
            <v-col
              v-for="employee in employees"
              :key="employee._id"
              cols="12"
              sm="6"
              md="4"
              class="d-flex flex-column align-center"
            >
              <v-avatar size="96" class="mb-3">
                <v-img :src="employee.imageUrl" />
              </v-avatar>

              <div class="text-center">
                <p class="text-subtitle-1 font-weight-medium mb-1">
                  {{ employee.name }}
                </p>
                <p class="caption mb-1">{{ employee.title }}</p>
                <a
                  :href="`mailto:${employee.email}`"
                  class="caption"
                  style="color: inherit"
                >
                  {{ employee.email }}
                </a>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <!-- Content column: stacks under employees on mobile, right side on md+
        <v-col cols="12" md="8" class="pa-4">
          <v-card class="pa-6" outlined>
            <p class="body-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Aspernatur ad atque vero itaque at et? Magni qui, a assumenda
              repellat reiciendis quod, accusamus maiores sed exercitationem
              dignissimos ratione! Quisquam, vel corporis atque odit explicabo
              quasi laudantium vitae alias voluptate aliquam blanditiis
              doloremque culpa quas libero voluptatem pariatur esse iure modi.
              Velit hic, ut odit iure ullam eaque est animi id sapiente totam
              sed aliquam? Expedita, nesciunt tenetur tempore adipisci
              perferendis, fuga alias totam non modi soluta nulla sequi suscipit
              debitis perspiciatis, blanditiis praesentium. Repellendus quasi
              tempora sunt. Quaerat, odit quae. Nobis quaerat officia modi
              veritatis, officiis pariatur autem recusandae id, delectus atque
              repellendus sapiente facere ducimus voluptates sunt suscipit esse
              aperiam labore ex, odio maiores laudantium. Minima obcaecati minus
              illo, illum veritatis similique exercitationem nostrum
            </p>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import type { Employee } from "~/models/employee.interface";
  import { sanityService } from "../../services/sanity-service";

  const employees = ref<Employee[]>([]);
  const fetchEmployees = async () => {
    try {
      const employeesData = await sanityService.getEmployees();
      console.log("🚀 ~ employees:", employeesData);
      employees.value = employeesData;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  };

  onMounted(async () => {
    await fetchEmployees();
  });
</script>

<style scoped></style>
