<script setup lang="ts">

const props = defineProps(["areaTitle"]);

const data = {ratings: [{name: 'cost', number: '0.7'}]};
</script>
<template>
  <article v-for="rating in data.ratings">
    <p>average {{ rating.name }}: {{ rating.number }}</p>
  </article>
</template>
