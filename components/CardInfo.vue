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
          <v-dialog
            width="444"
            content-class="ma-2 ma-sm-6"
          >
            <template #activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
              >
                <card-image :card="card" />
              </div>
            </template>
            <card-image
              :card="card"
              class="rounded-lg"
            />
          </v-dialog>
          <div
            v-if="!disablePagination"
            class="d-flex align-center justify-space-between mt-1"
          >
            <v-btn
              :disabled="cardIndex === -1 || cardIndex === 0"
              icon
              title="Previous"
              @click="prevCard"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div
              v-if="card.id !== '-'"
              class="d-flex align-center"
            >
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
                    @click="removeCard"
                  >
                    <v-icon small>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </template>
                Remove from deck
              </v-tooltip>
              <code :class="[ 'mx-1 px-2', { 'primary black--text': quantity > 0 } ]">
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
                    @click="addCard"
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
              :disabled="cardIndex === -1 || cardIndex === cards.length - 1"
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
            v-for="(field, key) in fields"
            :key="key"
            class="mb-3"
          >
            <div class="font-weight-medium">
              {{ field.label }}
            </div>
            <component
              :is="field.component"
              :value="card[key]"
              :class="field.class"
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
    cards: {
      type: Array,
      default: () => ([])
    },
    disablePagination: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    fields() {
      return Object.fromEntries(
        Object.entries({
          set: {
            label: 'Set',
            component: 'CardFieldString'
          },
          type: {
            label: 'Type',
            component: 'CardTypeChip',
            class: 'mt-1'
          },
          rarity: {
            label: 'Rarity',
            component: 'CardFieldString'
          },
          cost: {
            label: 'Cost',
            component: 'CardFieldString'
          },
          prerequisite: {
            label: 'Prerequisite',
            component: 'CardFieldString'
          },
          question: {
            label: 'Question',
            component: 'CardFieldString'
          },
          gameText: {
            label: 'Game Text',
            component: 'CardFieldText'
          },
          gameEffect: {
            label: 'Game Effect',
            component: 'CardFieldText'
          },
          skills: {
            label: 'Skills',
            component: 'CardFieldObject'
          },
          characteristics: {
            label: 'Characteristics',
            component: 'CardFieldObject'
          },
          keywords: {
            label: 'Keywords',
            component: 'CardFieldArray'
          },
          activators: {
            label: 'Activators',
            component: 'CardFieldArray'
          },
          episode: {
            label: 'Episode',
            component: 'CardFieldString'
          },
          bio: {
            label: 'Biographical Information',
            component: 'CardFieldText'
          },
          dialogue: {
            label: 'Dialogue',
            component: 'CardFieldText'
          },
          foundIn: {
            label: 'Found In',
            component: 'CardFieldString'
          },
          tags: {
            label: 'Tags',
            component: 'CardFieldArray'
          },
          createdBy: {
            label: 'Created by',
            component: 'CardFieldString'
          }
        }).filter(([ key ]) => (
          this.card?.[key] !== undefined
          && this.card?.[key] !== null
        ))
      );
    },

    quantity() {
      return this.$store.getters['deckBuilding/quantityInDeck'](this.card.id);
    },

    realQuantity() {
      const id = this.card.id ?? '';

      if (this.quantity < 2 && (id.endsWith('v1') || id.endsWith('v2'))) {
        const num = id.replace(/^xf\d{2}-(\d{4})v\d$/i, '$1');
        const otherId = id.endsWith('v1') ? `XF97-${num}v2` : `XF96-${num}v1`;

        return this.quantity + this.$store.getters['deckBuilding/quantityInDeck'](otherId);
      }

      return this.quantity;
    }
  },

  watch: {
    internalValue(value) {
      if (this.disablePagination) {
        return;
      }

      if (value) {
        window.addEventListener('keyup', this.onKeyup, false);
      } else {
        window.removeEventListener('keyup', this.onKeyup, false);
      }
    }
  },

  mounted() {
    if (!this.disablePagination) {
      window.addEventListener('keyup', this.onKeyup, false);
    }
  },

  beforeDestroy() {
    if (!this.disablePagination) {
      window.removeEventListener('keyup', this.onKeyup, false);
    }
  },

  methods: {
    prevCard() {
      if (this.cardIndex === -1 || this.cardIndex === 0) {
        return;
      }

      const index = Math.max(0, this.cardIndex - 1);

      this.$emit('click:index', index);
    },

    nextCard() {
      if (this.cardIndex === -1 || this.cardIndex === this.cards.length - 1) {
        return;
      }

      const index = Math.min(this.cards.length - 1, this.cardIndex + 1);

      this.$emit('click:index', index);
    },

    removeCard() {
      if (this.quantity === 0) {
        return;
      }

      this.$store.commit('deckBuilding/removeCardFromDeck', this.card.id);
    },

    addCard() {
      if (this.realQuantity === 2) {
        return;
      }

      this.$store.commit('deckBuilding/addCardToDeck', this.card.id);
    },

    onKeyup(event) {
      event.preventDefault();

      if (event.key === 'ArrowLeft') {
        this.prevCard();
      } else if (event.key === 'ArrowRight') {
        this.nextCard();
      } else if (event.key === 'ArrowDown') {
        this.removeCard();
      } else {
        if (event.key === 'ArrowUp') {
          this.addCard();
        }
      }
    }
  }
}
</script>
