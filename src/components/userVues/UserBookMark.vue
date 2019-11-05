<template>
  
  <v-container class="my-5">
    <p style="color: #2c3e50; font-size: 3rem; font-family: 'Jua', sans-serif; margin-bottom: 0;">BOOKMARKS</p>
    <v-card>
    <v-layout row wrap class="mt-3" v-show="inMark">
        <v-flex>
            <carousel :per-page="pageNum">
                <slide v-for="bookmark in bookmarkList" class="px-2">
                    <hr>
                    <!--<p><a :href="bookmark.addr" class="bookmark-link">Explore</a></p>-->
                    <v-card>
                        <v-img :src="bookmark.banner.img" height="200px"></v-img>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">
                                  {{ bookmark.title.content }}
                                  
                                  <div v-show="inUser"> 
                                    <v-icon v-if="bookmark.like" class="mx-2" color="warning" @click="enrollLike(bookmark.pk)">star</v-icon>
                                    <v-icon v-else class="mx-2" @click="enrollLike(bookmark.pk)">star</v-icon>
                                  </div>
                                </div>
                                <div>
                                    <tr>
                                        <td v-for="portfolios in bookmark.portfolios">
                                          <div v-for="hashtag in portfolios.hashtags">
                                            <v-chip color="teal" text-color="white">
                                            <v-avatar>
                                                <v-icon>check_circle</v-icon>
                                            </v-avatar>
                                              {{ hashtag }}
                                            </v-chip>
                                          </div>
                                        </td>
                                    </tr>
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn :to="bookmark.addr" flat color="purple">Explore</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </slide>
            </carousel>
        </v-flex>
    </v-layout>
    
    <!-- no bookmark -->
    <v-layout class="mt-3 noMark" v-show="!inMark">
      <p class="display-2 noMarkText">북마크가 없어요<v-icon class="iconSize">fas fa-exclamation-circle</v-icon></p>
    </v-layout>
    </v-card>
  </v-container>
  
</template>

<script>
import firebase from 'firebase'
import FirebaseServices from '../../services/FirebaseServices'
import { Carousel, Slide } from 'vue-carousel';


export default {
  name: 'UserBookMark',
  components: {
    Carousel,
    Slide,
  },
  data () {
    return {
      // 
      inUser: false,
      // loading
      inMark: false,
      pageNum: 3,
      // 북마크 저장용
      bookmarkList: [],
      myList: [],
      user: null,
      userData: []
    }
  },
  created() {
    this.getBookmarks()
  },
  watch: {
    $route() {
      this.getBookmarks()
    }
  },
  methods: {
    // 북마크한 포트폴리오 가져오기
    getBookmarks: function() {
      let __this = this
      firebase.auth().onAuthStateChanged(async function(user){
        __this.user = __this.$route.params.userId
        var portfolios = await FirebaseServices.getPortfolios();
        __this.userData = await FirebaseServices.getUserData(__this.user);
        console.log('__this.userData', __this.userData)
        // 저장된 북마크 array 이름이 bookmarks일 때 => 
        __this.myList = __this.userData.bookmarks;

        if (__this.myList.length == 0) {
          __this.inMark = false
        } else {
          __this.inMark = true
          for (let port in portfolios) {
            if (__this.myList.includes(portfolios[port].pk)) {
              portfolios[port].addr = '/portfoliopage/' + portfolios[port].pk
              portfolios[port].like = true;
              __this.bookmarkList.push(portfolios[port]);
            }
          }
        }
      })
    },
    // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
    enrollLike(pk) {
      for (let bookmark in this.bookmarkList) {
        if (this.bookmarkList[bookmark].pk === pk) {
          if (this.bookmarkList[bookmark].like === true) {
            this.bookmarkList[bookmark].like = false
            var index = this.myList.indexOf(pk)
            this.myList.splice(index, 1)
            FirebaseServices.updateUserBookmark(this.user, pk, false)
          } else {
            this.bookmarkList[bookmark].like = true
            this.myList.push(pk)
            FirebaseServices.updateUserBookmark(this.user, pk, true)
          }
        }
      }
    },
    viewBookMarks() {
      if (this.$store.state.firebaseUser.uid === this.$route.params.userId) {
        this.inUser = true
      } else {
        this.inUser = false
      }
    }
  }
}
</script>

<style scoped>
.noMark {
  height: 17em;
}
.noMarkText {
  margin: auto;
}
.iconSize {
  font-size: 50px;
}
</style>

