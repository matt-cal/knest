<script setup lang="ts">
import ReviewComponent from "@/components/Review/ReviewComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let reviews = ref<Array<Record<string, string>>>([]);
const reveal = ref(true);

async function getReviews() {
  let reviewResults;
  try {
    reviewResults = await fetchy(`/api/userReviews`, "GET");
  } catch (_) {
    return;
  }
  reviews.value = reviewResults;
}

onBeforeMount(async () => {
  await getReviews();
  loaded.value = true;
});
</script>

<template>
  <h2>Your Reviews: <button v-if="reviews.length !== 0" class="dropdown" :onclick="() => {reveal = !reveal}">
    <img v-if="reveal" class="dropdown-image" src="@/assets/images/dropdown.png" />
    <img v-else class="dropdown-image" src="@/assets/images/dropdownUpsideDown.png" />
  </button></h2> 
  <section class="reviews" v-if="loaded && reviews.length !== 0 && reveal">
    <article v-for="review in reviews" :key="review._id">
      <ReviewComponent :review="review" @refreshReviews="getReviews" />
    </article>
  </section>
  <p v-else-if="loaded && reveal">No reviews found</p>
  <p v-else-if="reveal">Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
}

section,
p,
.row {
  max-width: 60em;
}

.dropdown {
  width: 1em;
  height: 1em;
  border: none;
  background: #0000;
  outline: none;
  padding: 0;
}

.dropdown-image {
  width: 1em;
  height: 1em;
  top: 0.2em;
  position: relative;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  max-width: 60em;
}
</style>
