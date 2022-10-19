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
        >
          <v-card :to="deck.new ? '/card-list?showDeck' : undefined">
            <v-card-text>
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
              <template v-if="!deck.new">
                <v-btn
                  icon
                  small
                  title="Open in Card List"
                  @click="load(deck)"
                >
                  <v-icon small>
                    mdi-cards
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  small
                  title="Download"
                  @click="download(deck)"
                >
                  <v-icon small>
                    mdi-download
                  </v-icon>
                </v-btn>
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
              </template>
              <deck-action-clear
                v-else
                small
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-slide-x-reverse-transition>
    </v-row>
    <p v-else>
      You have not yet build any decks.
      <nuxt-link
        to="/card-list"
        v-text="'Click here'"
      /> to start building your first deck or use the upload button above.
    </p>
  </layout-default>
</template>

<script>
import { defaultDeckName } from '~/store/deckBuilding';

export default {
  name: 'PageDeckBuilding',

  head: () => ({
    title: 'Deck Building'
  }),

  computed: {
    decks() {
      const collator = new Intl.Collator(navigator.languages, {
        sensitivity: 'base',
        numeric: true
      });

      return Object.entries(this.$store.state.deckBuilding.decks)
        .map(([
          name,
          cards = {}
        ]) => ({
          name,
          new: name === defaultDeckName,
          size: Object.values(cards).reduce((total, quantity) => total + quantity, 0)
        }))
        .sort((a, b) => (
          b.new - a.new || collator.compare(a.name, b.name)
        ));
    }
  },

  methods: {
    load(deck) {
      if (
        this.$store.getters['deckBuilding/sizeByName']() > 0
        && !confirm('The current deck loaded is not empty. Load anyways?')
      ) {
        return;
      }

      this.$store.commit('deckBuilding/load', deck.name);
      this.$store.commit('snackbar/setSuccess', 'Deck loaded successfully!');
      this.$router.push('/card-list?showDeck');
    },

    download(deck) {
      const data = Buffer.from(
        JSON.stringify({
          name: deck.name,
          cards: this.$store.getters['deckBuilding/deckByName'](deck.name)
        })
      ).toString('base64');

      const anchor = document.createElement('a');
      anchor.download = `${deck.name}.json`;
      anchor.href = `data:application/json;base64,${data}`;
      anchor.click();
    },

    remove(deck) {
      if (!confirm('Are you sure you want to remove this deck?')) {
        return;
      }

      this.$store.commit('deckBuilding/remove', deck.name);
      this.$store.commit('snackbar/setSuccess', 'Deck removed successfully!');
    },

    upload() {
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
              && !confirm(`A deck with name '${deck.name}' already exists. Overwrite anyways?`)
            ) {
              continue;
            }

            this.$store.commit('deckBuilding/upload', deck);
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
      })
    }
  }
}
</script>
