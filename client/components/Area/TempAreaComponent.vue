<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import PostComponent from "../Post/PostComponent.vue";

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
    <div class="center">
    <div>{{ $props.area.title }}</div>
    </div>
    <div class="parent">
    <div>{{ parentAreaTitle ? parentAreaTitle : "N/A" }}</div>
    </div>
    <div class="location">
    <div>Location: {{ $props.area.location }}</div>
    </div>
    <div class="button">
    <button @click="deleteArea">Delete</button>
  </div>
  </div>
  <div class="posts">
    <PostComponent v-for="post in posts" :key="post._id" :post="post" @refreshPosts="getPosts" />
  </div>
  <hr />
</template>

<style scoped>

.button{
  justify-content: center;
  margin:auto;
  display:flex;
  padding-top: 5px;
}
.base {
  background-color: #b3a98d;
  padding: 8px;
  margin: auto;
  justify-content: center;
  justify-items: center;

}

.center{
  justify-content: center;
  margin:auto;
  display: flex;
  font-size: 25px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

.parent{
  justify-content: center;
  margin:auto;
  display:flex;
  font-size: 20px;
  padding-top: 5px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.location{
  justify-content: center;
  margin:auto;
  display: flex;
  font-size: 13px;
  padding-top: 5px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.posts {
  padding-left: 32px;
}
</style>
