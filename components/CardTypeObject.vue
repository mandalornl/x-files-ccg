<template>
  <table class="mt-1">
    <tbody>
      <tr
        v-for="(cellValue, label) in value"
        :key="label"
        class="text-body-2 text--secondary"
      >
        <td>{{ label }}</td>
        <td>{{ cellValue }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'CardTypeObject',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  border-spacing: 0;

  tr {
    transition: background-color .2s ease-out;

    &:hover {
      background-color: rgba(white, .15);
    }

    &:not(:last-child) td {
      border-bottom: thin solid rgba(white, .12);
    }
  }

  td {
    padding: 4px;
  }
}
</style>
