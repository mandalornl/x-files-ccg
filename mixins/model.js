export const arrayValue = {
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      lazyValue: this.normalizeLazyValue(this.value)
    };
  },

  computed: {
    internalValue: {
      get() {
        return this.lazyValue;
      },
      set(value) {
        this.lazyValue = value;

        this.$emit('input', value);
      }
    }
  },

  watch: {
    value(value) {
      this.lazyValue = this.normalizeLazyValue(value);
    }
  },

  methods: {
    addToArray(value, index) {
      if (index !== null && index >= 0) {
        this.lazyValue.splice(index, 1, value);

        this.internalValue = [ ...this.lazyValue ];
      } else {
        this.internalValue = [
          ...this.lazyValue,
          value
        ];
      }
    },

    removeFromArray(index) {
      this.lazyValue.splice(index, 1);

      this.internalValue = [ ...this.lazyValue ];
    },

    normalizeLazyValue(value) {
      return [ ...value ];
    }
  }
};
