<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useToastStore } from "../../stores/toast";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const { currentUsername } = storeToRefs(useUserStore());
const props = defineProps(["post"]);
let upvoteCount = ref(0);
let userUpvoted = ref(false);

async function getUpvoteCount() {
  let upvotes;
  try {
    upvotes = await fetchy(`/api/post/${props.post}/upvotes`, "GET");
  } catch (_) {
    return;
  }
  upvoteCount.value = upvotes.length;
}

async function updateUpvoteStatus() {
  const upvoted: boolean = await fetchy(`/api/user/upvoted/${props.post}`, "GET");
  userUpvoted.value = upvoted;
}

async function upvotePost() {
  if (currentUsername.value === "") {
    useToastStore().showToast({ message: "Please login!", style: "error" });
    return;
  }

  if (!userUpvoted.value) {
    await fetchy(`/api/upvotes/${props.post}`, "POST");
  } else {
    // if user already upvoted and clicked upvote button again, then remove upvote
    await fetchy(`/api/upvotes/${props.post}`, "DELETE");
  }
  // switch upvoted value
  userUpvoted.value = !userUpvoted.value;
  await getUpvoteCount();
}

onBeforeMount(async () => {
  await getUpvoteCount();
  await updateUpvoteStatus();
});
</script>

<template>
  <menu>
    <p>{{ upvoteCount }}</p>
    <button v-if="!userUpvoted" class="btn-small pure-button upvote" @click="upvotePost"><img src="../../assets/images/upvote-outline.svg" /></button>
    <button v-if="userUpvoted" class="btn-small pure-button upvote" @click="upvotePost"><img src="../../assets/images/upvote-filled.svg" /></button>
  </menu>
</template>

<style scoped>
button {
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: Transparent;
}

img {
  width: 30px;
  height: 30px;
  padding: 0px;
}

menu {
  display: flex;
  align-items: center;
}
</style>
