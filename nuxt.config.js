const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://mandalornl.github.io/x-files-ccg';
const metaDescription = 'Is an out-of-print collectible card game based on The X-Files fictional universe. It was developed by NXT Games and published by the US Playing Card Company (USPCC).';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: isDev ? '/' : '/x-files-ccg/'
  },

  publicRuntimeConfig: {
    baseUrl
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (title) => (
      title ? `${title} - The X-Files CCG` : 'The X-Files CCG'
    ),
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: metaDescription },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', property: 'og:title', content: 'The X-Files CCG' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: `${baseUrl}/images/og-1200x630.png` },
      { hid: 'og:description', property: 'og:description', content: metaDescription }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuex-persist.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: '~/vuetify.options.js'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Generate Configuration: https://v2.nuxt.com/docs/configuration-glossary/configuration-generate
  generate: {
    fallback: true
  }
}
