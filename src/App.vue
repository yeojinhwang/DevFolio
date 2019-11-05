<template>
  <v-app>
    <v-content>
      <Header/>
      <div>
        <router-view/>
      </div>
      <TopButton/>
    </v-content>
  </v-app>
</template>

<script type="text/javascript">
import store from './store'
import Header from './components/Header'
import TopButton from './components/TopButton'

export default {
  name: 'App',
  store,
  components:{
      Header,
      TopButton,
  },
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
</script>
<style>
html {
  scroll-behavior: smooth;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
