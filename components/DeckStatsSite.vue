<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th>{{ title }}</th>
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
  </v-simple-table>
</template>

<script>
export default {
  name: 'DeckStatsSite',

  props: {
    title: {
      type: String,
      default: undefined
    },
    cards: {
      type: Array,
      default: () => ([])
    },
    keywords: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
    stats() {
      const stats = this.cards
        .filter(({ type }) => type === 'Site')
        .reduce((result, {
          quantity,
          keywords
        }) => {
          this.keywords.forEach((keyword) => {
            if (keywords.includes(keyword)) {
              result[keyword] = (result[keyword] ?? 0) + quantity;
            }
          });

          return result;
        }, {});

      const collator = new Intl.Collator('en', {
        sensitivity: 'base'
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

<style lang="scss" scoped>
table td:last-child {
  width: 0;

  white-space: nowrap;
}
</style>
