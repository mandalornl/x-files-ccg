<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    :timeout="10000"
    :multi-line="isMobile"
    :top="!isMobile"
    :width="isMobile ? 'calc(100% - 24px)' : undefined"
    app
    text
  >
    {{ $store.state.snackbar.message }}
    <template #action="{ attrs }">
      <v-btn
        :color="color"
        icon
        small
        title="Close"
        v-bind="attrs"
        @click="visible = false"
      >
        <v-icon small>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AdmiralSnackbar',

  computed: {
    visible: {
      get() {
        return this.$store.state.snackbar.visible;
      },
      set(value) {
        this.$store.commit('snackbar/setVisible', value);
      }
    },

    color() {
      return this.$store.state.snackbar.type;
    },

    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    }
  }
}
</script>
