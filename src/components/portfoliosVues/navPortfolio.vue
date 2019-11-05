<template>
    <v-navigation-drawer
      fixed permanent disable-route-watcher
      width="90rem"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Editor
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense calss="pt-0" v-for="item in items">
        <v-list-tile
          :key="item.title"
          @click="drawerHandler(item.title)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
  data () {
    return {
      items: [
        { title: 'Header', icon: 'fas fa-home' },
        { title: 'About', icon: 'fas fa-user-edit' },
        { title: 'Portfolio', icon: 'fas fa-file-code' }
      ],
      drawer: true,
      mini: true,
    }
  },
  methods: {
    drawerHandler(location) {
      templateMove(location)
      console.log(location)
      this.$EventBus.$emit(location)
    }
  }
}

function templateMove(location){
  console.log(location)
  var offset = $("#custom" + location).offset();
  console.log(offset)
  $('html, body').animate({scrollTop : offset.top}, 100);
}
</script>