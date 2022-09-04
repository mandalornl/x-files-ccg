<template>
  <v-app v-scroll="scroll">
    <v-app-bar app>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="leftDrawer = !leftDrawer"
      />
      <v-toolbar-title v-if="$store.state.title">
        {{ $store.state.title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="leftDrawer"
      :permanent="$vuetify.breakpoint.smAndUp"
      :expand-on-hover="$vuetify.breakpoint.smAndUp"
      :mini-variant="$vuetify.breakpoint.smAndUp"
      app
    >
      <v-list nav>
        <template v-for="navItem in navItems">
          <v-list-group
            v-if="navItem.children && navItem.children.length > 0"
            :key="navItem.label"
            :value="navItem.children.find(({ to }) => to === $route.path)"
            :prepend-icon="navItem.icon"
          >
            <template #activator>
              <v-list-item-title>
                {{ navItem.label }}
              </v-list-item-title>
            </template>
            <nav-item
              v-for="childNavItem in navItem.children"
              :key="childNavItem.label"
              :item="childNavItem"
            />
          </v-list-group>
          <nav-item
            v-else
            :key="navItem.label"
            :item="navItem"
          />
        </template>
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
  name: 'LayoutDefault',

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
        to: '/faq',
        label: 'FAQ',
        icon: 'mdi-help-circle'
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
p:not(:last-child) {
  margin-bottom: 1rem;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
}
</style>
