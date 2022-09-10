<template>
  <layout-default>
    <v-row>
      <v-col
        sm="4"
        md="3"
      >
        <div
          :style="`top:${$vuetify.application.top}px`"
          class="position-sticky"
        >
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
        </div>
      </v-col>
      <v-col
        sm="8"
        md="9"
      >
        <v-data-table
          v-intersect="{
            handler: onIntersect,
            options: {
              rootMargin: `-${$vuetify.application.top}px 0px 0px`
            }
          }"
          :headers="headers"
          :items="cards"
          :page.sync="options.page"
          :items-per-page.sync="options.itemsPerPage"
          :footer-props="footerProps"
          :sort-by.sync="options.sortBy"
          :sort-desc.sync="options.sortDesc"
          mobile-breakpoint="0"
          @click:row="selectedCard = $event"
        />
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
                @click="selectedCard = cards[cardIndex - 1]"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                :disabled="cardIndex === -1 || cardIndex === cards.length - 1"
                icon
                title="Next"
                @click="selectedCard = cards[cardIndex + 1]"
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
import { Intersect } from 'vuetify/lib/directives';

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

  directives: {
    Intersect
  },

  data() {
    return {
      headers: [
        { text: '#', value: 'id', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Set', value: 'set' },
        { text: 'Title', value: 'title' },
        { text: 'Type', value: 'type' },
        { text: 'Rarity', value: 'rarity' }
      ],
      search: this.$route.query.q ?? '',
      options: {
        page: Number(this.$route.query.page ?? 1),
        itemsPerPage: Number(this.$route.query.itemsPerPage ?? 25),
        sortBy: this.$route.query.sortBy,
        sortDesc: {
          'true': true,
          'false': false
        }[this.$route.query.sortDesc]
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
            items: sets,
            operation: 'and'
          },
          type: {
            label: 'Type',
            items: types,
            operation: 'and'
          },
          keywords: {
            label: 'Keywords',
            items: keywords,
            operation: 'and'
          },
          activators: {
            label: 'Activators',
            items: activators,
            operation: 'and'
          },
          rarity: {
            label: 'Rarity',
            items: rarities,
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
                .filter(Boolean),
              operation: and ? 'and' : operation
            }
          ];
        })
      ),
      drawer: false,
      selectedCard: null,
      panels: [ 0 ],
      timeoutId: null,
      intersecting: true
    };
  },

  head: () => ({
    title: 'Card List'
  }),

  computed: {
    cards() {
      const search = this.search?.toLocaleLowerCase?.();

      return cards.filter((card) => {
        if (search) {
          const hit = [
            card.id,
            card.title,
            card.gameText
          ].filter(Boolean).some((value) => (
            value.toLocaleLowerCase().includes(search)
          ));

          if (!hit) {
            return false;
          }
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
      }).map((card) => ({
        ...card,
        image: `images/${card.set.replaceAll(' ', '-')}/${card.id}.jpg`.toLowerCase()
      }));
    },

    routeQuery() {
      const {
        page,
        itemsPerPage,
        sortBy
      } = this.options;

      return {
        id: this.selectedCard?.id,
        q: this.search || undefined,
        page: page > 1 ? page : undefined,
        itemsPerPage: itemsPerPage !== 25 ? itemsPerPage : undefined,
        sortBy: typeof sortBy === 'string' ? sortBy : undefined,
        sortDesc: this.options.sortDesc,
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
        }).filter(([ key ]) => !!this.selectedCard?.[key])
      );
    },

    cardIndex() {
      return this.cards.findIndex(({ id }) => id === this.selectedCard?.id);
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
    this.selectedCard = this.cards.find(({ id }) => id === this.$route.query.id);

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
