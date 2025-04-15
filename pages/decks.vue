<template>
  <layout-default>
    <div class="d-flex justify-end align-center mb-3">
      <v-btn
        small
        depressed
        @click="upload"
      >
        Upload
      </v-btn>
      <deck-upload-tooltip />
    </div>
    <v-row v-if="decks.length > 0">
      <v-slide-x-reverse-transition
        group
        class="d-flex flex-wrap flex-fill"
      >
        <v-col
          v-for="deck in decks"
          :key="deck.name"
          cols="12"
          sm="4"
          md="3"
          class="d-flex flex-column"
        >
          <v-card
            :disabled="deck.size === 0"
            class="d-flex flex-column flex-fill"
          >
            <v-card-text class="flex-fill">
              {{ deck.name }} ({{ deck.size }})
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <deck-action-save
                :deck="deck"
                small
              />
              <deck-action-stats
                :deck="deck"
                small
                content-class="ml-2"
              />
              <deck-action-card-draw
                :deck="deck"
                small
                content-class="ml-2"
              />
              <v-btn
                icon
                small
                title="Open in Cards"
                @click="load(deck)"
              >
                <v-icon small>
                  mdi-upload
                </v-icon>
              </v-btn>
              <v-speed-dial
                direction="bottom"
                transition="slide-y-transition"
              >
                <template #activator>
                  <v-btn
                    icon
                    small
                    title="Download"
                  >
                    <v-icon small>
                      mdi-download
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn
                  icon
                  small
                  title="JSON"
                  @click="downloadJSON(deck)"
                >
                  <v-icon small>
                    mdi-code-json
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  small
                  title="CSV"
                  @click="downloadCSV(deck)"
                >
                  <v-icon small>
                    mdi-file-document
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  small
                  title="Tabletop Simulator (coming soon)"
                >
                  <v-icon small>
                    mdi-chess-queen
                  </v-icon>
                </v-btn>
              </v-speed-dial>
              <v-btn
                icon
                small
                title="Remove"
                @click="remove(deck)"
              >
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-slide-x-reverse-transition>
    </v-row>
    <p v-else>
      You have not built any decks yet.
      <nuxt-link
        to="/cards"
        v-text="'Click here'"
      /> to start building your first deck or use the upload button above.
    </p>
  </layout-default>
</template>

<script>
import { pool } from '~/config/cards';
import { download } from '~/mixins/download';
import { sortBy } from '~/assets/sort-by';

export default {
  name: 'PageDecks',

  mixins: [
    download
  ],

  head: () => ({
    title: 'Decks'
  }),

  computed: {
    decks() {
      return Object.entries(this.$store.state.deckBuilding.decks)
        .map(([
          name,
          cards = {}
        ]) => ({
          name,
          cards,
          size: Object.values(cards).reduce((total, quantity) => total + quantity, 0)
        }))
        .sort(sortBy('name'));
    }
  },

  methods: {
    load(deck) {
      if (
        this.$store.getters['deckBuilding/deckSize'] > 0
        && !confirm('It looks like another deck has already been opened. Do you want to continue?\n\nAny unsaved changes will be lost.')
      ) {
        return;
      }

      this.$store.commit('deckBuilding/loadDeck', deck.name);
      this.$store.commit('snackbar/setSuccess', 'Deck opened successfully!');
      this.$router.push('/cards?showSelected');
    },

    downloadJSON(deck) {
      const data = Buffer.from(
        JSON.stringify({
          name: deck.name,
          cards: deck.cards
        })
      ).toString('base64');

      this.download(`data:application/json;base64,${data}`, `${deck.name}.json`);
    },

    downloadCSV(deck) {
      const data = Buffer.from(
        [
          '"#","Set","Title","Type","Quantity"',
          ...Object.entries(deck.cards)
            .map(([
              id,
              quantity
            ]) => {
              const {
                set,
                title,
                type
              } = pool.find((card) => card.id === id);

              return {
                id,
                set,
                title,
                type,
                quantity
              };
            })
            .sort(sortBy('type', 'id'))
            .map(({
              id,
              set,
              title,
              type,
              quantity
            }) => `"${id}","${set}","${title}","${type}","${quantity}"`)
        ].join('\n')
      ).toString('base64');

      this.download(`data:text/csv;base64,${data}`, `${deck.name}.csv`);
    },

    remove(deck) {
      if (!confirm('Are you sure you want to remove this deck?')) {
        return;
      }

      this.$store.commit('deckBuilding/removeDeck', deck.name);
      this.$store.commit('snackbar/setSuccess', 'Deck removed successfully!');
    },

    upload() {
      this.$store.commit('snackbar/setVisible', false);

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.multiple = true;
      input.onchange = async (event) => {
        for (const file of event.target.files) {
          try {
            const data = await this.readFile(file);
            const deck = JSON.parse(data);

            if (
              this.$store.getters['deckBuilding/hasName'](deck.name)
              && !confirm(`A deck with name '${deck.name}' already exists. Do you want to overwrite it?`)
            ) {
              continue;
            }

            this.$store.commit('deckBuilding/uploadDeck', deck);
          } catch (error) {
            console.error(error.message);

            this.$store.commit('snackbar/setError', 'An error occurred while uploading one or more of your decks.');
          }
        }
      };
      input.click();
    },

    /**
     * Read file
     *
     * @param {File} file
     *
     * @returns {Promise<string>}
     */
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    }
  }
}
</script>
