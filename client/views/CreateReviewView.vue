<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import CreateReview from "../components/Review/CreateReview.vue";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const submitted = ref(false);

const submit = async () => {
  submitted.value = true;
};
</script>
<template>
  <div v-if="!submitted" class="create">
    <h1>{{ areaTitle }}</h1>
    <h3>New Review</h3>
    <div class="form-container">
      <CreateReview @submitted="submit" :areaTitle="areaTitle" />
    </div>
  </div>
  <div v-if="submitted" class="loading">
    <h1>Loading...</h1>
  </div>
</template>
