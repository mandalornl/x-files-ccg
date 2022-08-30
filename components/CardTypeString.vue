<script>
export default {
  name: 'CardTypeString',

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  render (createElement) {
    return createElement('div', {
      class: 'text-body-2 text--secondary'
    }, this.value);
  }
}
</script>
