<script setup lang="ts">
import RatingComponent from "@/components/Rating/RatingComponent.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import NeighborhoodPostListComponent from "../components/Post/NeighborhoodPostListComponent.vue";
import ReviewListComponent from "../components/Review/ReviewListComponent.vue";
import router from "../router";

const currentRoute = useRoute();
const areaTitle = currentRoute.params.area;
const viewPosts = ref(true);

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
    <button @click="newReview" class="button">New Review</button>
    <div>
      <button :class="{ underline: viewPosts }" @click="() => (viewPosts = true)" class="view-button">Posts</button>
      <button :class="{ underline: !viewPosts }" @click="() => (viewPosts = false)" class="view-button">Reviews</button>
    </div>
    <NeighborhoodPostListComponent v-show="viewPosts" :areaTitle="areaTitle" />
    <ReviewListComponent v-show="!viewPosts" :areaTitle="areaTitle" />
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

.view-button {
  background-color: transparent;
  border: none;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.color {
  background-color: #caddeb;
  height: 100vh;
}

.button {
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: rgb(222, 227, 210);
  width: 140px;
  border-radius: 20px;
}
</style>
