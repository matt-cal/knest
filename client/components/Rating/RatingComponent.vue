<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["areaTitle"]);
const loaded = ref(false);

let data: any[] = [];
let average: any;

async function getAverage() {
  try {
    data = await fetchy(`/api//areas/${props.areaTitle}/reviews`, "GET");

    if (data.length > 0) {
      average = { ...data[0].values };

      for (const name in data[0].values) {
        for (let i = 1; i < data.length; i++) {
          if (average.hasOwnProperty(name)) {
            average[name] = average[name] + data[i].values[name];
          }
        }
        average[name] = Math.round(average[name] / data.length);
      }
    }
  } catch (e) {
    return;
  }
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

onBeforeMount(async () => {
  await getAverage();
  loaded.value = true;
});
</script>
<template>
  <p v-if="loaded && data.length == 0">No one has rated this neighborhood... You can be the first!</p>
  <article v-for="(value, name) in average" :key="name">
    <p>{{ toTitleCase(String(name)) }}: {{ value }} / 100</p>
  </article>
</template>
