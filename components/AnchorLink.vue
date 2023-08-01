<script>
export default {
  name: 'AnchorLink',

  render(createElement) {
    const page = this.$slots.default?.[0]?.text?.trim?.() ?? '';

    return createElement('nuxt-link', {
      attrs: {
        to: `#${page}`
      }
    }, page);
  }
}
</script>
