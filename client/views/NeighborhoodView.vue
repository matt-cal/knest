<script setup lang="ts">
import RatingComponent from "@/components/Rating/RatingComponent.vue";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import NeighborhoodPostListComponent from "../components/Post/NeighborhoodPostListComponent.vue";
import router from "../router";

const currentRoute = useRoute();
const areaTitle = currentRoute.params.area;

async function newPost() {
  void router.push({ name: "CreatePost", params: { area: areaTitle } });
}

async function newReview() {
  void router.push({ name: "CreateReview", params: { area: areaTitle } });
}

onBeforeMount(async () => {});
</script>

<template>
  <main class="color">
  <h1>{{ currentRoute.params.area }}</h1>
  <section>
    <article>
      <RatingComponent :area-title="areaTitle" />
    </article>
  </section>
  <button @click="newPost" class="button">New Post</button>
  <button @click="newReview" class="button">New Rating</button>
  <NeighborhoodPostListComponent :areaTitle="areaTitle" />
</main>
</template>


<style scoped>
section {
  display: flex;
  flex-direction: column;
}

section,
p,
.row {
  margin: auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.underline {
  text-decoration: underline;
}

.color{
  background-color: #caddeb;
  height: 100vh;
}

.button {
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color:rgb(222, 227, 210);
  width: 140px;
  border-radius: 20px;
}
</style>
