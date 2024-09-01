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
      <nuxt-link
        to="/"
        class="pl-5 pl-sm-0 text-decoration-none"
      >
        <app-logo />
      </nuxt-link>
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
          @click="gotoTop"
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
        to: '/cards',
        label: 'Cards',
        icon: 'mdi-cards'
      },
      {
        to: '/decks',
        label: 'Decks',
        icon: 'mdi-wrench',
      },
      {
        to: '/agents',
        label: 'Agents',
        icon: 'mdi-police-badge'
      },
      {
        to: '/checklist',
        label: 'Checklist',
        icon: 'mdi-format-list-checks'
      },
      {
        to: '/resources',
        label: 'Resources',
        icon: 'mdi-dice-d20'
      },
      {
        to: '/fcu-cube',
        label: 'FCU Cube',
        icon: 'mdi-cube-outline'
      },
      {
        to: '/advanced-rules',
        label: 'Advanced Rules',
        icon: 'mdi-book-open-variant'
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
    },

    gotoTop() {
      this.$router.replace({
        hash: undefined
      });
      this.$vuetify.goTo(0);
    }
  }
}
</script>

<style lang="scss">
html {
  touch-action: manipulation;
}

p ~ p:last-child {
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

.position-absolute {
  position: absolute !important;
}

.position-relative {
  position: relative !important;
}

@for $i from 1 through 10 {
  .z-index-#{$i} {
    z-index: $i;
  }
}

.v-dialog--scrollable .v-card__text {
  max-height: 100vh;
}

.user-select--none {
  user-select: none !important;
}
</style>
