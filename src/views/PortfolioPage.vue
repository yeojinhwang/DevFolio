<template lang="html">
<div class="portfolio">
  <NavPortfolio v-if="this.isotherUid"/>
  <Header id="customHeader" :userData="userData"/>
  <AboutMe id="customAbout" :userData="userData"/>
  <PortfolioList id="customPortfolio" :userData="userData"/>
</div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

import Header from '@/components/portfoliosVues/Header.vue'
import AboutMe from '@/components/portfoliosVues/AboutMe.vue'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'
import NavPortfolio from '@/components/portfoliosVues/navPortfolio.vue'
import router from '../router';

export default {

  name: 'portfolio',
  components: {
      Header,
      AboutMe,
      PortfolioList,
      NavPortfolio
  },
  data() {
    return {
      userData: null,
      isotherUid: false
    }
  },
  created(){
    this.getUserID()
  },
  watch: {
    $route() {
      this.getUserID()
    }
  },
  methods: {
    getUserID() {
      let __this = this;
      const tmp = firebase.auth().onAuthStateChanged(async function(user) {
          if (__this.$route.params.uid === undefined) {
            // 포트폴리오가 없을 경우
            let result = await FirebaseServices.getMyPort(user.uid)
            if (result === undefined) {
              router.push('/write_portfolio')
              alert('포트폴리오가 없어요.')
            }
            __this.isotherUid = true;
            __this.userData = await FirebaseServices.getVisitView(user.uid)
          } else {
            __this.userData = await FirebaseServices.getVisitView(__this.$route.params.uid)
          }
          console.log(__this.userData);
      })
    }
  }
}
</script>
