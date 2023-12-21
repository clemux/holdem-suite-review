<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{
  text: string|null;
  isHidden: boolean;
}>();

const rank = computed(() => {
  if (!props.isHidden && props.text) {
    return props.text.split("")[0];
  }
  return "?";
});

const suit = computed(() => {
  if (props.isHidden || !props.text) {
    return "?";
  }
  switch (props.text.split("")[1]) {
    case "s":
      return "♠";
    case "h":
      return "♥";
    case "d":
      return "♦";
    case "c":
      return "♣";
  }
})

const color = computed(() => {
  if (props.isHidden || !props.text) {
    return {color: "grey", opacity: 0.2};
  }
  switch (props.text.split("")[1]) {
    case "s":
      return {color: "black"};
    case "h":
      return {color: "red"};
    case "d":
      return {color: "blue"};
    case "c":
      return {color: "green"};
  }
})



</script>

<template>
  <div class="card-item">
    <span class="rank top-left" :style="color">{{ rank }}</span>
    <span class="suit bottom-right" :style="color">{{ suit }}</span>
  </div>
</template>

<style scoped>
.card-item {
  background: #ffffff;
  width: 40px;
  height: 50px;
  font-size: large;
}
</style>