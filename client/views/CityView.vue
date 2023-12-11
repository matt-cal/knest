<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import ReviewListComponent from "../components/Review/ReviewListComponent.vue";
import router from "../router";
import { fetchy } from "../utils/fetchy";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const loaded = ref(false);

let data: any[] = [];
let average: any;

async function getAverage() {
  try {
    data = await fetchy(`/api/areas/${areaTitle}/subareaReviews`, "GET");

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
  <main class="main">
    <div class="back-container">
      <button class="back" @click="() => router.go(-1)">Back</button>
    </div>
    <h1>{{ areaTitle }}</h1>
    <p v-if="loaded && data.length == 0">No one has rated this neighborhood... You can be the first!</p>
    <article v-else>
      <h1 v-if="!loaded">Loading...</h1>
      <div v-for="(value, name) in average" :key="name">
        <p>{{ toTitleCase(String(name)) }}: {{ value }} / 100</p>
      </div>
    </article>
    <div class="reviews">
      <div class="row">
        <h2>Recent Reviews</h2>
      </div>
      <ReviewListComponent :areaTitle="areaTitle" :isCity="true" />
    </div>
  </main>
</template>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-bottom: 32px;
}

.reviews {
  width: 900px;
}

.row {
  width: 900px;
  display: flex;
}

article {
  width: 900px;
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.back-container {
  width: 100%;
  display: flex;
}

.back {
  margin: 10px;
  width: 75px;
  height: 28px;
  background-color: rgb(53, 55, 89);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

h1 {
  margin-top: 0;
  padding-top: 16px;
}
</style>
