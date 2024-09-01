<template>
  <v-card
    :color="color"
    :tile="rotate"
    class="fill-height d-flex align-center"
  >
    <v-card-text class="text-h1 black--text d-flex justify-center">
      <div :class="[ 'd-flex align-center', { 'rotate-90': rotate } ]">
        <v-btn
          :disabled="internalValue === 0"
          icon
          x-large
          color="black"
          @click="internalValue -= 1"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div
          class="mx-4 user-select--none"
        >
          {{ internalValue }}
        </div>
        <v-btn
          :disabled="internalValue === 99"
          icon
          x-large
          color="black"
          @click="internalValue += 1"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { numberValue } from '~/mixins/model';

export default {
  mixins: [
    numberValue
  ],

  props: {
    color: {
      type: String,
      default: undefined
    },
    rotate: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>/
