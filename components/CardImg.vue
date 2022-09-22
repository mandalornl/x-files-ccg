<template>
  <v-responsive
    :aspect-ratio="5/7"
    :class="loaded ? 'black' : 'grey darken-3'"
  >
    <v-img
      :src="card.image"
      :alt="card.name"
      @load="loaded = true"
    >
      <slot />
    </v-img>
  </v-responsive>
</template>

<script>
export default {
  name: 'CardImg',

  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    loaded: false
  })
}
</script>

<style lang="scss" scoped>
.v-responsive:not(.v-image) {
  padding: 4.315%;
  border-radius: 4.315%;

  transition: background-color .2s ease-out;
}
</style>
