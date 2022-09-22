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
    normalizeLazyValue: (value) => ([ ...value ])
  }
};

export const stringValue = {
  props: {
    value: {
      type: String,
      default: null
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
        this.lazyValue = this.normalizeLazyValue(value);

        this.$emit('input', this.lazyValue);
      }
    }
  },

  watch: {
    value(value) {
      this.lazyValue = this.normalizeLazyValue(value);
    }
  },

  methods: {
    normalizeLazyValue: (value) => (
      typeof value === 'string' ? value : null
    )
  }
};

export const booleanValue = {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      lazyValue: !!this.value
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
      this.lazyValue = !!value;
    }
  }
};
