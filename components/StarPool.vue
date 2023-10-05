<template>
  <v-avatar
    :size="small ? 16 : 24"
    :class="small ? 'rounded' : 'rounded-lg'"
    tile
    color="indigo lighten-2"
  >
    <v-icon
      :size="small ? 12 : 20"
      color="white"
    >
      mdi-virus-outline
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'StarPool',

  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
