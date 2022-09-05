<template>
  <v-btn-toggle
    v-model="internalValue"
    dense
    mandatory
    borderless
  >
    <v-btn
      small
      depressed
      value="and"
    >
      And
    </v-btn>
    <v-btn
      small
      depressed
      value="or"
    >
      Or
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { stringValue } from '~/mixins/model';

export default {
  name: 'CardFilterOperator',

  mixins: [
    stringValue
  ]
}
</script>
