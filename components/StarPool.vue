<template>
  <v-avatar
    :size="small ? 16 : 20"
    tile
    color="indigo lighten-2"
    title="Resource or Conspiracy Pool"
    class="rounded"
  >
    <v-icon
      :size="small ? 12 : 16"
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
