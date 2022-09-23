<template>
  <v-img
    :src="card.image"
    :alt="card.name"
    :aspect-ratio="5/7"
    class="rounded grey darken-3"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: 'CardImg',

  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
