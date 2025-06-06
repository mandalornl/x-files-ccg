<template>
  <div>
    <v-checkbox
      v-for="(item, index) in firstItems"
      :key="item.value"
      v-model="internalValue"
      :disabled="item.disabled"
      :value="item.value"
      :class="operation === undefined && index === 0 ? 'mt-0 pt-0' : undefined"
      :hide-details="expandable || index !== firstItems.length - 1"
      multiple
    >
      <template #label>
        {{ item.value }} ({{ item.count }})
      </template>
    </v-checkbox>
    <template v-if="expandable">
      <v-expand-transition>
        <div v-if="expanded">
          <v-checkbox
            v-for="item in lastItems"
            :key="item.value"
            v-model="internalValue"
            :disabled="item.disabled"
            :value="item.value"
            multiple
            hide-details
          >
            <template #label>
              {{ item.value }} ({{ item.count }})
            </template>
          </v-checkbox>
        </div>
      </v-expand-transition>
      <v-switch
        v-model="expanded"
        :label="expanded ? 'Show less' : `Show ${lastItems.length} more`"
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
    operation: {
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
      return this.items
        .slice(0, 5)
        .map(this.mapItems);
    },

    lastItems() {
      return this.items
        .slice(5)
        .map(this.mapItems);
    },

    expandable() {
      return this.items.length > 5;
    }
  },

  watch: {
    operation(value) {
      if (value === 'and') {
        this.internalValue = [];
      }
    }
  },

  methods: {
    mapItems(value) {
      const count = this.count(value);

      return {
        value,
        count,
        disabled: count === 0
          && (this.operation === 'and'
          || (
            this.operation === 'or'
            && !this.internalValue.includes(value)
          ))
      };
    },

    count(value) {
      if (
        this.operation === 'or'
        && this.internalValue.length > 0
        && !this.internalValue.includes(value)
      ) {
        return '…';
      }

      return this.cards.filter(({ [this.type]:filter }) => {
        if (Array.isArray(filter)) {
          return filter.includes(value);
        }

        return filter === value;
      }).length;
    }
  }
}
</script>
