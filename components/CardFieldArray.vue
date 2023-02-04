<template>
  <div class="mt-1 overflow-hidden">
    <div class="d-flex flex-wrap ma-n1">
      <v-chip
        v-for="label in value"
        :key="label"
        small
        label
        class="ma-1"
        @click="$emit('click', label)"
      >
        {{ label }}
      </v-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFieldArray',

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
