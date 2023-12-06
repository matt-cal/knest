<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import CreatePostForm from "../components/Post/CreatePostForm.vue";
import { fetchy } from "../utils/fetchy";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const submitted = ref(false);
const parentAreaTitle = ref("");

const submit = async () => {
  submitted.value = true;
};

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
  <div v-if="!submitted" class="create">
    <h1>{{ parentAreaTitle }}</h1>
    <h3>New Post</h3>
    <div class="form-container">
      <CreatePostForm @submitted="submit" :areaTitle="areaTitle" />
    </div>
  </div>
  <div v-if="submitted" class="loading">
    <h1>Loading...</h1>
  </div>
</template>
