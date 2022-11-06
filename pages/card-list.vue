<template>
  <layout-default fluid>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
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
              @click:prepend-inner="onSearch"
              @keyup.enter.exact="search = $event.target.value"
            />
          </v-card-text>
        </v-card>
        <div class="d-flex flex-sm-column flex-lg-row align-center align-sm-start align-lg-center">
          <v-switch
            v-model="showDeck"
            :disabled="deckSize === 0"
          >
            <template #label>
              <v-badge
                :value="deckSize > 0"
                color="primary"
              >
                <template #badge>
                  <span class="black--text">
                    {{ deckSize }}
                  </span>
                </template>
                Cards in deck
              </v-badge>
            </template>
          </v-switch>
          <v-spacer class="hidden-sm-only hidden-md-only" />
          <div class="d-flex align-center mb-sm-4 mb-lg-0">
            <deck-action-save small />
            <deck-action-stats
              :deck="$store.getters['deckBuilding/defaultDeck']"
              small
              content-class="ml-1"
            />
            <deck-action-card-draw
              :deck="$store.getters['deckBuilding/defaultDeck']"
              small
              content-class="ml-1"
            />
            <deck-action-clear
              small
              class="ml-1"
            />
          </div>
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
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
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
          :items="items"
          :page.sync="page"
          :items-per-page.sync="itemsPerPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :footer-props="footerProps"
          :server-items-length="cards.length"
          mobile-breakpoint="0"
          @click:row="selectedCard = $event"
        >
          <template #[`item.id`]="{ value }">
            <card-quantity :id="value">
              {{ value }}
            </card-quantity>
          </template>
          <template #[`item.type`]="{ value }">
            <card-type-chip :value="value" />
          </template>
        </v-data-table>
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
    <card-info
      v-model="cardInfoVisible"
      :card="selectedCard"
      :card-index="selectedCardIndex"
      :cards-length="cards.length"
      @click:index="selectedCard = cards[$event]"
      @click:filter="updateFilterValue"
    />
  </layout-default>
</template>

<script>
import { Intersect } from 'vuetify/lib/directives';

import {
  cards,
  sets,
  types,
  activators,
  keywords,
  rarities,
  tags
} from '~/config/card';

export default {
  name: 'PageCardList',

  directives: {
    Intersect
  },

  data() {
    const filters = Object.fromEntries(
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
        },
        tags: {
          label: 'Tags',
          items: tags,
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
    );

    const itemsPerPage = this.$vuetify.breakpoint.xsOnly ? 25 : 50;

    return {
      filters,
      headers: [
        { text: '#', value: 'id', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Set', value: 'set', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Title', value: 'title', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Type', value: 'type', class: 'text-no-wrap', cellClass: 'text-no-wrap' },
        { text: 'Rarity', value: 'rarity', class: 'text-no-wrap', cellClass: 'text-no-wrap' }
      ],
      search: this.$route.query.q ?? '',
      page: Number(this.$route.query.page ?? 1),
      itemsPerPage: Number(this.$route.query.itemsPerPage ?? itemsPerPage),
      sortBy: this.$route.query.sortBy,
      sortDesc: {
        'true': true,
        'false': false
      }[this.$route.query.sortDesc],
      footerProps: {
        itemsPerPageOptions: [
          25,
          50,
          100,
          -1
        ],
        showFirstLastPage: true
      },
      cardInfoVisible: false,
      selectedCard: null,
      panels: this.$vuetify.breakpoint.xsOnly ? [] : [ 0, 1, 2 ],
      timeoutId: null,
      intersecting: true,
      showDeck: this.$route.query.showDeck === null
    };
  },

  head: () => ({
    title: 'Card List'
  }),

  computed: {
    items() {
      if (this.itemsPerPage > 0) {
        return this.cards.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
      }

      return this.cards;
    },

    cards() {
      const search = this.search?.toLocaleLowerCase?.();

      const hits = cards.filter((card) => {
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

        if (this.showDeck && this.$store.getters['deckBuilding/quantityByCardId'](card.id) === 0) {
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
      });

      if (this.sortBy) {
        const collator = new Intl.Collator('en', {
          sensitivity: 'base',
          numeric: true
        });

        return hits.sort((a, b) => {
          const valueA = a[this.sortBy];
          const valueB = b[this.sortBy];

          if (this.sortDesc) {
            return collator.compare(valueB, valueA);
          }

          return collator.compare(valueA, valueB);
        });
      }

      if (this.sortDesc) {
        return hits.reverse();
      }

      return hits;
    },

    routeQuery() {
      const itemsPerPage = this.$vuetify.breakpoint.xsOnly ? 25 : 50;

      return {
        id: this.selectedCard?.id,
        q: this.search || undefined,
        page: this.page > 1 ? this.page : undefined,
        itemsPerPage: this.itemsPerPage !== itemsPerPage ? this.itemsPerPage : undefined,
        sortBy: typeof this.sortBy === 'string' ? this.sortBy : undefined,
        sortDesc: this.sortDesc,
        showDeck: this.showDeck ? null : undefined,
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

    selectedCardIndex() {
      return this.cards.findIndex(({ id }) => id === this.selectedCard?.id);
    },

    hasAnyFilters() {
      return Object.values(this.filters).some(({ value }) => value.length > 0);
    },

    deckSize() {
      return this.$store.getters['deckBuilding/sizeByName']();
    }
  },

  watch: {
    search() {
      this.page = 1;
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
      });
    },

    cardInfoVisible(value) {
      if (!value) {
        this.selectedCard = null;
      }
    },

    selectedCard(value) {
      this.cardInfoVisible = !!value;
    },

    selectedCardIndex(value) {
      if (value !== -1) {
        this.page = Math.floor(value / this.itemsPerPage) + 1;
      }
    },

    deckSize(value) {
      if (value === 0) {
        this.showDeck = false;
      }
    },

    showDeck() {
      this.search = '';

      this.clearAllFilters();
    }
  },

  mounted() {
    this.selectedCard = this.cards.find(({ id }) => id === this.$route.query.id);

    Object.keys(this.filters).forEach((key) => {
      this.$watch(`filters.${key}.value`, () => {
        this.page = 1;
      });
    });
  },

  beforeDestroy () {
    clearTimeout(this.timeoutId);
  },

  methods: {
    updateFilterValue({
      key,
      value
    }) {
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
    },

    onSearch(event) {
      const input = event.target.closest('.v-input').querySelector('input');

      this.search = input?.value ?? '';
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
