<template>
  <layout-default>
    <h1>Introduction</h1>
    <p>The X-Files CCG 'FCU' (Fixed, Common & Uncommon) Cube is a card set designed to replicate the feeling of deck construction by booster pack or sealed deck opening without the need for such products.</p>
    <p>The cardlist for this cube includes only common, uncommon and fixed cards from the Premiere/The Truth is Out There and 101361 editions, with the aim that this will make creating the card pool it uses possible for the widest number of collectors, without compromising on interesting gameplay.</p>
    <h2>Sealed Play</h2>
    <p>If you plan to use this cube for games by webcam then Sealed Play is the instruction set that you will use. Sealed instructions are also the ones to use if you're playing 2-player in- person.</p>
    <p>For sealed play, first shuffle all the agents from the cardlist together. Deal 8 to each player present. These are the agents you will pick from to create your team.</p>
    <p>After agents have been dealt, shuffle all non-agent cards together, then deal 120 cards to each player present. The cards you are dealt will be used to construct your bureau deck.</p>
    <p>Deck construction and gameplay then proceeds as described in the official rules.</p>
    <p class="text-right text-caption d-block">
      Special thanks to Alastair 'TheJauntyGoblin' Headden
      <v-icon
        small
        color="primary"
      >
        mdi-cube-outline
      </v-icon>
    </p>
    <div class="mb-4">
      <v-btn
        small
        depressed
        @click="drawAgents"
      >
        Draw Agents
      </v-btn>
      <v-btn
        small
        depressed
        @click="drawCards"
      >
        Draw Cards
      </v-btn>
      <v-btn
        small
        depressed
        @click="clear"
      >
        Clear
      </v-btn>
    </div>
    <v-fade-transition>
      <v-row v-if="player1.length > 0 && player2.length > 0">
        <v-col cols="6">
          <h3>Player 1</h3>
          <v-row>
            <v-col
              v-for="card of player1"
              :key="card.uid"
              cols="3"
            >
              <card-image :card="card" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <h3>Player 2</h3>
          <v-row>
            <v-col
              v-for="card of player2"
              :key="card.uid"
              cols="3"
            >
              <card-image :card="card" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-fade-transition>
  </layout-default>
</template>

<script>
import sampleSize from 'lodash/sampleSize';

import { cards } from '~/config/card';
import cube from '~/config/fcu-cube.json';

export default {
  name: 'PageFCUCube',

  data: () => ({
    player1: [],
    player2: []
  }),

  head: () => ({
    title: 'FCU Cube'
  }),

  methods: {
    drawAgents() {
      const agentsInCube = Object.keys(cube.agent);

      const player1 = sampleSize(agentsInCube, 8);
      const player2 = sampleSize(agentsInCube.filter((id) => !player1.includes(id)), 8);

      this.player1 = this.getCards(player1);
      this.player2 = this.getCards(player2);
    },

    drawCards() {
      const cardsInCube = Object.entries(cube)
        .filter(([ key ]) => key !== 'agent')
        .flatMap(([ , cards ]) => (
          Object.entries(cards).reduce((result, [
            id,
            length
          ]) => ([
            ...result,
            ...Array.from({ length }, (_, index) => `${id}.${index}`)
          ]), [])
        ));

      const player1 = sampleSize(cardsInCube, 120);
      const player2 = sampleSize(cardsInCube.filter((id) => !player1.includes(id)), 120);

      this.player1 = this.getCards(player1);
      this.player2 = this.getCards(player2);
    },

    getCards(items) {
      const collator = new Intl.Collator();

      return items
        .map((uid) => ({
          ...cards.find((card) => uid.startsWith(card.id)),
          uid
        }))
        .sort((a, b) => {
          if (a.type === b.type) {
            return collator.compare(a.id, b.id);
          }

          return collator.compare(a.type, b.type);
        });
    },

    clear() {
      this.player1 = [];
      this.player2 = [];
    }
  }
}
</script>
