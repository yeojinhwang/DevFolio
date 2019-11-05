<template>
<div v-if="isshow">
    <v-card class="card-body">
        <div>
            <v-img class="white--text" :src="result.banner.img" :alt="result.pk" style="width: 100%; height: 20rem; object-fit: cover;">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline" style="font-family: 'Jua', sans-serif;">{{ result.title.content }}</span>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-img>
        </div>
        <v-card-text>
            <div class="text-center">
                <div style="font-weight: 600;" class="text-center">
                    <span style="font-family: 'Jua', sans-serif; font-size: 1.5rem;" v-if="userData">{{ userData.displayName }}</span>
                    <v-icon v-if="islike && isbookmark" class="mx-2" color="warning" @click="enrollLike()">star</v-icon>
                    <v-icon v-if="!islike && isbookmark" class="mx-2" @click="enrollLike()">star</v-icon>
                </div>
                <div>
                    <span v-for="hashtag in taglist">
                        <v-chip color="#00bfdd" text-color="white">
                            <v-avatar style="margin-right: 0;">
                                <i class="fab fa-slack-hash"></i>
                            </v-avatar>
                            <span style="font-family: 'Jua', sans-serif; font-size: 1.2rem;">{{ hashtag }}</span>
                        </v-chip>
                    </span>

                    <span v-if="result.userData.selected">
                        <span v-for="career in result.userData.selected.career">
                            <v-chip color="#8dca35" text-color="white">
                                <v-avatar style="margin-right: 0;">
                                    <i class="fab fa-slack-hash"></i>
                                </v-avatar>
                                <span style="font-family: 'Jua', sans-serif; font-size: 1.2rem;">{{ career }}</span>
                            </v-chip>
                        </span>
                        <span v-for="recruit in result.userData.selected.recruit">
                            <v-chip color="#ff702a" text-color="white">
                                <v-avatar style="margin-right: 0;">
                                    <i class="fab fa-slack-hash"></i>
                                </v-avatar>
                                <span style="font-family: 'Jua', sans-serif; font-size: 1.2rem;">{{ recruit }}</span>
                            </v-chip>
                        </span>
                        <span v-for="tool in result.userData.selected.tool">
                            <v-chip color="#39CCCC" text-color="white">
                                <v-avatar style="margin-right: 0;">
                                    <i class="fab fa-slack-hash"></i>
                                </v-avatar>
                                <span style="font-family: 'Jua', sans-serif; font-size: 1.2rem;">{{ tool }}</span>
                            </v-chip>
                        </span>
                    </span>
                </div>
            </div>
        </v-card-text>
        <!-- 해당 포트폴리오 페이지로 이동 -->
        <div class="text-center">
            <v-btn class="ma-2" outline color="indigo" :to="userAddr">Explore</v-btn>
        </div>
    </v-card>
</div>
</template>


<script>
import FirebaseService from '@/services/FirebaseServices'
import Loading from 'vue-loading-overlay';
import FirebaseServices from '../../services/FirebaseServices';
import firebase from 'firebase/app'

export default {
    name:'folioCard',
    components: {
        Loading
    },
    props:{
        result:{type:null},
        me:{type:null},
        updateSignal:{type:null},
    },
    data(){
        return{
            islike:false,
            isshow:true,
            isbookmark:true,

            taglist:[],
            userAddr:'/portfoliopage/',
            userData: null
        }
    },
    created(){
        this.reboot()
    },
    methods: {
        async reboot(){
            // console.log("card route : ",this.$route)
            let __this = this;
            if(this.$route.name == 'home') this.isbookmark = false
            this.userData = await FirebaseServices.getVisitView(this.result.uid)
            this.checkme()
            this.makeTagList()
            this.makeAddr()
            console.log(this.result)
            if (this.result.banner.img.substring(0, 8) !== 'https://') {
                var storage = firebase.storage();
                var storageRef = storage.ref();
                storageRef.child('users/' + this.userData.uid + '/' + this.result.banner.theme).getDownloadURL().then(function(url) {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                    }
                    xhr.open('GET', url)
                    xhr.send();
                    __this.result.banner.img = url;
                })
            }
            this.isshow = false
            this.isshow = true
        },
        // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        enrollLike() {
            // console.log("islike: ",this.islike)
            // console.log("enrollLike result: ",this.result)

            if(this.me && this.me.uid != this.result.pk){
                FirebaseServices.updateUserBookmark(this.me.uid, this.result.pk,!this.islike)
                this.islike = !this.islike

                this.isshow = false
                this.isshow = true
            }
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        checkme(){
            this.islike = false
            if(this.me){
                let mybook = this.me.bookmarks
                if(mybook){
                    for(let i=0; i<mybook.length; i++){
                        let to = mybook[i]
                        if(to == this.result.pk) {
                            this.islike = true
                            break
                        }
                    }
                }
                    
            }
            this.isshow = false
            this.isshow = true
        },
        makeTagList:function(){
            this.taglist = []

            if(this.result && this.result.portfolios){
                let foliolist = this.result.portfolios
                for(let i=0;i<foliolist.length;i++){
                    let tags = foliolist[i].hashtags
                    for(let j=0;j<tags.length;j++){
                        let isok = true
                        for(let k=0;k<this.taglist.length;k++){
                            if(this.taglist[k] == tags[j]){
                                isok = false
                                break
                            }
                        }
                        if(isok) this.taglist.push(tags[j])
                    }
                }
            }
            this.isshow = false
            this.isshow = true
        },
        makeAddr:function(){
            this.userAddr = '/user/' + this.result.pk
            this.isshow = false
            this.isshow = true
        },
        emptySelectData:function(){
            if(!this.result.userData) this.result.userData = {'selected':{'career':[] , 'recruit':[] , 'tool':[]}}
            else if(!this.result.userData.selected) this.result.userData.selected = {'career':[] , 'recruit':[] , 'tool':[]}
            else if(!this.result.userData.selected.career) this.result.userData.selected.career = []
            else if(!this.result.userData.selected.recruit) this.result.userData.selected.recruit = []
            else if(!this.result.userData.selected.tool) this.result.userData.selected.tool = []
        },
    },
    watch:{
        me:function(){
            this.reboot()
        },
        updateSignal:function(){
            this.reboot()
        }
    }
}
</script>

<style lang="scss" scoped>
.card-body{
    height:100%;
}
.card-img{
    height:200px;
    width:auto;
    min-width: 1px;
}
</style>


