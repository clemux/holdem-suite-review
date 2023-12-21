<script setup lang="ts">

import { ref } from 'vue'
import type { QTableColumn } from 'quasar'
import type { Hand, Tournament } from '@/types'
import router from '@/router'

const hands = ref<Hand[]>([])
const tournaments = ref<Tournament[]>([]);

const handColumns: QTableColumn[] = [
  { name: 'id', field: 'id', label: 'ID' },
  { name: 'hero', field: 'hero', label: 'Hero' },
  { name: 'Card 1', align: 'center', label: 'Card 1', field: 'hole_card_1' },
  { name: 'Card 2', align: 'center', label: 'Card 2', field: 'hole_card_2' },
  { name: 'datetime', label: 'Date', field: 'upload_date', sortable: true },
]

const tournamentColumns: QTableColumn[] = [
  {name: 'id', field: 'id', label: 'ID'},
  {name: 'name', field: 'name', label: 'Name'},
  {name: 'datetime', field: 'datetime', label: 'Date', sortable: true}
]


const loadHands = async () => {
  let response = await fetch('http://localhost:8000/hands')
  hands.value = await response.json()
}

const loadTournaments = async () => {
  let response = await fetch("http://localhost:8000/tournaments")
  tournaments.value = await response.json()
}

async function replay(_: Event, row: any, __:number) {
  router.push({ name: "replayer", params: {hand_id: row.id}});
}

async function goTournament(_: Event, row: any, __: number) {
  router.push({ name: "tournament", params: {tournamentId: row.id}})
}

</script>

<template>
  <div>
  <h2>Uploaded hands</h2>
  <q-btn @click="loadHands">Load</q-btn>
  <q-table title="Hands" :rows="hands" :columns="handColumns" row-key="id"
           @rowClick="replay"/>

  </div>
  <div>
    <h2>Uploaded tournaments</h2>
    <q-btn @click="loadTournaments">Load</q-btn>
    <q-table title="Tournaments" :rows="tournaments" :columns="tournamentColumns" row-key="id"
             @row-click="goTournament"
    />
  </div>
</template>

<style scoped>

</style>