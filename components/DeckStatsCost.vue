<template>
  <div>
    <div class="font-weight-medium">
      {{ type }}
    </div>
    <v-sparkline
      :labels="labels"
      :value="values"
      :color="color"
      line-width="1"
      padding="20"
      label-size="12"
    />
  </div>
</template>

<script>
export default {
  name: 'DeckStatsCost',

  props: {
    cards: {
      type: Array,
      default: () => ([])
    },
    type: {
      type: String,
      default: 'RP',
      validator: (value) => [
        'RP',
        'CP',
        '*P'
      ].includes(value)
    },
    color: {
      type: String,
      default: undefined
    }
  },

  computed: {
    stats() {
      const stats = this.cards
        .filter(({ cost }) => cost.endsWith(this.type))
        .reduce((result, {
          cost,
          quantity
        }) => {
          const value = cost.replace(` ${this.type}`, '');

          return {
            ...result,
            [value]: (result[value] ?? 0) + quantity
          };
        }, {});

      const keys = Object.keys(stats);

      if (keys.length === 0) {
        return {
          0: 0,
          '?': 0
        };
      }

      if (keys.length === 1) {
        stats['?'] = 0;
      }

      return stats;
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
