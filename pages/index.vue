<template>
  <layout-default>
    <h1>The X-Files Collectible Card Game</h1>
    <p>Is an out-of-print collectible card game based on The X-Files fictional universe. It was developed by NXT Games and published by the US Playing Card Company (USPCC).</p>
    <h2>Gameplay</h2>
    <p>A game of The X-Files is played between two players using decks of cards representing characters, equipment, events, and locations from the television show. At the beginning of the game, each player selects an X-File card and places it face down, and the winner of the game is the first player to correctly guess the identity of the opponent's X-File. To gather clues about the X-File card, players play Site cards and move Agent cards to those locations. If they can fulfill the investigation requirements of the Site, they can ask a yes or no question about the opponent's X-File card. Players can attempt to interfere in their opponent's investigations by playing Event, Bluff, and Adversary cards of their own.</p>
    <h2>History</h2>
    <p>The Premier Set was released in 1996 and debuted at Gen Con. Initially, 80 million cards were shipped on November 1st, 1996. Over the next year, USPCC would create the first expansion, 101361, a 2nd edition set known as The Truth Is Out There, and a number of promotional cards. The second expansion, 22364 was apparently finished and ready to be produced, when the game was terminated in 1997. Three collector sets were also cancelled.</p>
    <p class="text-caption">
      Source:
      <a
        href="https://en.wikipedia.org/wiki/The_X-Files_Collectible_Card_Game"
        target="_blank"
      >
        Wiki
      </a>
    </p>
    <h2>Links</h2>
    <v-row>
      <v-col
        cols="12"
        sm="9"
        md="8"
        lg="7"
      >
        <v-list>
          <v-list-item
            v-for="item in links"
            :key="item.href"
            :href="item.href"
            target="_blank"
            color="primary"
          >
            <v-list-item-avatar
              color="white"
              size="24"
            >
              <v-icon :color="item.color">
                {{ item.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </layout-default>
</template>

<script>
export default {
  name: 'PageIndex',

  data: () => ({
    links: [
      {
        title: 'Alien Investigations',
        subtitle: 'Watch and learn how to play The X-Files CCG on this YouTube channel.',
        href: 'https://www.youtube.com/channel/UCdoWDLQ-e5MtAbt9fUQeWYw',
        icon: 'mdi-youtube',
        color: 'red'
      },
      {
        title: 'Mike and Matt',
        subtitle: 'Bringing back The X-Files CCG on their YouTube channel.',
        href: 'https://www.youtube.com/c/MMXFILESCCG',
        icon: 'mdi-youtube',
        color: 'red'
      },
      {
        title: 'The X-Files Collectible Card Game Facebook Group',
        subtitle: 'A fantastic community for those interested in The X-Files CCG.',
        href: 'https://www.facebook.com/groups/xfccg/',
        icon: 'mdi-facebook',
        color: '#4267B2'
      }
    ]
  })
}
</script>
