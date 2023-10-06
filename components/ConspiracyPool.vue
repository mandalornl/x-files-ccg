<template>
  <v-avatar
    :size="small ? 16 : 24"
    :class="small ? 'rounded' : 'rounded-lg'"
    tile
    color="red"
    title="Conspiracy Pool"
  >
    <v-icon
      :size="small ? 12 : 20"
      color="white"
    >
      mdi-hand-back-left
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'ConspiracyPool',

  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon {
  transform: rotateZ(-25deg);
}
</style>
