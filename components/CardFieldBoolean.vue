<script>
export default {
  name: 'CardFieldBoolean',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  render(createElement) {
    return createElement('div', {
      class: 'text-body-2 text--secondary'
    }, this.value ? 'Yes' : 'No');
  }
}
</script>
