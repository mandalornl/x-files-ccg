<template>
  <unordered-list :items="pages" />
</template>

<script>
export default {
  name: 'TableOfContents',

  data: () => ({
    pages: [
      {
        label: 'Introduction',
        to: '#4'
      },
      {
        label: 'Game Set-up',
        to: '#5'
      },
      {
        label: 'The X-Files (TM) CCG Advanced Turn Sequence',
        to: '#8'
      },
      {
        label: 'Pools',
        to: '#10',
        children: [
          {
            label: 'Resource Pool',
            to: '#11'
          },
          {
            label: 'Conspiracy Pool',
            to: '#12'
          }
        ]
      },
      {
        label: 'Playing Cards',
        to: '#14',
        children: [
          {
            label: 'Agent Cards',
            to: '#15'
          },
          {
            label: 'Activators',
            to: '#16'
          },
          {
            label: 'Keywords',
            to: '#17'
          },
          {
            label: 'Resources',
            to: '#17'
          }
        ]
      },
      {
        label: 'Detailed Advanced Turn Explanations',
        to: '#18',
        children: [
          {
            label: 'Briefing Phase',
            to: '#18'
          },
          {
            label: 'Healing Phase',
            to: '#20'
          },
          {
            label: 'Requisition Phase',
            to: '#21'
          },
          {
            label: 'Deployment Phase',
            to: '#23',
            children: [
              {
                label: 'Teams',
                to: '#23'
              }
            ]
          },
          {
            label: 'Case Assignment Phase',
            to: '#24',
            children: [
              {
                label: 'The Bluff',
                to: '#25'
              }
            ]
          },
          {
            label: 'Investigation Phase',
            to: '#27',
            children: [
              {
                label: 'Skill Check Subroutine',
                to: '#28'
              },
              {
                label: 'Combat',
                to: '#31',
                children: [
                  {
                    label: 'Long Range Combat (LRC)',
                    to: '#32'
                  },
                  {
                    label: 'Close Range Combat (CRC)',
                    to: '#33'
                  },
                  {
                    label: 'Tracking Damage',
                    to: '#34'
                  },
                  {
                    label: 'Combat Cards',
                    to: '#35'
                  }
                ]
              },
              {
                label: 'Site Resolution',
                to: '#37'
              }
            ]
          },
          {
            label: 'Debriefing Phase',
            to: '#38'
          }
        ]
      },
      {
        label: 'Multi-Player Changes',
        to: '#40'
      },
      {
        label: 'Optional Rules',
        to: '#42'
      },
      {
        label: 'Deck Construction',
        to: '#46'
      },
      {
        label: 'The Nine Different Suits',
        to: '#48',
        children: [
          {
            label: 'Event Cards',
            to: '#50'
          },
          {
            label: 'Witness Cards',
            to: '#51'
          },
          {
            label: 'Bluff Cards',
            to: '#52'
          },
          {
            label: 'Equipment Cards',
            to: '#53'
          },
          {
            label: 'Combat Cards',
            to: '#54'
          },
          {
            label: 'Adversary Cards',
            to: '#55'
          },
          {
            label: 'Site Cards',
            to: '#56'
          },
          {
            label: 'Agent Cards',
            to: '#57'
          },
          {
            label: 'X-File Cards',
            to: '#58',
            children: [
              {
                label: 'Affiliations',
                to: '#60'
              },
              {
                label: 'Motives',
                to: '#61'
              },
              {
                label: 'Methods',
                to: '#62'
              },
              {
                label: 'Results',
                to: '#63'
              }
            ]
          }
        ]
      },
      {
        label: 'Glossary',
        to: '#64'
      },
      {
        label: 'Glossary: Skills',
        to: '#65'
      },
      {
        label: 'Basic Game Quick Reference',
        children: [
          {
            label: 'Sequence of Play',
            to: '#BackCover'
          }
        ]
      }
    ]
  })
}
</script>
