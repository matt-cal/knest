<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import CreatePostForm from "../components/Post/CreatePostForm.vue";
import router from "../router";
import { fetchy } from "../utils/fetchy";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const submitted = ref(false);
const parentAreaTitle = ref("");

const submit = async () => {
  submitted.value = true;
};

async function back() {
  void router.push({ name: "Neighborhood", params: { area: areaTitle } });
}

onBeforeMount(async () => {
  // Typescript complaining about type of currentRoute.params.area
  if (Array.isArray(areaTitle)) {
    areaTitle = areaTitle[0];
  }
  const a = (await fetchy("/api/areas", "GET", { query: { title: areaTitle } }))[0];
  const parent = (await fetchy("/api/areas", "GET", { query: { _id: a.parentArea } }))[0];
  parentAreaTitle.value = parent.title;
});
</script>
<template>
  <div class="main">
    <div class="back-container">
      <button class="back" @click="back">Cancel</button>
    </div>
    <div v-if="!submitted" class="create">
      <h3>New Post</h3>
      <h1>{{ parentAreaTitle }}</h1>
      <div class="form-container">
        <CreatePostForm @submitted="submit" :areaTitle="areaTitle" />
      </div>
    </div>
    <div v-if="submitted" class="loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>
<style scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #caddeb;
}

.back-container {
  width: 100%;
  display: flex;
}

.back {
  margin: 8px;
  width: 75px;
  height: 28px;
  background-color: rgb(53, 55, 89);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 1000px;
}

h1 {
  font-size: 48px;
  margin-bottom: 0;
}
</style>
