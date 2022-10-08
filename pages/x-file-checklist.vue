<template>
  <layout-default>
    <div class="d-flex align-center mb-3">
      <v-spacer />
      <v-btn
        :disabled="snapshot.length === 0"
        small
        depressed
        class="mr-1"
        @click="undo"
      >
        Undo
      </v-btn>
      <v-btn
        small
        depressed
        @click="reset"
      >
        Reset
      </v-btn>
    </div>
    <v-simple-table>
      <tbody>
        <template v-for="(xFiles, groupIndex) in groups">
          <tr :key="groupIndex">
            <th>X-File ({{ totalLeft }} left)</th>
            <th>Affiliation</th>
            <th>Motive</th>
            <th>Method</th>
            <th>Result</th>
          </tr>
          <tr
            v-for="(characteristics, xFile) in xFiles"
            :key="`${groupIndex}-${xFile}`"
          >
            <td class="text-no-wrap">
              <v-lazy>
                <v-checkbox
                  v-model="selected"
                  :disabled="selected.includes(xFile)"
                  :value="xFile"
                  :label="xFile"
                  multiple
                  hide-details
                  class="mt-0 pt-0"
                >
                  <template #label>
                    <span :class="selected.includes(xFile) ? 'text-decoration-line-through' : color">
                      {{ xFile }}
                    </span>
                  </template>
                </v-checkbox>
              </v-lazy>
            </td>
            <td
              v-for="(characteristic, type) in characteristics"
              :key="`${groupIndex}-${xFile}-${type}`"
              class="text-no-wrap"
            >
              <v-lazy>
                <v-checkbox
                  v-model="selected"
                  :disabled="selected.includes(xFile)"
                  :value="characteristic"
                  :label="characteristic"
                  multiple
                  hide-details
                  class="mt-0 pt-0"
                  @change="toggleXFile(type, characteristic)"
                >
                  <template #label>
                    <span :class="selected.includes(xFile) ? 'text-decoration-line-through' : undefined">
                      {{ characteristic }}
                    </span>
                  </template>
                </v-checkbox>
              </v-lazy>
            </td>
          </tr>
        </template>
      </tbody>
    </v-simple-table>
  </layout-default>
</template>

<script>
import { xFiles } from '~/config/x-file';

export default {
  name: 'PageXFileChecklist',

  data: () => ({
    groups: xFiles
  }),

  head: () => ({
    title: 'X-File Checklist'
  }),

  computed: {
    selected: {
      get() {
        return this.$store.state.checklist.selected;
      },
      set(value) {
        this.$store.commit('checklist/setSelected', value);
      }
    },

    snapshot: {
      get() {
        return this.$store.state.checklist.snapshot;
      },
      set(value) {
        this.$store.commit('checklist/setSnapshot', value);
      }
    },

    totalLeft() {
      return xFiles.reduce((total, group) => (
        total + Object.keys(group).filter((xFile) => !this.selected.includes(xFile)).length
      ), 0);
    },

    color() {
      if (this.totalLeft <= 5) {
        return 'primary--text';
      } else if (this.totalLeft <= 10) {
        return 'amber--text text--lighten-2';
      } else {
        return undefined;
      }
    }
  },

  watch: {
    selected(value, oldValue) {
      this.snapshot = [ [ ...oldValue ] ];
    }
  },

  methods: {
    toggleXFile(type, characteristic) {
      const selected = [];

      xFiles.forEach((group) => {
        Object.entries(group).forEach(([
          xFile,
          characteristics
        ]) => {
          if (
            characteristics[type] === characteristic
            && !this.selected.includes(xFile)
          ) {
            selected.push(xFile);
          }
        });
      });

      this.selected = [
        ...this.selected,
        ...selected
      ];
    },

    undo() {
      this.selected = [ ...this.snapshot[0] ];
      this.$nextTick(() => {
        this.snapshot = [];
      });
    },

    reset() {
      this.selected = [];
      this.$nextTick(() => {
        this.snapshot = [];
      });
    }
  }
}
</script>
