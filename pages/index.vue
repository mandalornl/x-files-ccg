<template>
  <layout-default>
    <h1 class="text-h4">
      Shutting down the X-Files
    </h1>
    <p>
      No worries! Head on over to
      <a
        href="https://mandalornl.github.io/xfccg"
        v-text="'https://mandalornl.github.io/xfccg'"
      />
      to go to the new website and make sure to update you bookmarks as well.
    </p>
    <template v-if="hasDecks">
      <p>It seems you still have some saved decks! Use the button below to download them as a zip file, so you can import them on the new website.</p>
      <v-btn
        :loading="downloading"
        depressed
        @click="downloadZip"
      >
        Download Decks
      </v-btn>
    </template>
    <p v-else>
      Looking for you saved decks? Just visit the old website on the device you made them on to download a zip file.
    </p>
  </layout-default>
</template>

<script>
import JSZip from 'jszip';

export default {
  name: 'PageIndex',

  data: () => ({
    downloading: false,
  }),

  computed: {
    decks: () => {
      try {
        const storage = JSON.parse(localStorage.getItem('x-files-ccg') ?? '{}');

        return storage?.deckBuilding?.decks ?? {};
      } catch {
        return {};
      }
    },

    hasDecks() {
      return Object.keys(this.decks).length > 0;
    },
  },

  methods: {
    async downloadZip() {
      this.downloading = true;

      try {
        const zip = new JSZip();
        const decks = Object.entries(this.decks);

        for (const [
          name,
          cards,
        ] of decks) {
          zip.file(`${name}.json`, JSON.stringify({
            name,
            cards,
          }));
        }

        const blob = await zip.generateAsync({
          type: 'blob',
        });

        const url = URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'decks.zip';
        anchor.click();

        URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);

        alert('An error occurred downloading your decks.');
      }

      setTimeout(() => {
        this.downloading = false;
      }, 200);
    },
  },
};
</script>
