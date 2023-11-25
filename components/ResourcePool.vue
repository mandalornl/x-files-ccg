<template>
  <v-avatar
    :size="small ? 16 : 20"
    tile
    color="light-blue"
    title="Resource Pool"
    class="rounded"
  >
    <v-icon
      :size="small ? 12 : 16"
      color="white"
    >
      mdi-police-badge
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'ResourcePool',

  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

