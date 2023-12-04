<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const area = ref("");
const emit = defineEmits(["refreshPosts"]);

const createReview = async (content: string) => {
  try {
    await fetchy("/api/reviews", "POST", {
      body: { content: content, area: area.value },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  area.value = "";
};
</script>

<template>
  <form @submit.prevent="createReview(content)">
    <label for="content">Review Content:</label>
    <textarea id="content" v-model="content" placeholder="Create a review!" required> </textarea>
    <input v-model="area" placeholder="Area Title" required />
    <button type="submit" class="pure-button-primary pure-button">Create Review</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
