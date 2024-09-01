<template>
  <layout-default>
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <v-btn
        icon
        title="Close"
        color="black"
        class="close-btn"
        @click="dialog = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-row
        no-gutters
        class="flex-column fill-height"
      >
        <v-col>
          <resource-counter
            v-model="conspiracy"
            rotate
            color="red"
          />
        </v-col>
        <v-col>
          <resource-counter
            v-model="resource"
            rotate
            color="blue"
          />
        </v-col>
      </v-row>
    </v-dialog>
    <div class="d-flex align-center mb-3">
      <v-spacer />
      <v-btn
        small
        depressed
        class="mr-1"
        @click="dialog = true"
      >
        Fullscreen
      </v-btn>
      <v-btn
        small
        depressed
        @click="reset"
      >
        Reset
      </v-btn>
    </div>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
      >
        <v-responsive aspect-ratio="1">
          <resource-counter
            v-model="resource"
            color="blue"
          />
        </v-responsive>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-responsive aspect-ratio="1">
          <resource-counter
            v-model="conspiracy"
            color="red"
          />
        </v-responsive>
      </v-col>
    </v-row>
  </layout-default>
</template>

<script>
export default {
  name: 'PageResources',

  data: () => ({
    resource: 5,
    conspiracy: 5,
    dialog: false,
    wakeLock: null
  }),

  watch: {
    async dialog(value) {
      try {
        if (value) {
          this.wakeLock = await navigator.wakeLock.request('screen');

          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          }
        } else {
          await this.wakeLock.release();

          this.wakeLock = null;

          if (document.fullscreenElement && document.exitFullscreen) {
            await document.exitFullscreen();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },

  methods: {
    reset() {
      this.resource = 5;
      this.conspiracy = 5;
    }
  }
};
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}
</style>
