<script setup lang="ts">

import { computed, ref } from 'vue'
import type { Action, Hand, Seat } from '@/types'
import ReplayerSeat from '@/components/ReplayerSeat.vue'
import ReplayerCardComponent from '@/components/ReplayerCardComponent.vue'

const currentActionIndex = ref<number>(0);

const props = defineProps<{
  hand: Hand;
}>();

const showCards = ref<boolean>(false);
const showHud = ref<boolean>(false);

const pot = computed(() => {
  let ante_blinds = props.hand.ante * props.hand.max_players + props.hand.small_blind + props.hand.big_blind;
  return ante_blinds + props.hand.actions.slice(0, currentActionIndex.value).reduce((acc, action) => acc + action.action_amount, 0);
});

const flopVisible = computed(() => {
  return currentAction.value.street != "preflop";
});

const turnVisible = computed(() => {
  return currentAction.value.street == "turn" || currentAction.value.street == "river";
});

const riverVisible = computed(() => {
  return currentAction.value.street == "river";
});

const position = function (seat_number: number): number {
  let hero_seat = props.hand.seats.find(seat => seat.player_name == props.hand.hero)?.seat_number;
  if (hero_seat == undefined) {
    throw new Error("Hero seat not found");
  }
  return (seat_number + (props.hand.max_players - hero_seat)) % props.hand.max_players;
}

const holeCards = computed<[string, string]>(() => {
  let [card1, card2] = [props.hand.hole_card_1, props.hand.hole_card_2];
  return [card1, card2]
})

async function nextAction() {
  if (currentActionIndex.value < props.hand.actions.length) {
    currentActionIndex.value++;
  }
}

async function previousAction() {
  if (currentActionIndex.value > 0) {
    currentActionIndex.value--;
  }
}

async function firstAction() {
  currentActionIndex.value = 0;
}

const currentAction = computed<Action>(() => {
  return props.hand.actions[currentActionIndex.value];
});

const currentPlayer = computed<string>(() => {
  return currentAction.value?.player_name;
});

const button = computed<number>(() => {
  return props.hand.seats.map(seat => seat.seat_number).filter(seat_number => seat_number <= props.hand.button).slice(-1)[0];
});

function seatCards(seat: Seat): [string | null, string | null] {
  if (seat.player_name == props.hand.hero) {
    return holeCards.value;
  }
  return [seat.card1, seat.card2];
}


</script>

<template>
    <div id="table">
      <div id="pot">
        <span>{{ pot }}</span>
      </div>
      <div class="cards">
        <ReplayerCardComponent class="card card1" :text="hand.flop1" :isHidden="!flopVisible"/>
        <ReplayerCardComponent class="card card2" :text="hand.flop2" :isHidden="!flopVisible"/>
        <ReplayerCardComponent class="card card3" :text="hand.flop3" :isHidden="!flopVisible"/>
        <ReplayerCardComponent class="card card4" :text="hand.turn" :isHidden="!turnVisible"/>
        <ReplayerCardComponent class="card card5" :text="hand.river" :isHidden="!riverVisible"/>
      </div>
      <div v-for="seat in props.hand.seats" :key="seat.seat_number">
        <ReplayerSeat :seat="seat" :maxPlayers="hand.max_players" :position="position(seat.seat_number)"
                      :isActive="seat.player_name == currentPlayer"
                      :isButton="seat.seat_number == button"
                      :cards="seatCards(seat)"
                      :showHud="showHud"
                      :show-cards="showCards || seat.player_name == props.hand.hero"
                      :action="seat.player_name == currentPlayer ? currentAction : null"
        />
      </div>
    </div>
    <div class="controls">
      <q-btn @click="firstAction()">Start</q-btn>
      <q-btn @click="previousAction()">Previous</q-btn>
      <q-btn @click="nextAction()">Next</q-btn>
      <q-slider v-model="currentActionIndex" :max="props.hand.actions.length - 1" markers/>
    </div>

    <div>
      Blinds: {{ hand.ante }}/{{ hand.small_blind }}/{{ hand.big_blind }}
      <div class="q-pa-md">
        <q-checkbox v-model="showCards" label="Show cards"/>
      </div>

    </div>
</template>

<style scoped>
.controls {
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
}

div#table {
  height: 278px;
  width: 533px;
  background-image: url("/table.png");
  background-size: 533px;
  position: relative;
  margin-left: 200px;
  margin-top: 100px;
}

#pot {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: xx-large;
}

.cards {
  position: absolute;
  display: inline;
  top: 40%;
  left: 30%;
}


.card1 {
  left: 0;
}

.card2 {
  left: 45px;
}

.card3 {
  left: 90px;
}

.card4 {
  left: 135px;
}

.card5 {
  left: 180px;
}


</style>