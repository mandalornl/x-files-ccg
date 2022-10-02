<template>
  <layout-default>
    <v-row>
      <v-col cols="12">
        <agent-presets v-model="selected" />
      </v-col>
      <v-col
        cols="5"
        sm="8"
        md="9"
      >
        <v-item-group
          v-model="selected"
          multiple
        >
          <v-row>
            <v-col
              v-for="agent in computedAgents"
              :key="agent.name"
              cols="12"
              sm="4"
              md="3"
            >
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :disabled="agent.disabled"
                  :color="active ? 'primary' : undefined"
                  flat
                  outlined
                  @click="toggle"
                >
                  <card-img :card="agent">
                    <agent-tooltip
                      :active="active"
                      :agent="agent"
                    />
                  </card-img>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-col>
      <v-col
        cols="7"
        sm="4"
        md="3"
      >
        <v-card
          :style="`top:${$vuetify.application.top}px`"
          flat
          class="position-sticky"
        >
          <v-card-title>
            Stats
            <v-spacer />
            <agent-save-preset v-model="selected" />
            <v-btn
              :disabled="selected.length === 0"
              icon
              small
              title="Clear"
              class="ml-2"
              @click="selected = []"
            >
              <v-icon small>
                mdi-close-circle
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-simple-table dense>
            <template #default>
              <tbody>
                <tr
                  v-for="(skill, key) in skills"
                  :key="key"
                  :class="skill.class"
                >
                  <td>{{ skill.label }}</td>
                  <td>{{ skill.value }}</td>
                </tr>
                <tr
                  v-for="(stat, key) in stats"
                  :key="key"
                >
                  <td>{{ stat.label }}</td>
                  <td>{{ stat.value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </layout-default>
</template>

<script>
import {
  skills,
  stats,
  agents
} from '~/config/agent'

export default {
  name: 'PageAgentSelector',

  data() {
    return {
      agents,
      selected: (this.$route.query.selected ?? '')
        .split(',')
        .filter(Boolean)
        .map(Number),
      // presets: {
      //   Speed: [ 8, 11, 17 ],
      //   Adventure: [ 1, 9, 21, 23, 27 ],
      //   'Preset 1': [ 3, 22, 25, 12, 24 ],
      //   'Preset 2': [ 7, 9, 2, 24, 12 ]
      // }
    };
  },

  head: () => ({
    title: 'Agent Selector'
  }),

  computed: {
    computedAgents() {
      return this.agents.map((agent, index) => ({
        ...agent,
        disabled: agent.cost > this.availableCost && !this.selected.includes(index)
      }));
    },

    skills() {
      const entries = Object.fromEntries(
        Object.entries(skills).map(([
          key,
          label
        ]) => ([
          key,
          {
            label,
            value: 0
          }
        ]))
      );

      const keys = Object.keys(entries);

      this.selected.forEach((index) => {
        keys.forEach((key) => {
          const value = entries[key].value + (this.agents[index][key] ?? 0);

          entries[key] = {
            ...entries[key],
            value,
            class: this.getClass(value)
          };
        });
      });

      return entries;
    },

    stats() {
      const entries = Object.fromEntries(
        Object.entries(stats).map(([
          key,
          label
        ]) => ([
          key,
          {
            label,
            value: 0
          }
        ]))
      );

      const keys = Object.keys(entries);

      this.selected.forEach((index) => {
        keys.forEach((key) => {
          entries[key].value += (this.agents[index][key] ?? 0);
        });
      });

      return entries;
    },

    availableCost() {
      return 20 - this.stats.cost.value;
    }
  },

  watch: {
    selected(values) {
      const selected = [ ...values ].sort((a, b) => a - b);

      const { route } = this.$router.resolve({
        query: {
          selected: selected.length > 0 ? selected.join(',') : undefined
        }
      });

      if (route.fullPath !== this.$route.fullPath) {
        this.$router.replace(route);
      }
    }
  },

  methods: {
    getClass(value) {
      if (value >= 7) {
        return 'cyan--text text--accent-2';
      } else if (value >= 4) {
        return 'primary--text';
      } else if (value === 3) {
        return 'amber--text text--lighten-2';
      } else if (value === 2) {
        return 'red--text text--accent-2';
      } else {
        return undefined;
      }
    }
  }
}
</script>
