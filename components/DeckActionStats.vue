<template>
  <v-dialog
    v-model="dialog"
    scrollable
    width="960"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        :small="small"
        icon
        title="Stats"
        v-bind="attrs"
        @click.prevent="on.click"
      >
        <v-icon :small="small">
          mdi-chart-line
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Stats
        <v-spacer />
        <v-btn
          icon
          title="Close"
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text
        ref="text"
        class="text-body-1"
      >
        <v-row>
          <v-col cols="12">
            <deck-stats-type :cards="cards" />
          </v-col>
          <v-col
            v-for="(color, type) in costTypes"
            :key="type"
            cols="12"
            sm="4"
          >
            <deck-stats-cost
              :cards="cards"
              :type="type"
              :color="color"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import cardList from '~/config/cards.json';
import { defaultDeckName } from '~/store/deckBuilding';

export default {
  name: 'DeckActionStats',

  props: {
    deck: {
      type: Object,
      default: () => ({})
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    dialog: false,
    costTypes: {
      'RP': 'light-blue',
      'CP': 'red',
      '*P': 'purple lighten-3'
    }
  }),

  computed: {
    name() {
      return this.deck?.name ?? defaultDeckName;
    },

    disabled() {
      return this.$store.getters['deckBuilding/sizeByName'](this.name) === 0;
    },

    cards() {
      const deck = this.$store.state.deckBuilding.decks[this.name] ?? {};
      const ids = Object.keys(deck);

      return cardList
        .filter(({ id }) => ids.includes(id))
        .map((card) => ({
          ...card,
          quantity: deck[card.id] ?? 0
        }));
    }
  },

  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.text.scrollTop = 0;
      }
    }
  }
}
</script>
