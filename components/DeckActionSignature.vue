<template>
  <v-btn
    :disabled="disabled"
    :small="small"
    icon
    title="Copy deck url to clipboard"
    @click.prevent="copyToClipboard"
  >
    <v-icon :small="small">
      mdi-link-variant
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DeckActionSignature',

  props: {
    small: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    disabled() {
      return this.$store.getters['deckBuilding/deckSize'] === 0;
    }
  },

  methods: {
    createSignature() {
      const data = JSON.stringify(this.$store.state.deckBuilding.deck);

      return encodeURIComponent(Buffer.from(data).toString('base64'));
    },

    async copyToClipboard() {
      this.$store.commit('snackbar/setVisible', false);

      try {
        const route = this.$router.resolve({
          query: {
            signature: this.createSignature()
          }
        });

        const { href } = new URL(route.href, location.origin);

        await navigator.clipboard.writeText(href);

        this.$store.commit('snackbar/setSuccess', 'Copied to clipboard.');
      } catch (error) {
        console.error(error.message);

        this.$store.commit('snackbar/setError', 'Failed to copy to clipboard.');
      }
    }
  }
}
</script>
