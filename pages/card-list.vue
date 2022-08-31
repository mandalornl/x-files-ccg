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
                <v-checkbox
                  v-for="(label, index) in filter.items"
                  :key="label"
                  v-model="filters[key].value"
                  :value="label"
                  :label="label"
                  :hide-details="index !== filter.items.length - 1"
                  :class="index === 0 ? 'mt-0 pt-0' : undefined"
                  multiple
                />
                <v-btn
                  :disabled="filter.value.length === 0"
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
          mobile-breakpoint="0"
          @update:options="updateOptions"
          @click:row="selectCard"
        />
      </v-col>
    </v-row>
    <v-navigation-drawer
      v-model="drawer"
      :width="$vuetify.breakpoint.smAndUp ? 512 : undefined"
      fixed
      temporary
      right
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
        { text: 'Title', value: 'title' },
        { text: 'Type', value: 'type', filterable: false },
        { text: 'Rarity', value: 'rarity', filterable: false }
      ],
      search: this.$route.query.q ?? '',
      options: {
        page: Number(this.$route.query.page ?? 1),
        itemsPerPage: Number(this.$route.query.itemsPerPage ?? 10),
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
      filters: {
        set: {
          label: 'Set',
          value: this.getRouteQueryFilterValue('set'),
          items: sets
        },
        type: {
          label: 'Type',
          value: this.getRouteQueryFilterValue('type'),
          items: types
        },
        activators: {
          label: 'Activators',
          value: this.getRouteQueryFilterValue('activators'),
          items: activators
        },
        keywords: {
          label: 'Keywords',
          value: this.getRouteQueryFilterValue('keywords'),
          items: keywords
        },
        rarity: {
          label: 'Rarity',
          value: this.getRouteQueryFilterValue('rarity'),
          items: rarities
        }
      },
      drawer: false,
      selectedCard: null,
      panels: [ 0 ]
    };
  },

  head: () => ({
    title: 'Cards'
  }),

  computed: {
    items() {
      return cards.filter((card) => (
        Object.entries(this.filters).every(([
          key,
          { value }
        ]) => {
          if (value.length === 0) {
            return true;
          }

          if (Array.isArray(card[key])) {
            return value.some((str) => card[key].includes(str));
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
        ...this.options,
        ...Object.fromEntries(
          Object.entries(this.filters).map(([
            key,
            { value }
          ]) => ([
            key,
            value.length > 0 ? value.join(',') : undefined
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
    }
  },

  watch: {
    search() {
      this.$set(this.options, 'page', 1);
    },

    routeQuery(value) {
      const { href } = this.$router.resolve({
        query: {
          ...this.$route.query,
          ...value
        }
      });

      if (href !== this.$route.fullPath) {
        this.$router.replace(href);
      }
    },

    drawer(value) {
      if (!value) {
        this.selectedCard = null;
      }
    }
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

    getRouteQueryFilterValue(key) {
      return (this.$route.query[key] ?? '')
        .split(',')
        .filter(Boolean);
    },

    selectCard(item) {
      this.selectedCard = item;
      this.drawer = true;
    },

    updateFilterValue(key, value) {
      this.search = '';
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
    }
  }
}
</script>
