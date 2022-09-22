<template>
  <v-badge
    :value="value > 0"
    :content="value"
    overlap
    color="red"
  >
    <slot />
  </v-badge>
</template>

<script>
export default {
  name: 'DeckSize',

  computed: {
    value() {
      const count = this.$store.getters['deckBuilding/totalQuantity'];

      return count > 60 ? '60+' : count;
    }
  }
}
</script>
