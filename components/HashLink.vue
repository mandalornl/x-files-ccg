<template>
  <nuxt-link
    :to="route"
    replace
  >
    <slot>{{ value }}</slot>
  </nuxt-link>
</template>

<script>
export default {
  name: 'HashLink',

  props: {
    value: {
      type : [ Number, String ],
      default: undefined
    }
  },

  computed: {
    route() {
      const { route } = this.$router.resolve({
        hash: `#${this.value}`
      });

      return route;
    }
  }
}
</script>
