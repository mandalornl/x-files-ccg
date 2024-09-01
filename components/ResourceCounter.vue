<template>
  <v-card
    :color="color"
    :tile="rotate"
    class="fill-height d-flex align-center"
  >
    <v-card-text :class="[ 'text-h1 black--text d-flex align-center justify-space-between', { 'flex-column fill-height': !rotate } ]">
      <v-btn
        :disabled="internalValue === 99"
        icon
        x-large
        color="black"
        @click="internalValue += 1"
      >
        <v-icon>
          {{ rotate ? 'mdi-chevron-left' : 'mdi-chevron-up' }}
        </v-icon>
      </v-btn>
      <div :class="[ 'mx-4 user-select--none font-weight-medium', { 'rotate-n90': rotate } ]">
        {{ internalValue }}
      </div>
      <v-btn
        :disabled="internalValue === 0"
        icon
        x-large
        color="black"
        @click="internalValue -= 1"
      >
        <v-icon>
          {{ rotate ? 'mdi-chevron-right' : 'mdi-chevron-down' }}
        </v-icon>
      </v-btn>
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
.rotate-n90 {
  transform: rotate(-90deg);
}
</style>/
