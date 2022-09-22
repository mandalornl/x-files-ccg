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
        {{ active ? 'mdi-alien' : 'mdi-alien-outline' }}
      </v-icon>
    </template>
    <h3>{{ agent.name }}</h3>
    <table>
      <tbody>
        <tr
          v-for="skill in skills"
          :key="skill.label"
        >
          <td>{{ skill.label }}</td>
          <td>{{ skill.value }}</td>
        </tr>
        <tr
          v-for="stat in stats"
          :key="stat.label"
        >
          <td>{{ stat.label }}</td>
          <td>{{ stat.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-3">
      <b>Game Effect</b><br><em>{{ agent.gameEffect }}</em>
    </div>
  </v-tooltip>
</template>

<script>
import {
  skills,
  stats
} from '~/config/agent';

export default {
  name: 'AgentTooltip',

  props: {
    agent: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: undefined
    }
  },

  computed: {
    skills() {
      return Object.entries(skills)
        .filter(([ key ]) => this.agent[key] !== undefined)
        .map(([
          key,
          label
        ]) => ({
          label,
          value: this.agent[key]
        }))
    },

    stats() {
      return Object.entries(stats).map(([
        key,
        label
      ]) => ({
        label,
        value: this.agent[key]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
table td {
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
</style>
