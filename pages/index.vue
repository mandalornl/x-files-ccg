<template>
  <layout-default>
    Under construction
  </layout-default>
</template>

<script>
export default {
  name: 'PageIndex',

  middleware({ store }) {
    store.commit('setTitle', null);
  }
}
</script>
