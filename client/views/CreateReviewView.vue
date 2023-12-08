<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import CreateReview from "../components/Review/CreateReview.vue";
import router from "../router";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const submitted = ref(false);

const submit = async () => {
  submitted.value = true;
};

async function back() {
  void router.push({ name: "Neighborhood", params: { area: areaTitle } });
}
</script>
<template>
  <div class="main">
    <div class="back-container">
      <button class="back" @click="back">Cancel</button>
    </div>
    <div v-if="!submitted" class="create">
      <h3>New Review</h3>
      <h1>{{ areaTitle }}</h1>
      <div class="form-container">
        <CreateReview @submitted="submit" :areaTitle="areaTitle" />
      </div>
    </div>
    <div v-if="submitted" class="loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>
<style scoped>
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 48px;
  margin: 0;
}

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
</style>
