<template>
  <v-avatar
    tile
    size="24"
    color="red"
    class="rounded-lg"
  >
    <v-icon
      size="20"
      color="white"
    >
      mdi-hand-back-left
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'ConspiracyPool'
}
</script>

<style lang="scss" scoped>
.v-icon {
  transform: rotateZ(-25deg);
}
</style>
