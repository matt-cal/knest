<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const emit = defineEmits(["updateAreas"]);
const props = defineProps(["area"]);
let parentAreaTitle = ref("");

async function getParent() {
  parentAreaTitle.value = (await fetchy("/api/areas", "GET", { query: { _id: props.area.parentArea } }))[0].title;
}

async function deleteArea() {
  await fetchy(`/api/areas/${props.area._id}`, "DELETE");
  emit("updateAreas");
}

onBeforeMount(async () => {
  await getParent();
});
</script>
<template>
  <div class="base">
    <div>Title: {{ $props.area.title }}</div>
    <div>Location: {{ $props.area.location }}</div>
    <div>Parent Area: {{ parentAreaTitle ? parentAreaTitle : "N/A" }}</div>
    <button @click="deleteArea">Delete</button>
  </div>
</template>

<style scoped>
.base {
  background-color: rgb(222, 222, 222);
  padding: 8px;
  margin: 8px 0;
}
</style>
