<script setup lang="ts">

import { ref, watchEffect } from 'vue'
import type { Hand } from '@/types'
import Replayer from '@/components/ReplayerComponent.vue'

const props = defineProps<{
  hand_id: string,
}>();

const hand = ref<Hand|null>(null);

watchEffect(async() => {
  const url = `http://localhost:8000/hands/${props.hand_id}`;
  hand.value = await (await fetch(url)).json()
})
</script>

<template>
<p>{{props.hand_id}}</p>
  <div v-if="hand">
    <Replayer :hand="hand"></Replayer>
  </div>
</template>

<style scoped>

</style>