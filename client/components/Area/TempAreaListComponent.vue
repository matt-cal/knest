<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import CreateAreaForm from "./CreateAreaForm.vue";
import TempAreaComponent from "./TempAreaComponent.vue";

let areas = ref<Array<Record<string, string>>>([]);

async function getAreas() {
  try {
    areas.value = await fetchy("/api/areas", "GET");
  } catch {
    return;
  }
}

onBeforeMount(async () => {
  await getAreas();
});
</script>
<template>
  <div class="createArea">
    <CreateAreaForm @updateAreas="getAreas" />
  </div>
  <div class="base">
    <TempAreaComponent v-for="area in areas" :key="area._id.toString()" :area="area" @updateAreas="getAreas" />
  </div>
</template>

<style scoped>
.base {
  margin: auto;
  width: 700px;
  justify-self: center;
  justify-content: center;
}
.createArea {
  margin: auto;
  width: 900px;
  justify-content: center;
}
</style>
