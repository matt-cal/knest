<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["updateAreas"]);
const title = ref("");
const location = ref("");
const parentAreaTitle = ref("");

const createArea = async (title: string, location: string, parentAreaTitle: string) => {
  try {
    await fetchy("/api/areas", "POST", {
      body: { title, location, parentAreaTitle },
    });
  } catch (_) {
    return;
  }
  emptyForm();
  emit("updateAreas");
};

const emptyForm = () => {
  title.value = "";
  location.value = "";
  parentAreaTitle.value = "";
};
</script>

<template>
  <div class="alignment">
  <form @submit.prevent="createArea(title, location, parentAreaTitle)">
    <h3>Temporary form for creating Areas:</h3>
    <input id="title" v-model="title" placeholder="Area Title" required />
    <input id="location" v-model="location" placeholder="Area Location" />
    <input id="content" v-model="parentAreaTitle" placeholder="Parent Area Title (optional)" />
    <button type="submit" class="pure-button-primary pure-button">Create Area</button>
  </form>
</div>
</template>

<style scoped>

.alignment{
  display:flex;
  justify-content:center;
  justify-align:center;

}
</style>
