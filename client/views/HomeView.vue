<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import router from "../router";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

async function goToMap(){
  void router.push({ name: "Map"});
}
</script>


<template>
  <main class="align">
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
      <div class="padding">
      <button @click="goToMap" class="button">
        Explore Map
      </button>
    </div>
    </section>
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
  height: 100vh;
}
.button {
  justify-content: center;
  width: 200px;
  height: 60px;
  border-radius: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.padding{
  padding-top: 25%;
}
</style>
