<template>
  <div>
    <UserProfile v-if="loaded" v-bind:userData="{userData: userData, spark: spark}"/>
    <UserBookMark/>
  </div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import BackBanner from '../components/BackBanner'
import UserProfile from '../components/userVues/UserProfile.vue'
import UserBookMark from '../components/userVues/UserBookMark.vue'

export default {
  name: 'userprofile',
  components: {
      BackBanner,
      UserProfile,
      UserBookMark,
  },
  data () {
    return {
      // firestore load wait
      loaded: false,
      // bookmark, uid, visit, visitCnt, created_at
      userData: [],
      spark: {
        labels: [],
        value: [],
        cnt: 0,
      },
      date: null,
    }
  },
  created() {
    this.setDate()
    this.getView()
  },
  watch:{
    $route() {
      this.loaded = false
      this.getView()
    }
  },
  methods: {
    // get user view data
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
      this.date = today
    },
    getData() {
      let data = this.userData.visit.sort()
      // view 카운트 초기화
      this.spark = {
        labels: [],
        value: [],
        cnt: 0,
      }
      // 길이 7로 slice
      let i = 0
      if (data.length < 7) {
        i = 0
      } else {
        i = data.length - 7
      }
      // view setting
      for (i; i < data.length; i++) {
        this.spark.labels.push(data[i].split('.')[0].substring(4, 8))
        this.spark.value.push(Number(data[i].split('.')[1]))
        this.spark.cnt += Number(data[i].split('.')[1])
      }
      console.log('spark', this.spark)
    },
    async getView() {
      this.userData = await FirebaseServices.getVisitView(this.$route.params.userId)
      console.log('call', this.userData)
      if (this.userData.uid === this.$store.state.firebaseUser.uid) {
        this.userData.inUser = true
      } else {
        // 유저가 다를경우 view 카운트
        this.userData.inUser = false
        this.cntView(this.userData.visit)
      }
      // 하위 컴포넌트에 전달할 데이터
      this.getData()
      this.loaded = true
    },
    // view counting
    cntView(data) {
      let _target = false
      for (let i=0; i < data.length; i++) {
        // 동일한 날짜일 경우 cnt++
        if (data[i].split('.')[0] == this.date) {
          _target = true
          let visitCnt = Number(data[i].split('.')[1]) + 1
          this.userData.visit[i] = data[i].split('.')[0] + '.' + visitCnt
          this.updateView(this.userData.visit)
        }
      }
      // 날짜 없는 경우
      if(!_target) {
        this.userData.visit.push(this.date + '.' + 1)
        this.updateView(this.userData.visit)
      }
    },
    // view count update
    async updateView(viewResult) {
      await FirebaseServices.updateUserView(this.$route.params.userId, viewResult)
    },
  }
}
</script>

<style scoped>
  
</style>