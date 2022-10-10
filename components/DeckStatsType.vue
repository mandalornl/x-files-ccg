<template>
  <v-sparkline
    :labels="labels"
    :value="values"
    auto-line-width
    type="bar"
    color="grey lighten-1"
    padding="20"
    label-size="4"
  />
</template>

<script>
export default {
  name: 'DeckStatsType',

  props: {
    cards: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
    stats() {
      return [
        'Adversary',
        'Agent',
        'Bluff',
        'Combat',
        'Equipment',
        'Event',
        'Site',
        'Witness'
      ].reduce((result, type) => ({
        ...result,
        [type]: this.cards
          .filter((card) => card.type === type)
          .reduce((total, { quantity }) => total + quantity, 0)
      }), {});
    },

    labels() {
      return Object.entries(this.stats).map(([
        label,
        count
      ]) => `${label} (${count})`);
    },

    values() {
      return Object.values(this.stats);
    }
  }
}
</script>
