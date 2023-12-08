<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["review"]);
const emit = defineEmits(["editReview", "refreshReviews"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/reviews/${props.review._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshReviews");
};
</script>

<template>
  <p class="area">Area: {{ props.review.area }}</p>
  <h3>Overall: {{ $props.review.values.overall }}</h3>
  <p>Affordability: {{ $props.review.values.affordability }}</p>
  <p>Walkability: {{ $props.review.values.walkability }}</p>
  <p>Entertainment: {{ $props.review.values.entertainment }}</p>
  <p>Transportation: {{ $props.review.values.transportation }}</p>
  <div class="base">
    <menu v-if="props.review.author == currentUsername">
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.review.dateCreated !== props.review.dateUpdated">Edited on: {{ formatDate(props.review.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.review.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.area {
  color: rgb(63, 63, 63);
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
