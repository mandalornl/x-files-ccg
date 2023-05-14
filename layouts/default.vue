<template>
  <v-app v-scroll="scroll">
    <admiral-snackbar />
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="leftDrawer = !leftDrawer"
      />
      <app-logo class="pl-5 pl-sm-0" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="leftDrawer"
      :permanent="$vuetify.breakpoint.smAndUp"
      :expand-on-hover="$vuetify.breakpoint.smAndUp"
      :mini-variant="$vuetify.breakpoint.smAndUp"
      clipped
      app
    >
      <v-list nav>
        <v-list-item
          v-for="navItem in navItems"
          :key="navItem.label"
          :to="navItem.to"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ navItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ navItem.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="text-body-1">
      <slot>
        <nuxt />
      </slot>
    </v-main>
    <v-footer
      app
      tile
    >
      &copy; {{ currentYear }}
      <v-fab-transition>
        <v-btn
          v-show="showToTop"
          fab
          absolute
          top
          right
          color="primary"
          @click="$vuetify.goTo(0)"
        >
          <v-icon color="black">
            mdi-chevron-up
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>

<script>
import { Scroll } from 'vuetify/lib/directives';

export default {
  name: 'DefaultLayout',

  directives: {
    Scroll
  },

  data: () => ({
    leftDrawer: false,
    navItems: [
      {
        to: '/',
        label: 'Home',
        icon: 'mdi-home'
      },
      {
        to: '/card-list',
        label: 'Card List',
        icon: 'mdi-cards'
      },
      {
        to: '/deck-building',
        label: 'Deck Building',
        icon: 'mdi-wrench',
      },
      {
        to: '/agent-selector',
        label: 'Agent Selector',
        icon: 'mdi-police-badge'
      },
      {
        to: '/x-file-checklist',
        label: 'X-File Checklist',
        icon: 'mdi-format-list-checks'
      },
      {
        to: '/fcu-cube',
        label: 'FCU Cube',
        icon: 'mdi-cube-outline'
      },
      {
        to: '/faq',
        label: 'FAQ',
        icon: 'mdi-help-circle'
      },
      {
        to: '/downloads',
        label: 'Downloads',
        icon: 'mdi-archive'
      }
    ],
    showToTop: false
  }),

  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },

  methods: {
    scroll(event) {
      this.showToTop = event.currentTarget.scrollY > this.$vuetify.application.top;
    }
  }
}
</script>

<style lang="scss">
html {
  touch-action: manipulation;
}

p:last-child {
  margin-bottom: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: .25rem;

  line-height: 1.2;

  font-weight: 500;
}

.position-sticky {
  position: sticky !important;
}

@for $i from 1 through 10 {
  .z-index-#{$i} {
    z-index: $i;
  }
}

.v-dialog--scrollable .v-card__text {
  max-height: 100vh;
}
</style>
