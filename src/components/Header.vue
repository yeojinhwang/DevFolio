<template>
  <nav>
    <v-flex>
      <v-toolbar absolute dark flat class="py-2" style="background: none;">
        <router-link :to="'/'" id="title">DevFolio</router-link>
      <v-spacer></v-spacer>
      </v-toolbar>
      <!-- sidebar -->
      <v-navigation-drawer v-model="drawer" stateless fixed right dark color="#000">
        <!-- sidebar list -->
        <SideBarItems/>
      </v-navigation-drawer>
      <!-- sidebar Btn -->
      <v-btn large flat color="grey" @click="drawer = !drawer" id="sideIcon">
        <div v-show="!drawer">
          <v-icon>fas fa-bars</v-icon>
        </div>
        <div v-show="drawer">
          <v-icon>fas fa-times</v-icon>
        </div>
      </v-btn>
    </v-flex>
  </nav>
</template>

<script>
import SideBarItems from './SideBarItems'
export default {
  name: 'Header',
  data() {
    return {
       drawer: false,
       stateless: true
    }
  },
  components: {
    SideBarItems
  },
  mounted() {
    this.$EventBus.$on('Logout', () => {
        this.drawer = !this.drawer
      })
  }
}
</script>

<style scoped>
#title {
  padding-left: 10%;
  object-fit: cover;
  font-weight: 900; 
  text-transform: uppercase; 
  text-shadow: 2px 2px 2px #103b5b; 
  letter-spacing: .2em; 
  font-size: 3rem; 
  font-family: 'Passion One', cursive;
}
/* sideBtn 고정용 */
#sideIcon {
position: fixed;
z-index: 99;
top: 10px;
right: 10px;
}
</style>

