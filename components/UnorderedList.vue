<template>
  <ul>
    <li
      v-for="item of items"
      :key="item.label"
    >
      <nuxt-link
        v-if="item.to !== undefined"
        :to="item.to"
      >
        {{ item.label }}
      </nuxt-link>
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
