<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>All Posts</h1>
    <PostListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
.align{
  justify-content: center;
}
</style>
