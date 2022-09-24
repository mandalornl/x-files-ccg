<template>
  <v-badge
    :value="size > 0"
    :content="size > 60 ? '60+' : size"
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
    size() {
      return this.$store.getters['deckBuilding/totalSize'];
    }
  }
}
</script>
