<script setup lang="ts">

import { QSplitter } from 'quasar'
import { computed, ref, watchEffect } from 'vue'
import type { Hand, Tournament } from '@/types'
import ReplayerComponent from '@/components/ReplayerComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import router from '@/router'

const splitterModel = ref<number>(80);
const props = defineProps<{
  tournamentId: string,
}>();

const tournament = ref<Tournament|null>(null);
const handIndex = ref<number>(0);

const hand = computed(() => {
  return tournament.value?.hands[handIndex.value];
});

watchEffect(async() => {
  const url = `http://localhost:8000/tournaments/${props.tournamentId}`;
  tournament.value = await (await fetch(url)).json()
})

async function handleItemClick(index: number) {
  handIndex.value = index;
}

</script>

<template>
 <div>
    <q-splitter
      v-model="splitterModel"
     after-class="">

      <template v-slot:before>
        <ReplayerComponent v-if="hand" :hand="hand"/>
      </template>

      <template v-slot:after>
        <q-scroll-area style="height: 800px">
        <q-list v-if="tournament">
          <q-item v-for="(hand, index) in tournament.hands" :key="hand.id" clickable v-ripple @click="() => handleItemClick(index)">
            <q-badge>{{ index }}</q-badge>
            <CardComponent :text="hand.hole_card_1" :is-hidden=false></CardComponent>
            <CardComponent :text="hand.hole_card_2" :is-hidden=false></CardComponent>
          </q-item>
        </q-list>
        </q-scroll-area>
      </template>

    </q-splitter>
  </div>
</template>

<style scoped>

</style>