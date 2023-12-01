<script setup lang="ts">
import PostComponent from "../Post/PostComponent.vue";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const emit = defineEmits(["updateAreas"]);
const props = defineProps(["area"]);
let parentAreaTitle = ref("");
let posts = ref<Array<Record<string, string>>>([]);

async function getParent() {
  const parent = (await fetchy("/api/areas", "GET", { query: { _id: props.area.parentArea } }))[0];
  if (parent !== null) {
    parentAreaTitle.value = parent.title;
  }
}

async function getPosts() {
  const areaPosts = await fetchy(`/api/areas/${props.area.title}/posts`, "GET");
  posts.value = areaPosts;
}

async function deleteArea() {
  await fetchy(`/api/areas/${props.area._id}`, "DELETE");
  emit("updateAreas");
}

onBeforeMount(async () => {
  await getParent();
  await getPosts();
});
</script>
<template>
  <div class="base">
    <div>Title: {{ $props.area.title }}</div>
    <div>Location: {{ $props.area.location }}</div>
    <div>Parent Area: {{ parentAreaTitle ? parentAreaTitle : "N/A" }}</div>
    <button @click="deleteArea">Delete</button>
  </div>
  <div class="posts">
    <PostComponent v-for="post in posts" :key="post._id" :post="post" @refreshPosts="getPosts" />
  </div>
  <hr />
</template>

<style scoped>
.base {
  background-color: rgb(222, 222, 222);
  padding: 8px;
  margin: 8px 0;
}

.posts {
  padding-left: 32px;
}
</style>
