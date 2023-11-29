<script setup lang="ts">
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <GMapMap
        :center="{lat: 42.361145, lng: -71.057083}"
        :zoom="13"
        map-type-id="terrain"
        style="left: 5vw; width: 90vw; height: 70vh;"
    />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
