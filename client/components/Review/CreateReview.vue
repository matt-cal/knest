<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["areaTitle"]);
const content = ref("");
const area = ref("");
const emit = defineEmits(["refreshPosts"]);

const value = ref();

const createReview = async (content: string) => {
  try {
    await fetchy("/api/reviews", "POST", {
      body: { content: content, area: area.value },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  area.value = "";
};

onBeforeMount(async () => {
  value.value = 50;
});
</script>

<template>
  <div class="sliders-container">
    <div class="slider-input">
      <p>Category</p>
      <div>
        <InputText
          v-model="value"
          :pt="{
            root: { class: 'input' },
          }"
        />
        <SliderComponent
          v-model.number="value"
          :pt="{
            root: { class: 'slider' },
          }"
        />
      </div>
    </div>
  </div>
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

.input {
  width: 250px;
  border-color: darkblue;
}

.slider {
  width: 250px;
}

.sliders-container {
  display: flex;
  justify-content: center;
}

.slider-input {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>
