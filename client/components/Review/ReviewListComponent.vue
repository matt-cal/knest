<script setup lang="ts">
import ReviewComponent from "@/components/Review/ReviewComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["areaTitle", "isCity"]);
const loaded = ref(false);
let reviews = ref<Array<Record<string, string>>>([]);

async function getReviews() {
  let reviewResults;
  try {
    if (props.isCity) {
      reviewResults = await fetchy(`/api/areas/${props.areaTitle}/subareaReviews`, "GET");
    } else {
      reviewResults = await fetchy(`/api/areas/${props.areaTitle}/reviews`, "GET");
    }
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
  <section class="posts" v-if="loaded && reviews.length !== 0">
    <article v-for="review in reviews" :key="review._id">
      <ReviewComponent :review="review" @refreshReviews="getReviews" />
    </article>
  </section>
  <p v-else-if="loaded">No reviews found</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
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

.row {
  display: flex;
  justify-content: space-between;
  max-width: 60em;
}
</style>
