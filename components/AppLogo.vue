<template>
  <div class="logo">
    The
    <div class="logo__alpha-x">
      <v-icon large>
        mdi-alpha-x
      </v-icon>
    </div>
    Files CCG
  </div>
</template>

<script>
export default {
  name: 'AppLogo'
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 1.25rem;
  line-height: 1.5;

  display: flex;
  flex-wrap: nowrap;

  text-transform: uppercase;
}

.logo__alpha-x {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid red;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  margin: 0 4px;
}
</style>
