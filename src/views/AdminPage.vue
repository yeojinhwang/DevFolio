<template>
  <div>
    <h1 style="margin-top:80px;">어드민 페이지</h1>
    <v-layout row justify-center>

        <AdminDrawer style="background-color: rgba(255, 255, 255, 0);"/>

        <router-view/>

    </v-layout>

  </div>
  
</template>

<script>
import AdminDrawer from '../components/AdminVues/AdminDrawer'

export default {
  name: 'adminpage',
  components: {
    AdminDrawer,
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  
</style>

