<template>
  <v-app>
    <v-main class="text-body-1">
      <slot>
        <nuxt />
      </slot>
    </v-main>
    <v-footer
      app
      tile
    >
      &copy; {{ currentYear }}
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data: () => ({}),

  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
}
</script>

<style lang="scss">
html {
  touch-action: manipulation;
}

p ~ p:last-child {
  margin-bottom: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: .25rem;

  line-height: 1.2;

  font-weight: 500;
}
</style>
