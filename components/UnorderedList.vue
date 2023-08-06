<template>
  <ul>
    <li
      v-for="item of items"
      :key="item.label"
    >
      <hash-link
        v-if="item.hash !== undefined"
        :value="item.hash"
      >
        {{ item.label }}
      </hash-link>
      <template v-else>
        {{ item.label }}
      </template>
      <unordered-list
        v-if="item.children && item.children.length > 0"
        :items="item.children"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UnorderedList',

  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
