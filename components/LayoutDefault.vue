<template>
  <v-container :fluid="fluid">
    <v-row justify="center">
      <v-col
        :lg="large ? 12 : 11"
        :xl="large ? 10 : 9"
      >
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LayoutDefault',

  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>
