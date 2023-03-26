<template>
  <layout-default>
    <h1>Downloads</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Credits</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item of items"
          :key="item.name"
          @click="item.click"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.credits }}</td>
          <td>
            <v-icon>{{ item.icon }}</v-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </layout-default>
</template>

<script>
import { cards } from '~/config/card';
import { download } from '~/mixins/download';

export default {
  name: 'PageDownloads',

  mixins: [
    download
  ],

  data() {
    return {
      items: [
        {
          name: 'Checklist',
          click: () => this.downloadChecklist(),
          icon: 'mdi-file-excel'
        },
        {
          name: 'Ancillary Documentation',
          click: () => this.download('downloads/xfccgad.pdf', 'The X-Files CCG - Ancillary Documentation.pdf'),
          credits: 'Stephen David Wark',
          icon: 'mdi-file-pdf-box'
        },
        {
          name: 'Rules Assistant',
          click: () => this.download('downloads/xfccgra.pdf', 'The X-Files CCG - Rules Assistant.pdf'),
          credits: 'Chris Heard',
          icon: 'mdi-file-pdf-box'
        }
      ]
    };
  },

  head: () => ({
    title: 'Downloads'
  }),

  methods: {
    downloadChecklist() {
      const data = Buffer
        .from([
          '"","#","Title","Type","Set","Rarity"',
          ...cards.filter(({ set }) => ![
            '100617',
            'Dream'
          ].includes(set)).map(({
            id,
            title,
            type,
            set,
            rarity = ''
          }) => `"[ ]","${id}","${title}","${type}","${set}","${rarity}"`)
        ].join('\n'))
        .toString('base64');

      this.download(`data:text/csv;base64,${data}`, 'the-x-files-ccg-checklist.csv');
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table::v-deep tbody tr {
  &:not(.v-data-table__empty-wrapper) {
    cursor: pointer;
  }

  td {
    white-space: nowrap;
  }
}
</style>
