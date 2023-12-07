<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class ="color">
  <main class="column">
    <h1>{{ currentUsername }}</h1>
    <h2>Your Ratings & Posts</h2>
    <h2>Settings</h2>
    <button class="pure-button pure-button-primary" @click="logout">Logout</button>
    <button class="button-error pure-button" @click="delete_">Delete User</button>
    <UpdateUserForm />
  </main>
</main>
</template>

<style scoped>

.color {
  background-color: #caddeb;
  height: 100vh;
}

</style>
