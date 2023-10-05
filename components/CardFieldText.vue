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
    const options = {
      props: {
        small: true
      }
    };

    return createElement('blockquote', {
      class: 'text-body-2 text-pre-wrap text--secondary'
    }, this.value
      .split(/(\[(?:RP|CP|\*P)])/)
      .map((value) => {
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
      })
    );
  }
}
</script>
