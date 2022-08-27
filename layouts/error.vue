<template>
  <layout-default>
    <h1 class="text-h4">
      {{ message }}
    </h1>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </layout-default>
</template>

<script>
export default {
  name: 'LayoutError',

  layout: 'empty',

  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },

  head() {
    return {
      title: this.message
    };
  },

  computed: {
    message() {
      switch (this.error.statusCode) {
        case 400: return 'Bad request';
        case 401: return 'Unauthorized';
        case 403: return 'Access denied';
        case 404: return 'Not found';
        default: return 'An error occurred';
      }
    }
  }
}
</script>
