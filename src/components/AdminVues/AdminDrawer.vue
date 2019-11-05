<template>
  <v-navigation-drawer permanent floating>
    <v-list>
      <v-list-tile v-for="item in drawerItems" :key="item.title" @click="routeFunction(item.path)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from '../../router'

export default {
  name: 'admindrawer',
  data () {
    return {
      drawerItems: [
        { title: 'home', icon: 'dashboard', path: 'adminpage' },
        { title: 'user', icon: 'fas fa-users-cog', path: 'adminuser'},
        { title: 'database', icon: 'fas fa-server', path: 'admindb'},
        { title: 'storage', icon: 'fas fa-folder-open', path: 'adminstorage'},
      ],
      right: null
    }
  },
  methods: {
    routeFunction(path) {
      this.$router.push({ name: path })
    }
  }
}
</script>