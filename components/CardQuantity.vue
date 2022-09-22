<template>
  <v-badge
    :value="quantity > 0"
    :content="quantity"
    color="red"
  >
    <slot />
  </v-badge>
</template>

<script>
export default {
  name: 'CardQuantity',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    quantity() {
      return this.$store.getters['deckBuilding/quantityById'](this.id);
    }
  }
}
</script>
