<template>
  <v-chip-group
    v-model="ids"
    :mandatory="mandatory"
    show-arrows
    active-class="primary black--text"
  >
    <v-chip
      v-for="(preset, label) in presets"
      :key="label"
      :value="preset.join(',')"
      close
      @click="click(preset)"
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
      ids: this.$route.query.ids ?? ''
    };
  },

  computed: {
    presets() {
      return this.$store.state.agentSelector.presents;
    },

    mandatory() {
      return !!Object.values(this.presets).find((value) => value.join(',') === this.ids);
    }
  },

  watch: {
    '$route.query.ids'(value) {
      this.ids = value;
    }
  },

  methods: {
    remove(key) {
      if (!confirm('Are you sure you want to delete this preset?')) {
        return;
      }

      this.$store.commit('agentSelector/removePreset', key);
    },

    click(preset) {
      this.internalValue = [ ...preset ];

      this.$emit('click');
    }
  }
}
</script>
