<template>
  <v-chip
    :color="color"
    :text-color="textColor"
    small
    label
  >
    {{ value }}
  </v-chip>
</template>

<script>
export default {
  name: 'CardTypeChip',

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  computed: {
    color() {
      return {
        'Adversary': 'green darken-2',
        'Agent': 'white',
        'Bluff': 'grey',
        'Combat': 'red darken-4',
        'Equipment': 'light-blue darken-3',
        'Event': 'pink darken-2',
        'Site': 'blue darken-4',
        'Witness': 'purple darken-1',
        'X-File': 'yellow',
        'Credits': 'orange darken-2'
      }[this.value];
    },

    textColor() {
      return [
        'Agent',
        'Bluff',
        'X-File'
      ].includes(this.value) ? 'black' : undefined;
    }
  }
}
</script>
