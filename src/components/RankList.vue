<template>
    <v-layout row wrap>
        <v-flex class="mx-5">
            <!-- 0729 err fix -->
            <carousel :per-page="pageNum">
                <slide v-for="folio in folios" class="px-2">
                    <folioCard :result="folio" :me="me" :updateSignal="cardUpdateSignal" style="height:100%;"/>
                </slide>
            </carousel>
        </v-flex>
        
    </v-layout>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import FirebaseFunc from '@/services/FirebaseServices.js'
    import folioCard from '@/components/portfoliosVues/portfolioCard.vue'
    import firebase from 'firebase/app'

    export default {
        name: 'RankList',
        components: {
            FirebaseFunc,
            Carousel,
            Slide,
            folioCard,
        },
        data() {
            return {
                pageNum: 3,
                folios: [],
                cardUpdateSignal:0,
                me:null
            }
        },
        created(){
            let th = this
            this.settingMe(this)
            FirebaseFunc.getPortfolios().then(function(data){
                th.folios = data
                th.cardUpdateSignal += 1
            })
            
        },
        methods:{
            settingMe:async function(th){
                await firebase.auth().onAuthStateChanged(function(user) {
                    // console.log("rank me : ",user)
                    if(user && user.uid){
                        FirebaseFunc.getUserData(user.uid).then(function(data){
                            // console.log("rank user data : ",data)
                            if(data){
                                th.me = data
                                console.log(user.displayName)
                                th.me['uid'] = user.uid
                                th.cardUpdateSignal += 1
                            }
                            else{
                                th.me = {'uid':user.uid}
                                th.cardUpdateSignal += 1
                            }
                        })
                    }
                })
            },
        }
    }

</script>


