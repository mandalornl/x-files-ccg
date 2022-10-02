<template>
  <v-badge
    :value="quantity > 0"
    color="primary"
  >
    <template #badge>
      <span class="black--text">
        {{ quantity }}
      </span>
    </template>
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
      return this.$store.getters['deckBuilding/quantityByCardId'](this.id);
    }
  }
}
</script>
