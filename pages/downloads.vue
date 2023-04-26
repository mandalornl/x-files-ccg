<template>
  <layout-default>
    <h1>Downloads</h1>
    <v-list>
      <v-list-item
        v-for="item of items"
        :key="item.label"
        :href="item.href"
        :download="item.download"
        target="_blank"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ item.label }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="item.credits">
            {{ item.credits }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
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
    const data = Buffer
      .from([
        '"","#","Title","Type","Set","Rarity"',
        ...cards.filter(({ set }) => [
          'Premiere',
          'The Truth is Out There',
          '101361',
          'Promo'
        ].includes(set)).map(({
          id,
          title,
          type,
          set,
          rarity = ''
        }) => `"[ ]","${id}","${title.replaceAll('"', '\'')}","${type}","${set}","${rarity}"`)
      ].join('\n'))
      .toString('base64');

    return {
      items: [
        {
          label: 'Card Checklist',
          href: `data:text/csv;base64,${data}`,
          download: 'the-x-files-ccg-checklist.csv',
          icon: 'mdi-file-excel'
        },
        {
          label: 'Ancillary Documentation',
          href: 'downloads/xfccgad.pdf',
          download: 'The X-Files CCG - Ancillary Documentation.pdf',
          credits: 'Stephen David Wark',
          icon: 'mdi-file-pdf-box'
        },
        {
          label: 'Rules Assistant',
          href: 'downloads/xfccgra.pdf',
          download: 'The X-Files CCG - Rules Assistant.pdf',
          credits: 'Chris Heard',
          icon: 'mdi-file-pdf-box'
        },
        {
          label: 'Card Templates',
          href: 'https://drive.google.com/drive/folders/1ozW8clUaQZkg7Z43AKSk6moOvRjKhYYd?usp=share_link',
          credits: 'Robert Castleberry',
          icon: 'mdi-image-multiple'
        },
        {
          label: 'FCU Cube',
          href: 'downloads/xfccgfcucube.pdf',
          credits: 'Alastair \'TheJauntyGoblin\' Headden',
          icon: 'mdi-file-pdf-box'
        }
      ]
    };
  },

  head: () => ({
    title: 'Downloads'
  })
}
</script>
