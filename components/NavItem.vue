<template>
  <v-list-item
    :to="item.to"
    color="primary"
  >
    <v-list-item-icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.label }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'NavItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
