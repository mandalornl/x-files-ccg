<template>
  <layout-default>
    <h1>Downloads</h1>
    <v-row>
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="7"
      >
        <v-simple-table>
          <tbody>
            <tr @click="downloadChecklist">
              <td>The X-Files CCG Checklist</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </layout-default>
</template>

<script>
import { cards } from '~/config/card';

export default {
  name: 'PageDownloads',

  head: () => ({
    title: 'Downloads'
  }),

  methods: {
    downloadChecklist() {
      const data = Buffer
        .from([
          '"","#","Title","Type","Set","Rarity"',
          ...cards.map(({
            id,
            title,
            type,
            set,
            rarity
          }) => `"","${id}","${title}","${type}","${set}","${rarity}"`)
        ].join('\n'))
        .toString('base64');

      const anchor = document.createElement('a');
      anchor.download = 'the-x-files-ccg-checklist.csv';
      anchor.href = `data:text/csv;base64,${data}`;
      anchor.click();
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table::v-deep tbody tr:not(.v-data-table__empty-wrapper) {
  cursor: pointer;
}
</style>
