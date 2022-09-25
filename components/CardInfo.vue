<template>
  <v-navigation-drawer
    v-model="internalValue"
    :width="$vuetify.breakpoint.smAndUp ? 512 : undefined"
    fixed
    temporary
    right
    disable-route-watcher
    mobile-breakpoint="0"
  >
    <div
      v-if="card"
      class="pa-3"
    >
      <v-row>
        <v-col
          cols="12"
          sm="6"
          class="order-sm-1"
        >
          <card-img :card="card" />
          <div class="d-flex align-center justify-space-between mt-1">
            <v-btn
              :disabled="cardIndex === -1 || cardIndex === 0"
              icon
              title="Previous"
              @click="prevCard"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div class="d-flex align-center">
              <v-tooltip
                top
                open-delay="150"
                color="primary"
                content-class="black--text"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    :disabled="quantity === 0"
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="$store.commit('deckBuilding/removeCard', { id: card.id })"
                  >
                    <v-icon small>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </template>
                Remove from deck
              </v-tooltip>
              <code :class="[ 'mx-1 px-2', { 'red white--text': quantity > 0 } ]">
                {{ quantity }}
              </code>
              <v-tooltip
                top
                open-delay="150"
                color="primary"
                content-class="black--text"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    :disabled="realQuantity === 2"
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="$store.commit('deckBuilding/addCard', { id: card.id })"
                  >
                    <v-icon small>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </template>
                Add to deck
              </v-tooltip>
            </div>
            <v-btn
              :disabled="cardIndex === -1 || cardIndex === cardsLength - 1"
              icon
              title="Next"
              @click="nextCard"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="mb-3">
            <div class="font-weight-medium">
              {{ card.title }}
            </div>
            <div class="text-body-2 text--secondary">
              {{ card.id }}
            </div>
          </div>
          <div
            v-for="(props, key) in cardProps"
            :key="key"
            class="mb-3"
          >
            <div class="font-weight-medium">
              {{ props.label }}
            </div>
            <component
              :is="`CardType${props.type}`"
              :value="card[key]"
              @click="$emit('click:filter', { key, value: $event })"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { booleanValue } from '~/mixins/model';

export default {
  name: 'CardInfo',

  mixins: [
    booleanValue
  ],

  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    cardIndex: {
      type: Number,
      default: -1
    },
    cardsLength: {
      type: Number,
      default: 0
    }
  },

  computed: {
    cardProps() {
      return Object.fromEntries(
        Object.entries({
          set: {
            label: 'Set',
            type: 'String'
          },
          type: {
            label: 'Type',
            type: 'String'
          },
          rarity: {
            label: 'Rarity',
            type: 'String'
          },
          cost: {
            label: 'Cost',
            type: 'String'
          },
          gameText: {
            label: 'Game Text',
            type: 'Text'
          },
          stats: {
            label: 'Stats',
            type: 'Object'
          },
          characteristics: {
            label: 'Characteristics',
            type: 'Object'
          },
          prerequisite: {
            label: 'Prerequisite',
            type: 'String'
          },
          question: {
            label: 'Question',
            type: 'String'
          },
          keywords: {
            label: 'Keywords',
            type: 'Array'
          },
          activators: {
            label: 'Activators',
            type: 'Array'
          },
          episode: {
            label: 'Episode',
            type: 'String'
          },
          foundIn: {
            label: 'Found In',
            type: 'String'
          }
        }).filter(([ key ]) => !!this.card?.[key])
      );
    },

    quantity() {
      return this.$store.getters['deckBuilding/quantityById'](this.card.id);
    },

    realQuantity() {
      const id = this.card.id ?? '';

      if (this.quantity < 2 && (id.endsWith('v1') || id.endsWith('v2'))) {
        const num = id.replace(/^xf\d{2}-(\d{4})v\d$/i, '$1');
        const otherId = id.endsWith('v1') ? `XF97-${num}v2` : `XF96-${num}v1`;

        return this.quantity + this.$store.getters['deckBuilding/quantityById'](otherId);
      }

      return this.quantity;
    }
  },

  watch: {
    internalValue(value) {
      if (value) {
        window.addEventListener('keyup', this.onKeyup, false);
      } else {
        window.removeEventListener('keyup', this.onKeyup, false);
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup, false);
  },

  methods: {
    prevCard() {
      const index = Math.max(0, this.cardIndex - 1);

      this.$emit('click:index', index);
    },

    nextCard() {
      const index = Math.min(this.cardsLength - 1, this.cardIndex + 1);

      this.$emit('click:index', index);
    },

    onKeyup(event) {
      event.preventDefault();

      if (event.key === 'ArrowLeft') {
        this.prevCard();
      } else {
        if (event.key === 'ArrowRight') {
          this.nextCard();
        }
      }
    }
  }
}
</script>
