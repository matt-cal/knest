<script setup lang="ts">
import router from "../../router";

const props = defineProps(["paths", "areaTitle"]);

async function handleClick() {
  void router.push({ name: "Neighborhood", params: { area: props.areaTitle } });
}
</script>
<template>
  <GMapPolygon :paths="props.paths" @click="handleClick" />
</template>
