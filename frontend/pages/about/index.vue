<template>
  <v-container>
    <v-btn @click="send">send</v-btn>
    <v-card color="primary-light mt-12">
      <v-card-title class="text-h4 font-weight-bold text-center"
        >Om Oss</v-card-title
      >
      <v-card-text class="w-50 text-center mx-auto text-subtitle-1">
        Vi er Norges ledende leverandør av isolasjonsløsninger med fokus på
        kvalitet, miljø og kundetilfredshet. Siden 2003 har vi hjulpet tusenvis
        av kunder med deres isolasjonsbehov.
      </v-card-text>
    </v-card>

    <div class="d-flex pa-6 h-50">
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
    </div>

    <v-card class="mt-12">
      <v-card-title class="text-h4 font-weight-bold text-center"
        >Våre verdier</v-card-title
      >
      <v-card-text class="d-flex justify-center">
        <div class="d-flex flex-column align-center justify-center">
          <v-avatar size="100" color="primary-light" class="ma-4">
            <v-icon size="30" color="primary">mdi-shield-outline </v-icon>
          </v-avatar>
          <p style="font-weight: bold; font-size: 1.25rem">Kvalitet</p>
          <p class="text-center body-2 w-75">
            Vi leverer kun produkter av høyeste kvalitet som oppfyller alle
            relevante standarder og krav.
          </p>
        </div>
        <div class="d-flex flex-column align-center justify-center">
          <v-avatar size="100" color="primary-light" class="ma-4">
            <v-icon color="primary" size="30"> mdi-leaf </v-icon>
          </v-avatar>
          <p style="font-weight: bold; font-size: 1.25rem">Miljø</p>
          <p class="text-center body-2 w-75">
            Miljøvennlige løsninger er en hjørnestein i vår virksomhet. Vi
            prioriterer bærekraftige produkter og prosesser.
          </p>
        </div>
        <div class="d-flex flex-column align-center justify-center">
          <v-avatar size="100" color="primary-light" class="ma-4">
            <v-icon size="30" color="primary">
              mdi-account-multiple-outline
            </v-icon>
          </v-avatar>
          <p style="font-weight: bold; font-size: 1.25rem">Service</p>
          <p class="text-center body-2 w-75">
            Våre kunder står i sentrum. Vi tilbyr personlig service og
            skreddersydde løsninger for hvert prosjekt.
          </p>
        </div>
      </v-card-text>
    </v-card>

    <div class="mt-12 d-flex">
      <div>
        <v-col v-for="employee in employees" :key="employee._id">
          <div class="d-flex">
            <v-avatar size="100">
              <v-img :src="employee.imageUrl" />
            </v-avatar>
            <div class="ml-6">
              <p class="text-h6 font-weight-bold">{{ employee.name }}</p>
              <p class="body-2">{{ employee.title }}</p>
              <p class="body-2">{{ employee.email }}</p>
            </div>
          </div>
        </v-col>
      </div>
      <div>
        <p>Vår erfaring</p>
      </div>
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

  const send = async () => {
    await $fetch("/api/order", {
      method: "POST",
      body: {
        customer: {
          name: "Ola Nordmann",
          email: "ola@example.com",
          phone: "12345678",
        },
        cart: [
          { title: "Isolasjonsrull", quantity: 3, thickness: 50, unit: "m2" },
        ],
      },
    });
  };
</script>

<style scoped></style>
