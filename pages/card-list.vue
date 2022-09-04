<template>
  <layout-default>
    <v-row>
      <v-col
        sm="4"
        md="3"
      >
        <div :style="`position:sticky;top:${$vuetify.application.top}px`">
          <v-card
            flat
            class="mb-3"
          >
            <v-card-text>
              <v-text-field
                :value="search"
                clearable
                single-line
                hide-details
                type="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="mt-0 pt-0"
                @click:clear="search = ''"
                @keyup.enter.exact="search = $event.target.value"
              />
            </v-card-text>
          </v-card>
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
                <v-btn-toggle
                  v-if="filter.operator !== undefined"
                  v-model="filters[key].operator"
                  dense
                  mandatory
                  borderless
                >
                  <v-btn
                    small
                    depressed
                    value="and"
                  >
                    And
                  </v-btn>
                  <v-btn
                    small
                    depressed
                    value="or"
                  >
                    Or
                  </v-btn>
                </v-btn-toggle>
                <v-checkbox
                  v-for="(label, index) in filter.items.slice(0, 6)"
                  :key="label"
                  v-model="filters[key].value"
                  :value="label"
                  :label="label"
                  :hide-details="index !== filter.items.length - 1"
                  :class="filter.operator === undefined && index === 0 ? 'mt-0 pt-0' : undefined"
                  multiple
                />
                <template v-if="filter.expandable">
                  <v-expand-transition>
                    <div v-if="filter.expanded">
                      <v-checkbox
                        v-for="(label, index) in filter.items.slice(6)"
                        :key="label"
                        v-model="filters[key].value"
                        :value="label"
                        :label="label"
                        :hide-details="index !== filter.items.length - 1"
                        multiple
                      />
                    </div>
                  </v-expand-transition>
                  <v-switch
                    v-model="filters[key].expanded"
                    :label="filter.expanded ? 'Less' : 'More'"
                    dense
                  />
                </template>
                <v-btn
                  :disabled="filter.value.length === 0"
                  small
                  depressed
                  @click="filters[key].value = []"
                >
                  Clear
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
      <v-col
        sm="8"
        md="9"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="items"
          :page="options.page"
          :items-per-page="options.itemsPerPage"
          :footer-props="footerProps"
          :sort-by="options.sortBy"
          :sort-desc="options.sortDesc"
          :custom-filter="customFilter"
          mobile-breakpoint="0"
          @update:options="updateOptions"
          @click:row="selectedCard = $event"
        />
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="drawer"
      :width="$vuetify.breakpoint.smAndUp ? 512 : undefined"
      fixed
      temporary
      right
      disable-route-watcher
      mobile-breakpoint="0"
    >
      <div
        v-if="selectedCard"
        class="pa-3"
      >
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="order-sm-1"
          >
            <v-img
              :src="selectedCard.image"
              :alt="selectedCard.name"
              :aspect-ratio="750/1050"
              class="grey darken-3"
            />
            <div class="d-flex justify-space-between mt-1">
              <v-btn
                :disabled="cardIndex === -1 || cardIndex === 0"
                icon
                title="Previous"
                @click="selectedCard = items[cardIndex - 1]"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                :disabled="cardIndex === -1 || cardIndex === items.length - 1"
                icon
                title="Next"
                @click="selectedCard = items[cardIndex + 1]"
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
                {{ selectedCard.title }}
              </div>
              <div class="text-body-2 text--secondary">
                {{ selectedCard.id }}
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
                :value="selectedCard[key]"
                @click="updateFilterValue(key, $event)"
              />
            </div>
          </v-col>
        </v-row>
      </div>
    </v-navigation-drawer>
  </layout-default>
</template>

<script>
import cards from '~/config/cards.json';
import {
  sets,
  types,
  activators,
  keywords,
  rarities
} from '~/config/card';

