<template>
  <v-tooltip
    bottom
    color="primary"
    content-class="black--text"
    open-delay="150"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        small
        color="primary"
        class="ml-2"
        v-bind="attrs"
        v-on="on"
      >
        mdi-information
      </v-icon>
    </template>
    <p>
      Only <mark class="d-inline py-0">json</mark> files with the following formatting are supported:<br>
      <mark class="d-block">{{ exampleCode }}</mark>
    </p>
    <p>
      For example:<br>
      <mark class="d-block">{{ exampleDeck }}</mark>
    </p>
  </v-tooltip>
</template>

<script>
export default {
  name: 'DeckUploadTooltip',

  computed: {
    exampleCode() {
      return JSON.stringify({
        name: '[string]',
        cards: {
          '[id:string]': '[quantity:number]'
        }
      }, null, '  ');
    },

    exampleDeck() {
      return JSON.stringify({
        name: 'My deck',
        cards: {
          'XF97-0169v2': 1,
          'XF97-0173v2': 1,
          'XF97-0254v2': 2
        }
      }, null, '  ');
    }
  }
}
</script>

<style lang="scss" scoped>
mark {
  padding: 4px;

  white-space: pre-wrap;

  background-color: var(--v-primary-darken1);
  color: black;

  border-radius: 4px;
}
</style>
