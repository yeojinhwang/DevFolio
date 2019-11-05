<template>
<div>
    <!-- user profile -->
    <v-layout row mt-5>
        <v-flex md4>
            <v-card flat color="transparent">
                <v-avatar size="256" class="profileImg">
                    <img :src="photoURL ? photoURL:this.$store.state.imgSrc.noImgSrc" alt="avatar">
                </v-avatar>
                <div>
                    <v-btn small>My portfolio</v-btn>

                    <UserProfileBtn :photoURL="photoURL" :displayName="displayName"/>
                </div>
            </v-card>
        </v-flex>

        <v-flex md8>
            <v-card>
                <v-card-text>유저 상태정보(권한 등)</v-card-text>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">포트폴리오 제작 현황</h3>

                        <div class="complate-box">
                            <div class="back-circle"></div>
                            <canvas class="front-circle"></canvas>
                            <h3 class="text-circle">{{percent+'%'}}</h3>
                        </div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
    <!-- user book mark list-->
    <div class="my-5">
        <p style="font-size: 2rem;">BOOKMARK</p>
        <v-layout row wrap>
            <v-flex>
                <carousel per-page="3">
                    <slide v-for="bookmark in bookmarkList" class="px-2">
                        <hr>
                        <p><a :href="bookmark.addr" class="bookmark-link">{{bookmark.uid}}</a></p>
                        <v-card>
                            <v-img :src="bookmark.img" height="200px">
                            </v-img>

                            <v-card-title primary-title>
                                <div>
                                    <div class="headline">{{ bookmark.title }}</div>
                                    <div>
                                        <tr>
                                            <td v-for="hashtag in bookmark.hashtags">
                                                <v-chip color="teal" text-color="white">
                                                <v-avatar>
                                                    <v-icon>check_circle</v-icon>
                                                </v-avatar>
                                                {{ hashtag }}
                                                </v-chip>
                                            </td>
                                        </tr>
                                    </div>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat color="purple">Explore</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </slide>
                </carousel>
            </v-flex>
        </v-layout>
    </div>
    <!-- user comments -->
    <userComment :userUid="" , :myUid=""></userComment>
</div>
</template>

<script>
import firebase from 'firebase'
import FirebaseServices from '../services/FirebaseServices'
import UserProfileBtn from './UserProfileBtn.vue'
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: 'UserProfile',
    components: {
        UserProfileBtn,
        Carousel,
        Slide
    },
    data () {
        return {
            dialog: false,
            photoURL: this.$store.state.firebaseUser.photoURL,
            bookmarkList: [],
            percent: 70
        }
    },
    created() {
        this.viewProfile()
        this.viewBookmark()

    },
    mounted(){
        this.getPortfolio()
        this.makeChart()
    },
    methods: {
        viewProfile: function() {
            this.photoURL = this.$store.state.firebaseUser.photoURL
        },
        viewBookmark:function() {
            // var bookmarks = await FirebaseServices.getPortfolios();
            // var user = await FirebaseServices.currentUser();
            // for (let book in bookmarks) {
            //     if (user.bookmark.includes(bookmarks[book].pk)) {
            //         this.bookmarkList.push(bookmarks[book])
            //     }
            // }
            let th = this
            firebase.auth().onAuthStateChanged(async function(user){
                th.bookmarkList = await FirebaseServices.getBookMarkFromUid(user.uid) 
                console.log("UserProfile th.bookmarkList: ",th.bookmarkList)           
            })
        },
        makeChart: function(){
            var cc = document.querySelector('.front-circle')
            let r = 75
            var ctx = cc.getContext("2d")
            ctx.beginPath();
            ctx.arc(r*2, r, r-10, 2 * Math.PI*0.75, 2 * Math.PI*(this.percent/100-0.25));
            ctx.lineWidth = 20
            ctx.strokeStyle = 'blue'
            ctx.stroke();
        },
        async getPortfolio(){
            console.log('test')
            var user = await FirebaseServices.currentUser();
            if(user){
                console.log(user.uid);
            }
            else{
                console.log('유저정보 가져오기 실패');
            }
            let portfolio = await FirebaseServices.getPortfolio(user.uid);
            console.log("test"+portfolio.type)
            let count =0;
            let totalCount =3;
            totalCount+= (8*portfolio.portfolios.length);
            totalCount+= (3*portfolio.skills.length);
            if(portfolio.aboutme!='') count++;
            if(portfolio.hashtags.length!=0) count++;
            if(portfolio.type!=0) count++;
            let temp = portfolio.portfolios;
            for(let i=0; i<portfolio.portfolios.length;i++){
                if(temp[i].content!='') count++;
                if(temp[i].demo_url!='') count++;
                if(temp[i].git.length!=0) count++;
                if(temp[i].ie_support!='') count++;
                if(temp[i].img!='') count++;
                if(temp[i].repos_url!='') count++;
                if(temp[i].title!='') count++;
                if(temp[i].viewport!='') count++;
            }
            let temp2 = portfolio.skills;
            for(let i=0; i<temp2.length;i++){
                if(temp2[i].description !='') count++;
                if(temp2[i].level !=0) count++;
                if(temp2[i].skillname !='') count++;
            }
            console.log(count);
            console.log(totalCount);
            this.percent = Math.round((count/totalCount)*100);
            console.log(this.percent);
            var val = this.percent;

            var $circle = $('#svg .cir');
            var r = $circle.attr('r');
            var per = Math.round(((100 - val) / 100) * Math.PI * r * 2);

            $circle.css({
                strokeDashoffset: per
            });
        }

    }
}
</script>

<style>
.profileImg {
  margin: 10px;
}
#svg .cir{
  stroke-dasharray: 628;
  stroke-dashoffset:628;
  transition: stroke-dashoffset 1s linear;
}
#svg {
   transform: rotate(-90deg);
}

#mypercent {
  position: absolute;
  margin-top: 3.4em;
  margin-left: -4.7em;
  text-align: center;
  font-size: 40px;

}
    /*  chart ------------------------ */
    .complate-box{
        width:100%;
        height:250px;
        background-color: rgb(26, 188, 156);
        display:inline-block;
        position: relative;
    }
    .back-circle, .front-circle, .text-circle{
        display:block;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        margin:0;
    }
    .text-circle{
        font-size:30px;
    }
    .back-circle{
        border:20px solid gray;
        height:150px;
        width:150px;
        border-radius: 75px;
    }
    .front-circle{
        height:150px;
        width:300px;
        border-radius: 75px;
    }

.bookmark-link, .bookmark-link:visited, .bookmark-link:link{
    color:purple;
}
</style>
