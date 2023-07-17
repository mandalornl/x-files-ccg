<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th>{{ type }} Cost</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in stats"
        :key="item.label"
      >
        <td>{{ item.label }}</td>
        <td>{{ item.count }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="font-weight-medium">
          Total
        </td>
        <td class="font-weight-medium">
          {{ total }}
        </td>
      </tr>
    </tfoot>
  </v-simple-table>
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
        'PP'
      ].includes(value)
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

      const collator = new Intl.Collator('en', {
        sensitivity: 'base',
        numeric: true
      });

      return Object.entries(stats)
        .sort(([
          labelA,
          countA
        ], [
          labelB,
          countB
        ]) => {
          if (countA === countB) {
            return collator.compare(labelA, labelB);
          }

          return countB - countA;
        })
      .map(([
        label,
        count
      ]) => ({
        label,
        count
      }));
    },

    total() {
      return Object.values(this.stats).reduce((total, { count }) => total + count, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
table td:last-child {
  width: 0;

  white-space: nowrap;
}
</style>
