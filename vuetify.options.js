import minifyTheme from 'minify-css-string';
import LRU from 'lru-cache';
import colors from 'vuetify/lib/util/colors';

const themeCache = new LRU({
  max: 10,
  ttl: 1000 * 60 * 60
});

export default {
  theme: {
    options: {
      minifyTheme,
      themeCache,
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        anchor: colors.lightGreen.accent3,
        primary: colors.lightGreen.accent3,
    //     anchor: colors.blue.base,
    //     primary: colors.blue.darken2,
    //     secondary: colors.grey.darken3,
    //     accent: colors.blue.accent1,
    //     success: { ...colors.green },
    //     warning: { ...colors.amber },
    //     info: { ...colors.blue },
    //     error: { ...colors.red }
      }
    }
  }
};
