<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :disabled="internalValue.length === 0"
        icon
        small
        title="Save"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small>
          mdi-floppy
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="add"
        >
          <v-text-field
            v-model.trim="name"
            :rules="[
              (v) => !!v || 'Enter a name',
              () => internalValue.length > 0 || 'Select at least one agent'
            ]"
            autofocus
            counter="40"
            maxlength="40"
            label="Name"
          />
        </v-form>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { arrayValue } from '~/mixins/model'

export default {
  name: 'AgentSavePreset',

  mixins: [
    arrayValue
  ],

  data: () => ({
    menu: false,
    name: null
  }),

  watch: {
    menu(value) {
      if (!value) {
        this.$refs.form.reset();
      }
    }
  },

  methods: {
    add() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.commit('agentSelector/addPreset', {
        key: this.name,
        value: [ ...this.internalValue ].sort((a, b) => a - b)
      });

      this.menu = false;
    }
  }
}
</script>
