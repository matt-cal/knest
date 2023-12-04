<script setup lang="ts">
import { useRoute } from "vue-router";

const currentRoute = useRoute();
</script>

<template>
  <h1>{{ currentRoute.params.area }}</h1>
</template>
