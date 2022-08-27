<template>
  <v-chip-group
    v-model="selected"
    show-arrows
    active-class="primary black--text"
  >
    <v-chip
      v-for="(preset, label) in presets"
      :key="label"
      :value="preset.join(',')"
      close
      @click="internalValue = [ ...preset ]"
      @click:close="remove(label)"
    >
      {{ label }}
    </v-chip>
  </v-chip-group>
</template>


<script>
import { arrayValue } from '~/mixins/model'

export default {
  name: 'AgentPresets',

  mixins: [
    arrayValue
  ],

  data() {
    return {
      selected: this.$route.query.selected ?? ''
    };
  },

  computed: {
    presets() {
      return this.$store.state.agentSelector.presents;
    }
  },

  watch: {
    '$route.query.selected'(value) {
      this.selected = value;
    }
  },

  methods: {
    remove(key) {
      if (!confirm('Are you sure you want to delete this preset?')) {
        return;
      }

      this.$store.commit('agentSelector/removePreset', key);
    }
  }
}
</script>
