<template>
  <layout-default fluid>
    <v-row>
      <v-col cols="12">
        <agent-presets
          v-model="ids"
          @click="showSelected = true"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <div class="d-flex align-center mb-5">
          <v-switch
            v-model="showSelected"
            :disabled="ids.length === 0"
            hide-details
            class="mt-0 pt-0"
            label="Selected"
          />
          <v-spacer />
          <agent-save-preset v-model="ids" />
          <v-btn
            :disabled="ids.length === 0"
            icon
            small
            title="Clear"
            class="ml-1"
            @click="ids = []"
          >
            <v-icon small>
              mdi-close-circle
            </v-icon>
          </v-btn>
        </div>
        <v-expand-transition>
          <div v-if="hasAnyFilters">
            <v-btn
              small
              depressed
              class="mb-3"
              @click="clearAllFilters"
            >
              Clear filters
            </v-btn>
          </div>
        </v-expand-transition>
        <v-expansion-panels
          v-model="panels"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Stats
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mx-n4">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      v-for="(item, key) in skills"
                      :key="key"
                      :class="item.class"
                    >
                      <td>{{ key }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                    <tr>
                      <td>Cost</td>
                      <td>{{ totalCost }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="(filter, key) in filters"
            :key="key"
          >
            <v-expansion-panel-header>
              {{ filter.label }} ({{ filter.value.length }})
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <card-filter-operation
                v-if="filter.operation !== undefined"
                v-model="filters[key].operation"
              />
              <card-filter-checkbox
                v-model="filters[key].value"
                :type="key"
                :items="filter.items"
                :operation="filter.operation"
                :cards="cards"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="9"
      >
        <v-row
          v-intersect="{
            handler: onIntersect,
            options: {
              rootMargin: `-${$vuetify.application.top}px 0px 0px`
            }
          }"
        >
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="6"
            sm="4"
            md="3"
          >
            <v-card
              :disabled="card.disabled"
              :color="card.active ? 'primary' : undefined"
              flat
              outlined
              @click="toggle(card)"
            >
              <card-img :card="card">
                <agent-tooltip
                  :card="card"
                  :filters="filters"
                  content-class="ma-1"
                />
              </card-img>
            </v-card>
          </v-col>
        </v-row>
        <v-fade-transition>
          <div
            v-if="!intersecting"
            class="position-sticky"
          >
            <v-btn
              depressed
              class="d-block mx-auto"
              @click="$vuetify.goTo(0)"
            >
              {{ cards.length }} {{ cards.length === 1 ? 'result' : 'results' }} found
              <v-icon right>
                mdi-arrow-up
              </v-icon>
            </v-btn>
          </div>
        </v-fade-transition>
      </v-col>
    </v-row>
  </layout-default>
</template>

<script>
import { Intersect } from 'vuetify/lib/directives';

import { cards } from '~/config/card';
import {
  advancedSkills,
  basicSkills
} from '~/config/agent';

export default {
  name: 'PageAgentSelector',

  directives: {
    Intersect
  },

  data() {
    const filters = Object.fromEntries(
      Object.entries({
        advancedSkills: {
          label: 'Skills',
          items: advancedSkills,
          operation: 'and'
        },
        costInt: {
          label: 'Cost',
          items: Array.from({ length: 7 }, (_, index) => index + 1),
          operation: 'and'
        }
      }).map(([
        key,
        {
          operation,
          ...filter
        }
      ]) => {
        const value = this.$route.query[key] ?? '';
        const and = value.includes('+');

        return [
          key,
          {
            ...filter,
            value: value
              .split(and ? '+' : ',')
              .filter(Boolean)
              .map((value) => key === 'costInt' ? Number(value) : value),
            operation: and ? 'and' : operation
          }
        ];
      })
    );

    return {
      filters,
      ids: (this.$route.query.ids ?? '')
        .split(',')
        .filter(Boolean),
      panels: this.$vuetify.breakpoint.xsOnly
        ? []
        : Array.from({ length: Object.keys(filters).length + 1 }, (_, index) => index),
      timeoutId: null,
      intersecting: true,
      showSelected: this.$route.query.showSelected === null
    };
  },

  head: () => ({
    title: 'Agent Selector'
  }),

  computed: {
    agentCards() {
      return cards
        .filter(({
          set,
          type
        }) => set !== 'Premiere' && type === 'Agent')
        .map((card) => ({
          ...card,
          costInt: parseInt(card.cost, 10),
          advancedSkills: Object.keys(card.skills).filter((value) => advancedSkills.includes(value))
        }));
    },

    cards() {
      return this.agentCards
        .filter((card) => {
          if (this.showSelected && !this.ids.includes(card.id)) {
            return false;
          }

          return Object.entries(this.filters).every(([
            key,
            {
              value,
              operation
            }
          ]) => {
            if (value.length === 0) {
              return true;
            }

            if (Array.isArray(card[key])) {
              if (operation === 'and') {
                return value.every((value) => card[key].includes(value));
              }

              return value.some((value) => card[key].includes(value));
            }

            return value.includes(card[key]);
          });
        })
        .map((card) => {
          const active = this.ids.includes(card.id);

          return {
            ...card,
            active,
            disabled: card.costInt > this.availableCost && !active
          };
        });
    },

    skills() {
      const skills = [
        ...advancedSkills,
        ...basicSkills
      ].reduce((result, key) => ({
        ...result,
        [key]: {
          value: 0,
          class: undefined
        }
      }), {});

      this.ids.forEach((id) => {
        const card = this.agentCards.find((card) => card.id === id);

        if (!card) {
          return;
        }

        advancedSkills.forEach((key) => {
          const value = skills[key].value + (card.skills[key] ?? 0);

          skills[key] = {
            value,
            class: this.getClass(value)
          };
        });

        basicSkills.forEach((key) => {
          skills[key].value += (card.skills[key] ?? 0);
        });
      });

      return skills;
    },

    totalCost() {
      return this.ids.reduce((total, id) => {
        const card = this.agentCards.find((card) => card.id === id);

        if (!card) {
          return total;
        }

        return total + card.costInt;
      }, 0);
    },

    availableCost() {
      return 20 - this.totalCost;
    },

    hasAnyFilters() {
      return Object.values(this.filters).some(({ value }) => value.length > 0);
    },

    routeQuery() {
      const ids = [ ...this.ids ].sort();

      return {
        ids: ids.length > 0 ? ids.join(',') : undefined,
        showSelected: this.showSelected ? null : undefined,
        ...Object.fromEntries(
          Object.entries(this.filters).map(([
            key,
            {
              value,
              operation
            }
          ]) => ([
            key,
            value.length > 0 ? value.join(operation === 'and' ? '+' : ',') : undefined
          ]))
        )
      };
    }
  },

  watch: {
    routeQuery(value) {
      clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        const { route } = this.$router.resolve({
          query: {
            ...this.$route.query,
            ...value
          }
        });

        if (route.fullPath !== this.$route.fullPath) {
          this.$router.replace(route);
        }
      });
    },

    'ids.length'(value) {
      if (!value) {
        this.showSelected = false;
      }
    },

    showSelected() {
      this.clearAllFilters();
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeoutId);
  },

  methods: {
    getClass(value) {
      if (value >= 7) {
        return 'cyan--text text--accent-2';
      } else if (value >= 4) {
        return 'primary--text';
      } else if (value === 3) {
        return 'amber--text text--lighten-2';
      } else if (value === 2) {
        return 'red--text text--accent-2';
      } else {
        return undefined;
      }
    },

    clearAllFilters() {
      this.filters = Object.fromEntries(
        Object.entries(this.filters).map(([
          key,
          filter
        ]) => ([
          key,
          {
            ...filter,
            value: []
          }
        ]))
      );
    },

    onIntersect(entries, observer, isIntersecting) {
      this.intersecting = isIntersecting;
    },

    toggle(card) {
      if (this.ids.includes(card.id)) {
        this.ids.splice(this.ids.indexOf(card.id), 1);
      } else {
        this.ids.push(card.id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.position-sticky {
  top: 50%;
  left: 0;
  right: 0;
}
</style>
