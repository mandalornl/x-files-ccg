<template>
  <v-img
    :src="card.image"
    :alt="card.title"
    :aspect-ratio="5/7"
    :max-width="maxWidth"
    lazy-src="images/back.jpg"
    class="rounded grey darken-3"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: 'CardImage',

  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    maxWidth: {
      type: [ String, Number ],
      default: undefined
    }
  }
}
</script>
