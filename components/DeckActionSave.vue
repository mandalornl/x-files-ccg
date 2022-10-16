<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :title="isNew ? 'Save' : 'Rename'"
        :disabled="disabled"
        :small="small"
        :class="contentClass"
        icon
        v-bind="attrs"
        @click.prevent="on.click"
      >
        <v-icon :small="small">
          {{ isNew ? 'mdi-floppy' : 'mdi-pencil' }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="save"
        >
          <v-text-field
            v-model.trim="name"
            :rules="[ (v) => !!v || 'Enter a name' ]"
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
export default {
  name: 'DeckActionSave',

  props: {
    deck: {
      type: Object,
      default: () => ({})
    },
    small: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [ String, Array, Object ],
      default: undefined
    }
  },

  data: () => ({
    menu: false,
    name: null
  }),

  computed: {
    isNew() {
      return this.deck?.new ?? true;
    },

    disabled() {
      return this.isNew && this.$store.getters['deckBuilding/sizeByName']() === 0;
    }
  },

  watch: {
    menu(value) {
      if (!value) {
        this.$refs.form.reset();
      } else {
        if (!this.isNew) {
          this.name = this.deck.name;
        }
      }
    }
  },

  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (
        this.$store.getters['deckBuilding/hasName'](this.name)
        && !confirm('A deck with a similar name already exists. Overwrite anyways?')
      ) {
        return;
      }

      if (this.isNew) {
        this.$store.dispatch('deckBuilding/save', this.name);
        this.$store.commit('snackbar/setSuccess', 'Deck saved successfully!');
      } else {
        this.$store.commit('deckBuilding/rename', {
          from: this.deck.name,
          to: this.name
        });
        this.$store.commit('snackbar/setSuccess', 'Deck renamed successfully!');
      }

      this.menu = false;
    }
  }
}
</script>
