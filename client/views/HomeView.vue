<script setup lang="ts">
import TempAreaListComponent from "@/components/Area/TempAreaListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="align">
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <TempAreaListComponent/>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin:0;
  padding: 10px;
}
.align{
  justify-content: center;
  background-color: #caddeb;
}
</style>
