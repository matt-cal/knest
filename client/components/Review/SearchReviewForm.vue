<script setup lang="ts">
import { ref } from "vue";

const area = ref("");
const emit = defineEmits(["getPostsByArea"]);
</script>

<template>
  <form @submit.prevent="emit('getPostsByArea', area)" class="pure-form">
    <fieldset>
      <legend>Search by Area</legend>
      <input id="area" type="text" v-model="area" placeholder="area is .." />
      <button type="submit" class="pure-button pure-button-primary">Search</button>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
