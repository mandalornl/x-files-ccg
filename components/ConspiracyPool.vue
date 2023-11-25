<template>
  <v-avatar
    :size="small ? 16 : 20"
    tile
    color="red"
    title="Conspiracy Pool"
    class="rounded"
  >
    <v-icon
      :size="small ? 12 : 16"
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