export default {
  name: 'PageCardList',

  middleware({ store }) {
    store.commit('setTitle', 'Card List');
  },

  data() {
    return {
      headers: [
        { text: '#', value: 'id', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Set', value: 'set', filterable: false },
        { text: 'Title', value: 'title', filterable: false },
        { text: 'Type', value: 'type', filterable: false },
        { text: 'Rarity', value: 'rarity', filterable: false }
      ],
      search: this.$route.query.q ?? '',
      options: {
        page: Number(this.$route.query.page ?? 1),
        itemsPerPage: Number(this.$route.query.itemsPerPage ?? 25),
        sortBy: this.$route.query.sortBy ?? null,
        sortDesc: this.$route.query.sortDesc === 'true'
      },
      footerProps: {
        itemsPerPageOptions: [
          25,
          50,
          100,
          -1
        ],
        showFirstLastPage: true
      },
      filters: Object.fromEntries(
        Object.entries({
          set: {
            label: 'Set',
            items: sets
          },
          type: {
            label: 'Type',
            items: types
          },
          keywords: {
            label: 'Keywords',
            items: keywords,
            operator: 'or'
          },
          activators: {
            label: 'Activators',
            items: activators
          },
          rarity: {
            label: 'Rarity',
            items: rarities
          }
        }).map(([
          key,
          {
            operator,
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
                .filter(Boolean),
              operator: and ? 'and' : operator,
              expandable: filter.items.length > 6,
              expanded: false
            }
          ];
        })
      ),
      drawer: false,
      selectedCard: null,
      panels: [ 0 ],
      timeoutId: null
    };
  },

  head: () => ({
    title: 'Card List'
  }),

  computed: {
    items() {
      return cards.filter((card) => (
        Object.entries(this.filters).every(([
          key,
          {
            value,
            operator
          }
        ]) => {
          if (value.length === 0) {
            return true;
          }

          if (Array.isArray(card[key])) {
            if (operator === 'and') {
              return value.every((value) => card[key].includes(value));
            }

            return value.some((value) => card[key].includes(value));
          }

          return value.includes(card[key]);
        })
      )).map((card) => ({
        ...card,
        image: `/images/${card.set.replaceAll(' ', '-')}/${card.id}.jpg`.toLowerCase()
      }));
    },

    routeQuery() {
      return {
        q: this.search || undefined,
        id: this.selectedCard?.id,
        ...this.options,
        ...Object.fromEntries(
          Object.entries(this.filters).map(([
            key,
            {
              value,
              operator
            }
          ]) => ([
            key,
            value.length > 0 ? value.join(operator === 'and' ? '+' : ',') : undefined
          ]))
        )
      };
    },

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
          activators: {
            label: 'Activators',
            type: 'Array'
          },
          keywords: {
            label: 'Keywords',
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
        }).filter(([ key ]) => !!this.selectedCard?.[key])
      );
    },

    cardIndex() {
      return this.items.findIndex(({ id }) => id === this.selectedCard?.id);
    },

    hasAnyFilters() {
      return Object.values(this.filters).some(({ value }) => value.length > 0);
    }
  },

  watch: {
    search() {
      this.$set(this.options, 'page', 1);
    },

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
      }, 0);
    },

    drawer(value) {
      if (!value) {
        this.selectedCard = null;
      }
    },

    selectedCard(value) {
      this.drawer = !!value;
    },

    cardIndex(value) {
      this.$set(this.options, 'page', Math.floor(value / this.options.itemsPerPage) + 1);
    }
  },

  mounted() {
    this.selectedCard = this.items.find(({ id }) => id === this.$route.query.id);

    Object.keys(this.filters).forEach((key) => {
      this.$watch(`filters.${key}.value`, () => {
        this.$set(this.options, 'page', 1);
      });
    });
  },

  beforeDestroy () {
    clearTimeout(this.timeoutId);
  },

  methods: {
    updateOptions({
      page,
      itemsPerPage,
      sortBy,
      sortDesc
    }) {
      this.options = {
        page,
        itemsPerPage,
        sortBy,
        sortDesc
      };
    },

    updateFilterValue(key, value) {
      this.search = '';
      this.selectedCard = null;

      this.filters = Object.fromEntries(
        Object.entries(this.filters).map(([
          filterKey,
          filter
        ]) => ([
          filterKey,
          {
            ...filter,
            value: filterKey === key ? [ value ] : []
          }
        ]))
      );
    },

    customFilter: (value, search, item) => ([
      value,
      item.title,
      item.gameText
    ].filter(Boolean).some((value) => (
      value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    ))),

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
    }
  }
}
</script>
