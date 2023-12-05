<script setup lang="ts">
import CreateReviewForm from "@/components/Review/CreateReview.vue";
import EditReviewForm from "@/components/Review/EditReviewForm.vue";
import ReviewComponent from "@/components/Review/ReviewComponent.vue";
import SearchReviewForm from "@/components/Review/SearchReviewForm.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let reviews = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchArea = ref("");

async function getReviews(area?: string) {
  let query: Record<string, string> = area !== undefined ? { area } : {};
  let reviewResults;
  try {
    reviewResults = await fetchy("/api/reviews", "GET", { query });
  } catch (_) {
    return;
  }
  searchArea.value = area ? area : "";
  reviews.value = reviewResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getReviews();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a Review:</h2>
    <CreateReviewForm @refreshPosts="getReviews" />
  </section>
  <div class="row">
    <h2 v-if="!searchArea">Reviews:</h2>
    <h2 v-else>Reviews for {{ searchArea }}:</h2>
    <SearchReviewForm @getByArea="getReviews" />
  </div>
  <section class="posts" v-if="loaded && reviews.length !== 0">
    <article v-for="review in reviews" :key="review._id">
      <ReviewComponent v-if="editing !== review._id" :post="review" @refreshPosts="getReviews" @editPost="updateEditing" />
      <EditReviewForm v-else :post="review" @refreshPosts="getReviews" @editPost="updateEditing" />
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
  margin: 0 auto;
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

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
