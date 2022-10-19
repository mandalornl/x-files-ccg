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
            v-for="type in [ 'RP', 'CP', '*P' ]"
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
import { cards } from '~/config/card';
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
    name() {
      return this.deck?.name ?? defaultDeckName;
    },

    disabled() {
      return this.$store.getters['deckBuilding/sizeByName'](this.name) === 0;
    },

    cards() {
      const deck = this.$store.getters['deckBuilding/deckByName'](this.name);
      const ids = Object.keys(deck);

      return cards
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
