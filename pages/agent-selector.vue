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
          <v-expansion-panel>
            <v-expansion-panel-header>
              Stats
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mx-n4">
                <v-simple-table dense>
                  <tbody>
                    <tr
                      v-for="item of skills"
                      :key="item.label"
                      :class="item.textColor"
                    >
                      <td>{{ item.label }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="9"
      >
        <v-sheet
          :style="{ top: `${$vuetify.application.top + 8}px` }"
          class="position-sticky mb-4 mx-sm-n3 px-1 py-2 rounded-lg z-index-1"
        >
          <v-row
            v-for="(items, index) of skillRows"
            :key="index"
            no-gutters
          >
            <v-col
              v-for="item of items"
              :key="item.label"
              class="d-flex justify-center"
            >
              <v-tooltip
                :color="item.iconColor"
                top
                open-delay="150"
                content-class="black--text"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    :color="item.iconColor"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon :color="item.iconColor">
                      {{ item.icon }}
                    </v-icon>
                  </v-btn>
                </template>
                {{ item.label }} ({{ item.value }})
              </v-tooltip>
            </v-col>
          </v-row>
        </v-sheet>
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
            :key="card.id"
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
              <card-image :card="card">
                <agent-tooltip
                  :card="card"
                  :filters="filters"
                  content-class="ma-1"
                />
              </card-image>
            </v-card>
          </v-col>
        </v-row>
        <v-fade-transition>
          <div
            v-if="!intersecting"
            style="top: 50%; left: 0; right: 0"
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
      panels: this.$vuetify.breakpoint.xsOnly ? [] : [ 0, 1 ],
      timeoutId: null,
      intersecting: true,
      showSelected: this.$route.query.showSelected === null
    };
  },

  head: () => ({
    title: 'Agent Selector'
  }),

  computed: {
    availableAgents() {
      return cards
        .filter(({
          set,
          type,
          id
        }) => (
          type === 'Agent'
          && ![
            'Premiere',
            'Gen Con'
          ].includes(set)
          && ![
            'PR22-0001-MUL',
            'PR22-0002-SCU'
          ].includes(id)
        ))
        .map((card) => ({
          ...card,
          costInt: parseInt(card.cost, 10),
          advancedSkills: Object.keys(card.skills).filter((value) => advancedSkills.includes(value))
        }));
    },

    cards() {
      return this.availableAgents
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

    advancedSkills() {
      return advancedSkills.map((label) => {
        const value = this.getSkillTotal((card) => card.skills[label] ?? 0);

        return {
          label,
          value,
          textColor: this.getTextColor(value),
          icon: this.getIcon(label),
          iconColor: this.getIconColor(value)
        }
      });
    },

    basicSkills() {
      return basicSkills.map((label) => {
        const value = this.getSkillTotal((card) => card.skills[label] ?? 0);

        return {
          label,
          value,
          textColor: 'white--text',
          icon: this.getIcon(label),
          iconColor: 'white'
        }
      });
    },

    skills() {
      return [
        ...this.advancedSkills,
        ...this.basicSkills,
        {
          label: 'Cost',
          value: this.totalCost,
          textColor: 'white--text',
          icon: this.getIcon('Cost'),
          iconColor: 'white'
        }
      ];
    },

    skillRows() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return [
          this.skills.slice(0, 8),
          this.skills.slice(8)
        ];
      }

      return [ this.skills ];
    },

    totalCost() {
      return this.getSkillTotal((card) => card.costInt);
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
      if (value === 0) {
        this.showSelected = false;
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeoutId);
  },

  methods: {
    getTextColor(value) {
      if (value >= 7) {
        return 'light-blue--text text--accent-2';
      } else if (value >= 4) {
        return 'green--text text--accent-2';
      } else if (value === 3) {
        return 'orange--text text--accent-2';
      } else if (value === 2) {
        return 'red--text text--accent-2';
      } else {
        return 'grey--text text--lighten-1';
      }
    },

    getIconColor(value) {
      if (value >= 7) {
        return 'light-blue accent-2';
      } else if (value >= 4) {
        return 'green accent-2';
      } else if (value === 3) {
        return 'orange accent-2';
      } else if (value === 2) {
        return 'red accent-2';
      } else {
        return 'grey lighten-1';
      }
    },

    getIcon(value) {
      return {
        'Alien Investigation': 'mdi-alien-outline',
        'Behavioral': 'mdi-head-cog-outline',
        'Bureaucracy': 'mdi-bank',
        'Computer': 'mdi-desktop-classic',
        'Criminal Investigation': 'mdi-account-search',
        'Evidence Collection': 'mdi-archive-search-outline',
        'Medical': 'mdi-hospital-box-outline',
        'Occult Investigation': 'mdi-pentagram',
        'Observation': 'mdi-cctv',
        'Sciences': 'mdi-flask-outline',
        'Subterfuge': 'mdi-incognito',
        'Long Range Combat': 'mdi-pistol',
        'Close Range Combat': 'mdi-knife-military',
        'Health': 'mdi-heart-pulse',
        'Resources': 'mdi-dice-d20',
        'Cost': 'mdi-police-badge'
      }[value] ?? null;
    },

    getSkillTotal(fn) {
      return this.ids.reduce((total, id) => {
        const card = this.availableAgents.find((card) => card.id === id);

        if (!card) {
          return total;
        }

        return total + fn(card);
      }, 0);
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
