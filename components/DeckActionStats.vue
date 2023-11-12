<template>
  <v-dialog
    v-model="dialog"
    scrollable
    width="960"
    content-class="ma-2 ma-sm-6"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :disabled="disabled"
        :small="small"
        :class="contentClass"
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
            v-for="type in [ 'RP', 'CP', 'PP' ]"
            :key="type"
            cols="12"
            sm="4"
          >
            <deck-stats-cost
              :cards="cards"
              :type="type"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <deck-stats-site
              :cards="cards"
              :keywords="[
                'Affiliation',
                'Motive',
                'Method',
                'Result'
              ]"
              title="Site question"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <deck-stats-site
              :cards="cards"
              :keywords="[
                'Alien Investigation',
                'Behavioral',
                'Bureaucracy',
                'Computer',
                'Criminal Investigation',
                'Evidence Collection',
                'Medical',
                'Observation',
                'Occult Investigation',
                'Sciences',
                'Subterfuge'
              ]"
              title="Site prerequisite"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { pool } from '~/config/card';

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
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: undefined
    }
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    isNew() {
      return !this.deck?.name;
    },

    disabled() {
      return this.isNew && this.$store.getters['deckBuilding/deckSize'] === 0;
    },

    cards() {
      const cards = this.isNew ? this.$store.state.deckBuilding.deck : this.deck.cards;
      const ids = Object.keys(cards);

      return pool
        .filter(({ id }) => ids.includes(id))
        .map((card) => ({
          ...card,
          quantity: cards[card.id] ?? 0
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
