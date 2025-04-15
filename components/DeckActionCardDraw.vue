<template>
  <v-dialog
    v-model="dialog"
    scrollable
    width="768"
    content-class="ma-2 ma-sm-6"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        :small="small"
        :class="contentClass"
        icon
        title="Draw opening hand"
        v-bind="attrs"
        @click.prevent="on.click"
      >
        <v-icon :small="small">
          mdi-cards
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Opening hand
        <v-spacer />
        <v-btn
          icon
          title="Close"
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text ref="text">
        <v-row>
          <v-col
            v-for="(card, index) of hand"
            :key="card.uid"
            cols="6"
            sm="3"
          >
            <div
              v-if="index === hand.length - 1"
              class="d-flex align-center justify-center fill-height"
            >
              <v-slide-x-reverse-transition mode="out-in">
                <card-image
                  v-if="drawForTurn"
                  key="card"
                  :card="card"
                />
                <v-btn
                  v-else
                  key="button"
                  small
                  depressed
                  @click="drawForTurn = true"
                >
                  Draw for turn
                </v-btn>
              </v-slide-x-reverse-transition>
            </div>
            <card-image
              v-else
              :card="card"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          @click="drawCards"
        >
          Shuffle
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import sampleSize from 'lodash/sampleSize';

import { pool } from '~/config/cards';

export default {
  name: 'DeckActionCardDraw',

  props: {
    deck: {
      type: Object,
      default: () => ({})
    },
    small: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: undefined
    }
  },

  data: () => ({
    dialog: false,
    hand: [],
    drawForTurn: false
  }),

  computed: {
    isNew() {
      return !this.deck?.name;
    },

    size() {
      return this.deck?.size ?? 0;
    },

    disabled() {
      return this.size < 8 && this.$store.getters['deckBuilding/deckSize'] < 8;
    },

    cards() {
      const cards = this.isNew ? this.$store.state.deckBuilding.deck : this.deck.cards;

      return Object.entries(cards)
        .reduce((result, [
          id,
          quantity
        ]) => ([
          ...result,
          ...Array.from({ length: quantity }, (_, index) => {
            const card = pool.find((card) => card.id === id);

            return {
              ...card,
              uid: `${id}.${index}`
            };
          })
        ]), [])
        .filter(({ type }) => type !== 'Agent');
    }
  },

  watch: {
    dialog(value) {
      if (value) {
        this.drawCards();
      } else {
        this.$refs.text.scrollTop = 0;
      }
    }
  },

  methods: {
    drawCards() {
      this.hand = sampleSize(this.cards, 8);
      this.drawForTurn = false;
    }
  }
}
</script>
