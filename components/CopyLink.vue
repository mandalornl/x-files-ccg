<template>
  <v-hover v-slot="{ hover }">
    <div class="d-flex align-center">
      <slot />
      <v-fade-transition>
        <v-tooltip
          v-if="hover"
          top
          open-delay="150"
          color="primary"
          content-class="black--text"
        >
          <template #activator="{ on, attrs }">
            <a
              :href="href"
              v-bind="attrs"
              v-on="on"
              @click.prevent="copyToClipboard"
            >
              <v-icon
                :color="color"
                class="ml-2"
              >
                mdi-link-variant
              </v-icon>
            </a>
          </template>
          Copy link to this section
        </v-tooltip>
      </v-fade-transition>
    </div>
  </v-hover>
</template>

<script>
export default {
  name: 'CopyLink',

  props: {
    value: {
      type: [ String, Number ],
      default: undefined
    },

    color: {
      type: String,
      default: undefined
    }
  },

  computed: {
    href() {
      const { href } = this.$router.resolve({
        hash: `#${this.value}`
      });

      return href;
    }
  },

  methods: {
    async copyToClipboard(event) {
      this.$store.commit('snackbar/setVisible', false);

      try {
        await navigator.clipboard.writeText(event.currentTarget.href);

        this.$store.commit('snackbar/setSuccess', 'Copied to clipboard.');
      } catch (error) {
        console.error(error.message);

        this.$store.commit('snackbar/setError', 'Failed to copy to clipboard.');
      }
    }
  }
}
</script>
