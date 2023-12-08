<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import router from "../../router";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["areaTitle"]);
const emit = defineEmits(["submitted"]);
const content = ref("");
const area = ref("");

const affordability = ref();
const walkability = ref();
const entertainment = ref();
const transportation = ref();

const values = computed(() => {
  return {
    overall: Number(overall.value),
    affordability: Number(affordability.value),
    walkability: Number(walkability.value),
    entertainment: Number(entertainment.value),
    transportation: Number(transportation.value),
  };
});

const overall = computed(() => {
  return Math.floor((affordability.value + walkability.value + entertainment.value + transportation.value) / 4);
});

const createReview = async () => {
  emit("submitted");
  try {
    await fetchy("/api/reviews", "POST", {
      body: { content: content.value, area: props.areaTitle, values: values.value },
    });
  } catch (_) {
    return;
  }

  void router.push({ name: "Neighborhood", params: { area: props.areaTitle } });
};

onBeforeMount(async () => {
  affordability.value = 50;
  walkability.value = 50;
  entertainment.value = 50;
  transportation.value = 50;
});
</script>

<template>
  <div class="sliders-container">
    <h3 class="overall">Overall: {{ overall }}</h3>
    <div class="slider-input">
      <p>Affordability</p>
      <div>
        <InputText
          v-model.number="affordability"
          :pt="{
            root: { class: 'input' },
          }"
        />
        <SliderComponent
          v-model.number="affordability"
          :pt="{
            root: { class: 'slider' },
          }"
        />
      </div>
    </div>
    <div class="slider-input">
      <p>Walkability</p>
      <div>
        <InputText
          v-model.number="walkability"
          :pt="{
            root: { class: 'input' },
          }"
        />
        <SliderComponent
          v-model.number="walkability"
          :pt="{
            root: { class: 'slider' },
          }"
        />
      </div>
    </div>
    <div class="slider-input">
      <p>Entertainment</p>
      <div>
        <InputText
          v-model.number="entertainment"
          :pt="{
            root: { class: 'input' },
          }"
        />
        <SliderComponent
          v-model.number="entertainment"
          :pt="{
            root: { class: 'slider' },
          }"
        />
      </div>
    </div>
    <div class="slider-input">
      <p>Transportation</p>
      <div>
        <InputText
          v-model.number="transportation"
          :pt="{
            root: { class: 'input' },
          }"
        />
        <SliderComponent
          v-model.number="transportation"
          :pt="{
            root: { class: 'slider' },
          }"
        />
      </div>
    </div>
  </div>
  <div class="submit-container">
    <button @click="createReview" class="pure-button-primary pure-button submit">Submit</button>
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

p {
  font-weight: bold;
}

.overall {
  font-size: 24px;
}

.submit-container {
  display: flex;
  justify-content: center;
}

.submit {
  margin-top: 16px;
  width: 100px;
  background-color: rgb(53, 55, 89);
  border-radius: 8px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.slider-input {
  width: 400px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
</style>
