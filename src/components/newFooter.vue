<template>
  <v-layout>
  <v-footer
    dark
    padless
   style="height: 100%;">
    <v-card
      flat
      tile
      class="dark white--text text-xs-center"
    >
      <v-card-text>
        <v-btn flat class="mx-3 py-4 white--text" href="https://lab.ssafy.com/kimsuhan/webmobile-sub3" target="_blank">
          <i class="fab fa-github fa-3x"></i>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        대전광역시 유성구 덕명동 124  |  Tel. 02-1111-2222  |  Fax. 02-1111-2222</br>
        Copyright ©2019 BANGKOK Inc Co., Ltd. All rights reserved.
      </v-card-text>
  <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>BangKok</strong></br>
        Made by</br>황여진 전영진 서지훈 강신욱
      </v-card-text>
    </v-card>
  </v-footer>
</v-layout>
</template>

<script>
  import firebase from 'firebase/app'

  export default {
    name : 'newFooter',
    computed:{
      test (){
        return this.$store.getters.searchItem;
      }
    },
    data() {
      return {
        icons: [
          'fab fa-facebook',
          'fab fa-twitter',
          'fab fa-google-plus',
          'fab fa-linkedin',
          'fab fa-instagram',
        ],
        location:[
          'https://www.facebook.com/',
          'https://www.twitter.com/',
          'https://www.google.com/',
          'https://www.Linkedin.com/',
          'https://www.instagram.com/'],
        user: null
      }
    }
  }
</script>

<style >


  .sitemap div {
    float: left;
  }
  a:link { color: white; text-decoration: none;}
  a:visited { color: white; text-decoration: none;}
  a:hover { color: white; text-decoration: none;}
  .headline {
    margin-left:20px;
  }
  .v-card {
    width: 100%;

  }

  .v-footer {
    width: 100%;

  }
  li {
    list-style: none;
  }
</style>

<codepen-resources lang="json">
  {
  "js": ["https://use.fontawesome.com/releases/v5.0.6/js/all.js"]
  }
</codepen-resources>
