<template>
    <v-container id="sideCtn">
        <!-- vuex에서 유저 이름을 가져와서 router로 연결 -->
        <!-- 로그인 상태확인 해서 보여줌 -->
        <div v-if="islogin">
            <img :src="me.photoURL" style="border-radius: 50%; height: 8rem; width: 8rem;">
            <h1 style="padding-top: 1rem; color: white;">{{ me.displayName }}</h1>
            <v-btn small @click="logoutUser" color="error">Logout</v-btn>
            <v-divider/>
            <v-btn active-class="active" flat block :to="{name: 'userpage', params: { userId: me.uid }}">My Page</v-btn>
        </div>
        <div v-if="!islogin">
            <!-- 로그인 되어 있으면 가림 -->
            <v-btn small color="info" to="/login">Sign in</v-btn>
            <v-divider/>
        </div>
        <div>
            <v-btn active-class="active" flat block to="/portfoliopage">my portfolio</v-btn>
            <v-btn active-class="active" flat block to="/Portfolios">other portfolio</v-btn>
            <!-- 제공되는 검색 기능 -->
            <v-flex>
                <!--<v-text-field label="Search" v-model="searchItem" v-on:keyup.enter="findItem" color="white" ></v-text-field>-->
                <v-autocomplete label="Search" :items="items"  v-model="searchItem" v-on:keyup.enter="findItem" color="white" >
                </v-autocomplete>
            </v-flex>
        </div>
    </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";
import firebase from 'firebase/app'

export default {
    name: "sideBarItems",
    data() {
        return {
            userImg: {
                bool: false,
                src: null
            },
            searchItem: '',
            tagDict: {},

            me : '',
            islogin : false,

            items:[],
        }
    },
    mounted() {
        this.$EventBus.$on('changePhoto', (URL) => {
        this.me.photoURL = URL
    })
    },
    async created(){
        let th = this
        firebase.auth().onAuthStateChanged(function(user){
            if(user && user.uid){
                th.islogin = true
                FirebaseServices.getUserData(user.uid).then(function(data){
                    th.me = data
                })
            }
        })

        this.tagDict = await FirebaseServices.getTagsAll()
        console.log("this.tagDict : ",this.tagDict)
        for (let item in this.tagDict) {
            this.items.push(item);
        }
        console.log("this.items : ",this.items)
        this.$EventBus.$on('changePhoto', (URL) => {
            store.commit('setPhotoURL', URL)
            this.userImg.bool = true
            this.userImg.src = URL
        })
    },
    methods: {
        closeDrawer(trigger) {
            this.$EventBus.$emit(trigger)
        },
        logoutUser() {
            FirebaseServices.logoutUser()
            this.islogin = false
            this.closeDrawer('Logout')
        },
        findItem: function() {
            // console.log(this.searchItem)

            this.$router.push("/search/" + this.searchItem.replace(' ','_'))
            window.location.reload()
            this.searchItem = '';
        },
        writeTag: function(input){
            this.searchItem += ' '+input.trim().replace(' ','_')
        },
    }
};
</script>

<style scoped>
#sideCtn {
     margin-top: 70px;
}
.active {
    background-color: #4caf50;
}
</style>

