<template>
  <nuxt-link
    :to="to"
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
    to() {
      const { href } = this.$router.resolve({
        hash: `#${this.value}`
      });

      return href;
    }
  }
}
</script>
