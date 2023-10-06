<template>
  <v-avatar
    :size="small ? 16 : 24"
    :class="small ? 'rounded' : 'rounded-lg'"
    tile
    color="light-blue"
    title="Resource Pool"
  >
    <v-icon
      :size="small ? 12 : 20"
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

