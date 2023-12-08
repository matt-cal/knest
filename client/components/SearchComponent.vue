<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../utils/fetchy";

let input = ref("");
const areas: Array<string> = [];
function filteredList() {
  return areas.filter((area) => area.toLowerCase().includes(input.value.toLowerCase()));
}

function isSearching() {
  return input.value.length > 0;
}

async function getAreas() {
  let areaDocs: Array<Record<string, string>> = [];
  try {
    areaDocs = await fetchy("/api/areas", "GET");
  } catch {
    return;
  }
  areaDocs.forEach((doc) => {
    areas.push(doc.title);
  });
}

onBeforeMount(async () => {
  await getAreas();
});
</script>

<template>
  <input type="text" v-model="input" placeholder="Search for an area..." />
  <div v-if="isSearching()">
    <div class="item area" v-for="area in filteredList()" :key="area">
      <RouterLink class="link" :to="{ name: 'Neighborhood', params: { area } }">
        <p>{{ area }}</p>
      </RouterLink>
    </div>
    <div class="item error" v-if="input && !filteredList().length">
      <p>No results found!</p>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../assets/images/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.area {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: white;
}

.error {
  background-color: tomato;
}
</style>
