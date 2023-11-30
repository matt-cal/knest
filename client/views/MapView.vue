<script setup lang="ts">
import { ref } from 'vue';

interface location {
  lng: number;
  lat: number;
}

const loc = ref<location>({lat: 42.361145, lng: -71.057083});

function setPlace(data: any) {
  loc.value.lat = data.geometry.location.lat();
  loc.value.lng = data.geometry.location.lng();
}

</script>

<template>
  <main>
    <GMapAutocomplete
      placeholder="Pick a Location"
      @place_changed="setPlace"
      >
    </GMapAutocomplete>
    <GMapMap
        :center="loc"
        :zoom="13"
        style="left: 5vw; width: 90vw; height: 70vh;"
    />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
