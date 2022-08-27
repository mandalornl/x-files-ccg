<template>
  <div class="black--text">
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
  </div>
</template>

<script>
import {
  skills,
  stats
} from '~/config/agent'

export default {
  name: 'AgentGameText',

  props: {
    agent: {
      type: Object,
      default: () => ({})
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
