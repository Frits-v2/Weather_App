<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Het Locale Weer</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query"
        ></i>
      </div>

      <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
      <div class="text-black">
  <h1 class="text-2xl mb-1">Over:</h1>
  <p class="mb-4">
      De Lokale Weer-app stelt je in staat om het huidige en
      toekomstige weer van steden naar keuze te volgen.
  </p>
  <h2 class="text-2xl">Hoe het werkt:</h2>
  <ol class="list-decimal list-inside mb-4">
      <li>
          Zoek naar jouw stad door de naam in te voeren in de
          zoekbalk.
      </li>
      <li>
          Selecteer een stad binnen de resultaten, dit brengt
          je naar het huidige weer voor jouw selectie.
      </li>
      <li>
          Volg de stad door te klikken op het "+"-pictogram in de
          rechterbovenhoek. Hiermee wordt de stad opgeslagen om later
          op de startpagina te bekijken.
      </li>
  </ol>

  <h2 class="text-2xl">Een stad verwijderen</h2>
  <p>
      Als je niet langer een stad wilt volgen, selecteer dan
      de stad op de startpagina. Onderaan de pagina is er een optie
      om de stad te verwijderen.
  </p>
</div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>