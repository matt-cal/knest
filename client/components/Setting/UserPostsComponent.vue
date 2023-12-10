<script setup lang="ts">
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
let posts = ref<Array<Record<string, string>>>([]);
let editing = ref("");
const reveal = ref(true);

async function getPosts() {
  let postResults;
  try {
    postResults = await fetchy("/api/userPosts", "GET");
  } catch (_) {
    return;
  }
  posts.value = postResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getPosts();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <h2>Your Posts: <button v-if="posts.length !== 0" class="dropdown" :onclick="() => {reveal = !reveal}">
    <img v-if="reveal" class="dropdown-image" src="@/assets/images/dropdown.png" />
    <img v-else class="dropdown-image" src="@/assets/images/dropdownUpsideDown.png" />
  </button></h2>
  </div>
  <section class="posts" v-if="loaded && posts.length !== 0 && reveal">
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded && reveal">No posts found</p>
  <p v-else-if="reveal">Loading...</p>
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
