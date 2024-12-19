<script>
export default {
  name: 'TextGameEffect',

  props: {
    tag: {
      type: String,
      default: 'p'
    },
    value: {
      type: String,
      default: undefined
    },
    small: {
      type: Boolean,
      default: false
    }
  },

  render(createElement) {
    const options = {
      props: {
        small: this.small
      }
    };

    return createElement(this.tag, {
      class: 'text-pre-wrap'
    }, this.value?.split(/(\[[RC*]P])/).map((value) => {
      switch (value) {
        case '[RP]':
          return createElement('resource-pool', options);
        case '[CP]':
          return createElement('conspiracy-pool', options);
        case '[*P]':
          return createElement('star-pool', options);
        default:
          return value;
      }
    }));
  }
}
</script>
