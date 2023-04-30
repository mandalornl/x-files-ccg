<template>
  <v-btn
    :disabled="disabled"
    :small="small"
    icon
    title="Clear"
    @click.prevent="clear"
  >
    <v-icon :small="small">
      mdi-close-circle
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DeckActionClear',

  props: {
    small: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    disabled() {
      return this.$store.getters['deckBuilding/sizeByName']() === 0;
    }
  },

  methods: {
    clear() {
      if (!confirm('Are you sure you want to clear the selected cards?')) {
        return;
      }

      this.$store.dispatch('deckBuilding/clear');
      this.$store.commit('snackbar/setSuccess', 'Cards cleared successfully!');
    }
  }
}
</script>
