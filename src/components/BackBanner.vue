<template>
  <v-layout id="backBanner" row justify-center align-center>
    <slot name="pageName"/>
  </v-layout>
</template>

<script>
export default {
  name: 'BackBanner',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#backBanner {
  min-height: 30vh;
  position: relative;
  background-size: cover;
  background-position: 50% 30%;
  background-image: url('../../public/img/backBanner.png');
}
</style>
