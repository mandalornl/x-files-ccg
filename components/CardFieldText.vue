<script>
export default {
  name: 'CardFieldText',

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  render(createElement) {
    return createElement('blockquote', {
      class: 'text-body-2 text--secondary font-italic'
    }, this.value);
  }
}
</script>
