<template>
  <v-tooltip
    top
    color="primary"
    open-delay="150"
    max-width="280"
    content-class="black--text"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        :class="contentClass"
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        {{ card.active ? 'mdi-alien' : 'mdi-alien-outline' }}
      </v-icon>
    </template>
    <h3>{{ card.title }}</h3>
    <table>
      <tbody>
        <tr
          v-for="(item, label) in skills"
          :key="label"
          :class="{ 'font-weight-medium text-decoration-underline': item.highlight }"
        >
          <td>{{ label }}</td>
          <td>{{ item.value }}</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>{{ cost }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-3">
      <b>Game Effect</b><br><em>{{ card.gameEffect }}</em>
    </div>
  </v-tooltip>
</template>

<script>
export default {
  name: 'AgentTooltip',

  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    filters: {
      type: Object,
      default: () => ({})
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: undefined
    }
  },

  computed: {
    skills() {
      return Object.fromEntries(
        Object.entries(this.card.skills ?? {}).map(([
          key,
          value
        ]) => ([
          key,
          {
            value,
            highlight: this.filters.advancedSkills.value.includes(key)
          }
        ]))
      );
    },

    cost() {
      return parseInt(this.card.cost, 10);
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  td {
    padding: 0 8px;

    vertical-align: top;

    &:first-child {
      white-space: nowrap;

      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
