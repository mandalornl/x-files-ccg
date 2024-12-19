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
    return createElement('text-game-effect', {
      class: 'text-body-2 text--secondary',
      props: {
        tag: 'blockquote',
        value: this.value,
        small: true
      }
    });
  }
}
</script>
