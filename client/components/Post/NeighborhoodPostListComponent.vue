<script setup lang="ts">
import EditPostForm from "@/components/Post/EditPostForm.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { computed, onBeforeMount, ref } from "vue";

const props = defineProps(["areaTitle"]);
const loaded = ref(false);
const postsByDate = ref<Array<Record<string, string>>>([]);
const postsByUpvotes = ref<Array<Record<string, string>>>([]); // sorted by number of upvotes
const sortByUpvotes = ref(true);
const posts = computed(() => (sortByUpvotes.value ? postsByUpvotes.value : postsByDate.value));
const editing = ref("");

async function getPosts() {
  let postResults;
  try {
    postResults = await fetchy(`/api/areas/${props.areaTitle}/posts`, "GET");
  } catch (_) {
    return;
  }
  postsByDate.value = postResults;

  // get posts array sorted by number of upvotes
  const postUpvotes = new Map();
  for (const post of postResults) {
    const numUpvotes = await fetchy(`/api/post/${post._id}/upvotes`, "GET");
    postUpvotes.set(post._id, numUpvotes);
  }
  // make copy of postResults so that postsByDate is not modified when postsByUpvotes is sorted
  postsByUpvotes.value = [...postResults];
  postsByUpvotes.value.sort((a: Record<string, string>, b: Record<string, string>) => {
    const aUpvotes = postUpvotes.get(a._id);
    const bUpvotes = postUpvotes.get(b._id);
    if (aUpvotes > bUpvotes) {
      return -1;
    } else if (aUpvotes < bUpvotes) {
      return 1;
    }
    return 0;
  });
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
  <section class="posts" v-if="loaded && posts.length !== 0">
    <span class="sort">
      <p>Sort By:</p>
      <button :class="{ underline: sortByUpvotes }" @click="() => (sortByUpvotes = true)" class="filter">Upvotes</button>
      <button :class="{ underline: !sortByUpvotes }" @click="() => (sortByUpvotes = false)" class="filter">Date</button>
    </span>
    <article v-for="post in posts" :key="post._id">
      <PostComponent v-if="editing !== post._id" :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
      <EditPostForm v-else :post="post" @refreshPosts="getPosts" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No posts found</p>
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
  margin: 0;
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

.underline {
  text-decoration: underline;
  font-weight: bold;
}

button {
  cursor: pointer;
}

.sort {
  width: 900px;
  font-size: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.filter {
  background-color: transparent;
  border: none;
  font-size: 20px;
}
</style>
