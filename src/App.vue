<template>
  <div 
    class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation />
    <RouterView v-slot="{Component}">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<style>
  .page-enter-active,
  .page-leave-active{
    transition: 600ms ease all;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }


  /* This will target WebKit browsers (Chrome, Safari) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background-color: #025c7c;
  border-radius: 6px;
  border: 3px solid #004E71;
}

::-webkit-scrollbar-track {
  border-radius: 6px;

  background-color:#004E71;
}

/* This will target Firefox */
/* Note: Firefox does not support styling the track */
/* You can use a wrapper div with a background color as an alternative for Firefox */
/* Or provide styles for scrollbar-color, but it's not as versatile */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color */
html {
  scrollbar-color:#00668A #004E71;
  scrollbar-width: thin;
}
</style>