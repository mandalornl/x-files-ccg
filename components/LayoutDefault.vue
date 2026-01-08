<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
        xl="4"
      >
        <div class="text-center">
          <img
            src="/logo.svg"
            alt="The X-Files CCG"
            width="240"
            height="48"
          >
          <slot />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>
