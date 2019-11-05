<template>
  <div class="home">
    <MainBanner/>
    <div class="mx-auto" style="min-height: 100vh; background-color: white;">
      <h3 id="introAbout" class="small-heading pb-2">ABOUT US</h3>
      <h2 class="headline pb-2">The best way to make portfolio</h2>
      <p class="subheading pb-3">다음과 같은 서비스를 제공합니다.</p>
      <Intro/>
    </div>
    <SearchItems/>
    <div class="mx-auto py-5" style="background-color: white;">
      <h2 class="headline py-5">당신을 위한 추천 포트폴리오</h2>
      <RankList/>
    </div>
    <div class="vld-parent">
       <loading :active.sync="isLoading"
       :can-cancel="true"
       :on-cancel="onCancel"
       :is-full-page="fullPage"></loading>
    </div>
    <newFooter></newFooter>
  </div>
  
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import store from '../store'
import FirebaseServices from '../services/FirebaseServices'

import RankList from '@/components/RankList.vue'
import MainBanner from '@/components/MainBanner.vue'
import Intro from '@/components/Intro.vue'
import SearchItems from '@/components/SearchItems'
import newFooter from '@/components/newFooter.vue'


import Loading from 'vue-loading-overlay';
   // Import stylesheet
export default {
  name: 'home',
  components: {
    Intro,
    RankList,
    MainBanner,
    SearchItems,
    newFooter,
    Loading
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          FirebaseServices.updatedStoreUser()
          store.commit('setUserId', user.uid)
      } else {
          FirebaseServices.updatedStoreUser()
          store.commit('setUserId', null)
      }
      store.commit('setDate', this.setDate())
    })
    this.doAjax();
  },
  data() {
      return {
          isLoading: false,
          fullPage: true,
          user: null
      }
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      },1000)
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    setDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDate()
      if(month < 10){
          month = "0"+month
      }
      if(day < 10){
          day = "0"+day
      }
      let today = year+month+day
      console.log(today)
      return today
    },
  }
}
</script>

<style scoped>
.small-heading {
  color: #bfbfbf;
  font-weight: 600;
}
.headline {
  font-weight: 600;
}
#introAbout {
  padding-top: 80px;
  padding-bottom: 100px;
}
</style>
