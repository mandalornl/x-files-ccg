<template>
  <div>
    <v-checkbox
      v-for="(item, index) in firstItems"
      :key="item.value"
      v-model="internalValue"
      :disabled="item.disabled"
      :value="item.value"
      :label="item.value"
      :class="operator === undefined && index === 0 ? 'mt-0 pt-0' : undefined"
      :hide-details="expandable || index !== firstItems.length - 1"
      multiple
    />
    <template v-if="expandable">
      <v-expand-transition>
        <div v-if="expanded">
          <v-checkbox
            v-for="item in lastItems"
            :key="item.value"
            v-model="internalValue"
            :disabled="item.disabled"
            :value="item.value"
            :label="item.value"
            multiple
            hide-details
          />
        </div>
      </v-expand-transition>
      <v-switch
        v-model="expanded"
        :label="expanded ? 'Less' : 'More'"
        dense
      />
    </template>
    <v-btn
      :disabled="internalValue.length === 0"
      small
      depressed
      @click="internalValue = []"
    >
      Clear
    </v-btn>
  </div>
</template>

<script>
import { arrayValue } from '~/mixins/model';

export default {
  name: 'CardFilterCheckbox',

  mixins: [
    arrayValue
  ],

  props: {
    type: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => ([])
    },
    operator: {
      type: String,
      default: undefined
    },
    cards: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({
    expanded: false
  }),

  computed: {
    firstItems() {
      return this.items.map(this.mapItems).slice(0, 6);
    },

    lastItems() {
      return this.items.map(this.mapItems).slice(6);
    },

    expandable() {
      return this.items.length > 6;
    },

    availableValues() {
      return this.cards.reduce((result, { [this.type]:value }) => ([
        ...result,
        ...Array.isArray(value) ? value : [ value ]
      ]), []).filter((value, index, items) => items.indexOf(value) === index);
    }
  },

  watch: {
    operator(value) {
      if (value === 'and') {
        this.internalValue = [];
      }
    }
  },

  methods: {
    mapItems(value) {
      return {
        value,
        disabled: this.operator === 'and' && !this.availableValues.includes(value)
      };
    }
  }
}
</script>
