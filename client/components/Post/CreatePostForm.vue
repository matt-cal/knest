<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, ref } from "vue";
import { AreaDoc } from "../../../server/concepts/area";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["refreshPosts", "submitted"]);
const props = defineProps(["areaTitle"]);
const content = ref("");
const postAreaTitle = ref(props.areaTitle);
const areas = ref<Array<string>>([]);

const createPost = async (content: string) => {
  emit("submitted");
  try {
    await fetchy("/api/posts", "POST", {
      body: { content: content, area: postAreaTitle.value },
    });
  } catch (_) {
    return;
  }
  // go to neighborhood page once post is created
  void router.push({ name: "Neighborhood", params: { area: postAreaTitle.value } });
};

onBeforeMount(async () => {
  // get all areas that have the same parent as the passed down area
  // => get all other neighborhoods in the same city to use as other options for the post's neighborhood
  const a = (await fetchy("/api/areas", "GET", { query: { title: props.areaTitle } }))[0];
  const subareas: AreaDoc[] = await fetchy(`/api/areas/${a.parentArea}/subareas`, "GET");
  areas.value = subareas
    .map((s) => s.title)
    .filter((s) => s !== props.areaTitle)
    .sort();
});
</script>

<template>
  <form @submit.prevent="createPost(content)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <label for="area">Neighborhood:</label>
    <select v-model="postAreaTitle" id="area">
      <option :key="props.areaTitle" :value="props.areaTitle">{{ $props.areaTitle }}</option>
      <option v-for="a in areas" :key="a" :value="a">{{ a }}</option>
    </select>
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
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
