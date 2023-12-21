export type Hand = {
  id: string,
  hero: string,
  hole_card_1: string,
  hole_card_2: string,
  button: number,
  max_players: number,
  ante: number,
  small_blind: number,
  big_blind: number,
  upload_date: string,
  flop1: string,
  flop2: string,
  flop3: string,
  turn: string,
  river: string,
  actions: Action[],
  seats: Seat[],
}

export type Action = {
  action_type: string,
  player_name: string,
  street: string,
  action_amount: number,
  id: number,
}

export type Seat = {
  seat_number: number,
  player_name: string,
  stack: number,
  bounty: number|null,
  card1: string|null,
  card2: string|null,
}

export type Tournament = {
  id: number,
  name: string,
  hands: Hand[],
}
