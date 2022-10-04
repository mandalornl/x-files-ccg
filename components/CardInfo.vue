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
    cardsLength: {
      type: Number,
      default: 0
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
          gameText: {
            label: 'Game Text',
            component: 'CardFieldText'
          },
          stats: {
            label: 'Stats',
            component: 'CardFieldObject'
          },
          characteristics: {
            label: 'Characteristics',
            component: 'CardFieldObject'
          },
          prerequisite: {
            label: 'Prerequisite',
            component: 'CardFieldString'
          },
          question: {
            label: 'Question',
            component: 'CardFieldString'
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
          foundIn: {
            label: 'Found In',
            component: 'CardFieldString'
          }
        }).filter(([ key ]) => !!this.card?.[key])
      );
    },

    quantity() {
      return this.$store.getters['deckBuilding/quantityByCardId'](this.card.id);
    },

    realQuantity() {
      const id = this.card.id ?? '';

      if (this.quantity < 2 && (id.endsWith('v1') || id.endsWith('v2'))) {
        const num = id.replace(/^xf\d{2}-(\d{4})v\d$/i, '$1');
        const otherId = id.endsWith('v1') ? `XF97-${num}v2` : `XF96-${num}v1`;

        return this.quantity + this.$store.getters['deckBuilding/quantityByCardId'](otherId);
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

    removeCard() {
      this.$store.commit('deckBuilding/removeCard', { id: this.card.id });
    },

    addCard() {
      this.$store.commit('deckBuilding/addCard', { id: this.card.id });
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
