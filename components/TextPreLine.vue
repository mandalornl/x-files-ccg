<script>
import escapeRegExp from 'lodash/escapeRegExp';

export default {
  name: 'TextPreLine',

  props: {
    tag: {
      type: String,
      default: 'p'
    },
    highlight: {
      type: [ String, Array ],
      default: undefined
    }
  },

  methods: {
    getText(createElement) {
      const text = this.$slots.default?.[0]?.text?.trim?.() ?? '';

      if (this.highlight) {
        const highlights = Array.isArray(this.highlight) ? this.highlight : [ this.highlight ];

        return highlights
          .map((value) => value.toLowerCase())
          .filter((value, index, array) => array.indexOf(value) === index)
          .reduce((result, highlight) => {
            const regX = new RegExp(`(${escapeRegExp(highlight)})`, 'i');

            return result.flatMap((text) => {
              if (typeof text !== 'string') {
                return text;
              }

              return text
                .split(regX)
                .filter(Boolean)
                .map((value) => {
                  if (value.toLowerCase() !== highlight) {
                    return value;
                  }

                  return createElement('mark', value);
                });
            });
          }, [ text ]);
      }

      return text;
    }
  },

  render(createElement) {
    return createElement(this.tag, {
      class: 'text-pre-line'
    }, this.getText(createElement));
  }
}
</script>
