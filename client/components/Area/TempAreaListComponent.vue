<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { AreaDoc } from "../../../server/concepts/area";
import { fetchy } from "../../utils/fetchy";
import CreateAreaForm from "./CreateAreaForm.vue";
import TempAreaComponent from "./TempAreaComponent.vue";

let areas = ref<Array<AreaDoc>>([]);

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
  <div class="base">
    <CreateAreaForm @updateAreas="getAreas" />
    <TempAreaComponent v-for="area in areas" :key="area._id.toString()" :area="area" @updateAreas="getAreas" />
  </div>
</template>

<style scoped>
.base {
  margin-left: 16px;
  width: 400px;
}
</style>
