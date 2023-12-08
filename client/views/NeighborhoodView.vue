<script setup lang="ts">
import RatingComponent from "@/components/Rating/RatingComponent.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import NeighborhoodPostListComponent from "../components/Post/NeighborhoodPostListComponent.vue";
import ReviewListComponent from "../components/Review/ReviewListComponent.vue";
import router from "../router";
import { fetchy } from "../utils/fetchy";

const currentRoute = useRoute();
let areaTitle = currentRoute.params.area;
const viewPosts = ref(true);
const parentAreaTitle = ref("");

async function newPost() {
  void router.push({ name: "CreatePost", params: { area: areaTitle } });
}

async function newReview() {
  void router.push({ name: "CreateReview", params: { area: areaTitle } });
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
  <main class="main color">
    <h1>{{ currentRoute.params.area }}</h1>
    <section>
      <article>
        <RatingComponent :area-title="areaTitle" />
      </article>
    </section>
    <div class="buttons-row">
      <div class="content-buttons">
        <button :class="{ underline: viewPosts }" @click="() => (viewPosts = true)" class="view-button">Posts</button>
        <button :class="{ underline: !viewPosts }" @click="() => (viewPosts = false)" class="view-button">Reviews</button>
      </div>
      <div class="content-buttons">
        <button @click="newPost" class="button new">New Post</button>
        <button @click="newReview" class="button new">New Review</button>
      </div>
    </div>
    <div class="content color">
      <NeighborhoodPostListComponent v-show="viewPosts" :areaTitle="areaTitle" />
      <ReviewListComponent v-show="!viewPosts" :areaTitle="areaTitle" />
    </div>
  </main>
</template>

<style scoped>
.buttons-row {
  display: flex;
  justify-content: space-between;
}

.content-buttons {
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-bottom: 32px;
}

.new {
  margin: 8px;
  width: 120px;
  height: 28px;
  background-color: rgb(53, 55, 89);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

article,
.buttons-row,
.content {
  width: 900px;
}

section {
  display: flex;
  flex-direction: column;
}

h1 {
  margin-top: 0;
  padding-top: 16px;
}

button {
  cursor: pointer;
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

.view-button {
  background-color: transparent;
  border: none;
  font-size: 20px;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.color {
  background-color: #caddeb;
}
</style>
