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
        title="Draw cards"
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
        Card draw
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
            v-for="card in hand"
            :key="card.uid"
            cols="6"
            sm="3"
          >
            <card-image :card="card" />
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

import { cards } from '~/config/card';
import { defaultDeckName } from '~/store/deckBuilding';

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
    hand: []
  }),

  computed: {
    name() {
      return this.deck?.name ?? defaultDeckName;
    },

    disabled() {
      return this.$store.getters['deckBuilding/sizeByName'](this.name) < 8;
    },

    cards() {
      const deck = this.$store.getters['deckBuilding/deckByName'](this.name);

      return Object.entries(deck)
        .reduce((result, [
          id,
          quantity
        ]) => ([
          ...result,
          ...Array.from({ length: quantity }, (_, index) => {
            const card = cards.find((card) => card.id === id);

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
    }
  }
}
</script>
