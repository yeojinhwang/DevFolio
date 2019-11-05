<template>
<div>
    <BackBanner>
        <div slot="pageName">
            <p class="mainBackBanner" style="font-family: 'Jua', sans-serif; font-size: 4rem;" v-if="ifsearch">Search Results</p>
            <p class="mainBackBanner" style="font-family: 'Jua', sans-serif; font-size: 4rem;" v-if="!ifsearch">Portfolio Explorer</p>
        </div>
    </BackBanner>

    <div style="display:flex; position:relative;" v-if="prnok">
        <v-navigation-drawer permanent>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                        <i class="fas fa-sliders-h" style="margin-left: 1rem; color: #AF7995;"></i><span style="font-weight: bolder; margin-left: 1rem; color: #AF7995;">Filter</span>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list dense class="pt-0">
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div style="font-size: 1.3rem;"><i class="fab fa-slack-hash pr-3"></i>hash</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <li style="margin-left: 1rem;" class="tag-list" v-for="(elem,tag) in hashDict" @click="tagcheck(elem,tag)" :id="tag">
                                    <span v-show="elem['check']"><i class="fas fa-check-square" style="color: #005caf;"></i></span>
                                    <span v-show="!elem['check']"><i class="far fa-square" style="color: #005caf;"></i></span>
                                    <span style="font-size: 1.3rem;">&nbsp&nbsp{{tag}}</span>
                                </li>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content  v-for="(SelectMain , mainName) in SelectDictDict">
                        <template v-slot:header>
                            <div style="font-size: 1.2rem;"><i class="fas fa-folder-open pr-3"></i>{{mainName}}</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <li style="margin-left: 1rem;" class="tag-list" v-for="(elem,tag) in SelectMain" @click="tagcheck(elem,tag,mainName)">
                                    <span v-show="elem['check']"><i class="fas fa-check-square" style="color: #005caf;"></i></span>
                                    <span v-show="!elem['check']"><i class="far fa-square" style="color: #005caf;"></i></span>
                                    <span style="font-size: 1.2rem;">&nbsp&nbsp{{tag}}</span>
                                </li>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>

                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div style="font-size: 1.3rem;"><i class="fas fa-filter pr-3"></i>sort</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-radio-group v-model="radios" :mandatory="false">
                                    <li style="margin-left: 1rem;" class="tag-list" @click="sortup = true">
                                        <span v-show="sortup"><i class="far fa-dot-circle" style="color: #005caf;"></i></span>                                       
                                        <span v-show="!sortup"><i class="far fa-circle" style="color: #005caf;"></i></span>
                                        <span style="font-size: 1.2rem;">&nbsp&nbsp오름차순</span>
                                    </li>
                                    <li style="margin-left: 1rem;" class="tag-list" @click="sortup = false">
                                        <span v-show="!sortup"><i class="far fa-dot-circle" style="color: #005caf;"></i></span>                                       
                                        <span v-show="sortup"><i class="far fa-circle" style="color: #005caf;"></i></span>
                                        <span style="font-size: 1.2rem;">&nbsp&nbsp내림차순</span>
                                    </li>
                                </v-radio-group>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-list>
        </v-navigation-drawer>
        <!-- list -->
        <v-container style="margin-left: 2rem; margin-top: 2rem; margin-bottom: 3rem;" v-if="folios.length != 0 && (tagoutList.length != 0 || tagCheckNum == 0)">
            <v-layout v-if="ifsearch">
                <v-flex>
                    <p style="font-size: 2rem; font-family: 'Jua', sans-serif;">"{{search_input}}"의 검색 결과입니다.</p>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4 class="px-2" v-for="user in folios" v-if="tagCheckNum == 0">
                    <folioCard :result="user" :me="me" :updateSignal="cardUpdateSignal" style="height:100%;"/>
                </v-flex>
                <v-flex xs4 class="px-2" v-for="user in tagoutList" v-if="tagCheckNum != 0">
                    <folioCard :result="user" :me="me" :updateSignal="cardUpdateSignal"/>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- 검색 결과가 없을 때 -->
        <v-container style="margin-top: 2rem; margin-bottom: 3rem;" v-if="folios.length == 0 || tagoutList.length == 0 && tagCheckNum != 0">
            <p style="font-size: 3rem; font-family: 'Jua', sans-serif;">검색 결과가 없습니다.</p>
        </v-container>
        
    </div>
</div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import Firebase from '@/services/FirebaseServices.js'
import firebase from 'firebase/app'
import newFooter from '@/components/newFooter.vue'
import folioCard from '@/components/portfoliosVues/portfolioCard.vue'


export default {
    name:'mainPortfolioPage',
    components:{
        BackBanner,
        Firebase,
        newFooter,
        folioCard,
    },
    data(){
        return{
            me:{},
            folios:[],

            tagCheckNum:0,
            tagoutList:[],

            ifHash:false,
            hashDict:{},

            SelectIfDict:{},
            SelectDictDict:{},
                      

            ifsort:false,
            sortup:false,

            ifsearch:false,
            search_input:'no search',

            cardUpdateSignal:0,

            prnok:true,
        }
    },
    async created(){
        let th = this
        this.routeName = this.$route.name

        this.settingMe(th)

        // console.log("route : ",this.$route)

        //검색 여부 확인
        if(this.$route.name == "search"){
            this.search_input = this.$route.params.search_value
            this.ifsearch = true
        }

        this.readFolio(th)     
    },
    methods:{
        // user 정보 불러 오기
        settingMe:async function(th){
            await firebase.auth().onAuthStateChanged(function(user) {
                // console.log("main folio user : ",user)
                if(user && user.uid){
                    Firebase.getUserData(user.uid).then(function(data){
                        if(data){
                            th.me = data
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
        // portfolio 목록, tag 목록 불러오기
        readFolio: async function(th){
            await Firebase.getPortfolios(this.ifsearch, this.search_input).then(function(data){
                // console.log(" th.folios data: ", data)
                // portfolio 목록 생성
                th.folios = data

                // hash 태그 목록 생성
                for(let i=0;i<th.folios.length;i++){
                    //portfolio 데이터 추출
                    let post = th.folios[i]
                    for(let ii=0;ii<post.portfolios.length;ii++){
                        //portfolio 안에 있는 portfolios 데이터 추출
                        let folio = post.portfolios[ii]
                        for(let j=0;j<folio.hashtags.length;j++){
                            //hash tag 추출 
                            let tag = folio.hashtags[j]
                            if(typeof(tag) != 'string') continue

                            //hash tag 사전에 각각의 portfolio 저장
                            if(th.hashDict[tag]){
                                th.hashDict[tag].push(post)
                            }
                            else{
                                th.hashDict[tag] = [post]
                                th.hashDict[tag]['check'] = false
                                th.hashDict[tag]['name'] = tag
                            }
                        }
                    }
                }

                // selected 태그 사전 작성
                for(let i=0;i<th.folios.length;i++){
                    let post = th.folios[i]
                    let seleteDict = th.folios[i].userData.selected // selected 분류 추출

                    for(let seleter in seleteDict){
                        if(!th.SelectDictDict[seleter]){ //새로운 selected 분류 발견
                            th.SelectDictDict[seleter] = {}
                            th.SelectIfDict[seleter] = false
                        }
                        let selectList = seleteDict[seleter]
                        for(let j=0; j<selectList.length; j++){
                            let selectName = selectList[j]
                            if(typeof(selectName) != 'string') continue
                            // selected 사전에 해당하는 portfolio 저장
                            if(th.SelectDictDict[seleter][selectName]){
                                th.SelectDictDict[seleter][selectName].push(post)
                            }
                            else{
                                th.SelectDictDict[seleter][selectName] = [post]
                                th.SelectDictDict[seleter][selectName]['check'] = false
                                th.SelectDictDict[seleter][selectName]['name'] = selectName
                            }
                        }
                    }
                }

                // ---------------------------------------------------
                // make tag DB
                if(!th.ifsearch){ // main portfolio page에서만 DB 제작
                    let inputDB = {}

                    for(let hashName in th.hashDict){// server 전송용 hasg tag DB 제작
                        let hash = th.hashDict[hashName]
                        let outarr = []
                        for(let i=0; i<hash.length; i++){
                            outarr.push(hash[i].pk) // 각각의 tag에 해당하는 포트올리오의 id 저장
                        }
                        //출력할 색상, 테그의 실제 위치, 테그가 저장된 portfolio 저장
                        let out = {color:'teal',addr:'portfolios/portfilios/hashtags',portfolios:outarr} 
                        // hashName = hashName.replace(' ','_')
                        inputDB[hashName] = out
                    }

                    // selected 테그 DB 생성
                    for(let mainName in th.SelectDictDict){
                        // selected 분류 추출
                        let mainSelect = th.SelectDictDict[mainName]
                        for(let selectName in mainSelect){
                            // sleected 테그 추출
                            let select = mainSelect[selectName]
                            let outarr = []
                            for(let i=0; i<select.length; i++){
                                outarr.push(select[i].pk)
                            }

                            let out = {}
                            if(mainName == 'career'){
                                out = {color:'red',addr:'userData/selected/career',portfolios:outarr}
                            }
                            else if(mainName == 'recruit'){
                                out = {color:'blue',addr:'userData/selected/recruit',portfolios:outarr}
                            }
                            else if(mainName == 'tool'){
                                out = {color:'black',addr:'userData/selected/tool',portfolios:outarr}
                            }
                            
                            // selectName = selectName.replace(' ','_')
                            inputDB[selectName] = out
                        }
                    }

                    // console.log("tag DB : ",inputDB)

                    //firebase DB에 테그 DB 전송
                    Firebase.setTagsDBall(inputDB)
                }
                    
                // ---------------------------------------------------

                //각각의 portfolio card 컴포넌트에 완성 신호 전송
                th.cardUpdateSignal += 1
                // portfolio card 이름 순 정렬
                th.sortPortfolio(th.sortup)
            })
            .catch(function(error){
                console.log("Firebase.getPortfolios() error : ",error)
            })
        },

        // 각각의 테그에 해당하는 portfolio만 화면애 출력
        tagcheck:function(tag, tag_name){ //선택한 테그와 테그의 이름
            console.log("tagcheck this.tagoutList : ",this.tagoutList)
            console.log("tagcheck this.hashDict : ",this.hashDict)
            // console.log("tagcheck this.SelectDictDict : ",this.SelectDictDict)

            tag['check'] = !tag['check'] //테그의 체크 아이콘 출력 변경
            this.tagCheckNum += tag['check'] ? 1:-1 //지금까지 선택한 테그의 갯수 계산
            
            if(this.tagCheckNum == 0){ //선택한 테그가 없으면 테그 출력 리스트 제거
                this.tagoutList = []
            }
            else if(tag['check'] && this.tagCheckNum == 1){ // 선택한 테그가 1개이면 테그 목록 출력
                // console.log("solo tag : ",tag)
                for(let i=0; i<tag.length; i++){
                    this.tagoutList.push(tag[i])
                }
            }
            else if(tag['check']){ // 해당 테그가 없는 포트폴리오를 출력 목록에서 제거
                for(let i=0; i<this.tagoutList.length; i++){
                    let nowUser = this.tagoutList[i]
                    let len = this.tagoutList.length
                    if(!this.ifelemInList(nowUser, tag)){
                        console.log("tag check this.hashDict : ",this.hashDict)
                        this.tagoutList[i] = this.tagoutList[len-1]
                        i-=1
                        this.tagoutList.pop()
                        if(this.tagoutList.length == 0) return 0
                    }
                }
            }
            else if(!tag['check']){ 
                for(let i=0; i<this.folios.length; i++){
                    if(this.ifelemInList(this.folios[i] ,this.tagoutList )) continue
                    let inputok = true
                    let folioTags = this.searchTagInFolio(this.folios[i])
                    for(let other in this.hashDict){
                        let otherTag = this.hashDict[other]
                        if(!otherTag['check']) continue
                        if(!this.ifelemInList(otherTag.name ,folioTags)){
                            inputok = false
                            break 
                        }
                    }
                    if(inputok){
                        for(let selectMainName in this.SelectDictDict){
                            let selectMain = this.SelectDictDict[selectMainName]
                            folioTags = this.searchTagInFolio(this.folios[i],  true,  selectMainName)
                            for(let selectName in selectMain){
                                let select = selectMain[selectName]
                                if(!select['check']) continue
                                if(!this.ifelemInList(selectName ,folioTags)){
                                    inputok = false
                                    break 
                                }
                                if(!inputok) break 
                            }
                        }
                    }

                    if(inputok) this.tagoutList.push(this.folios[i])
                }
            }

            this.prnok = false
            this.prnok = true
            this.cardUpdateSignal += 1
            // console.log("tag : ",tag)
        },
        checkFolioUid:function(uid){
            for(let i=0;i<this.folios.length;i++){
                let folio = this.folios[i]
                if(uid == folio.pk) return true
            }
            return false
        },
        searchUid(uid){
            for(let j=0;j<this.folios.length;j++){
                if(this.folios[j].pk == uid) return this.folios[j]
            }
            return false
        },
        searchTagInFolio(post , isSelect=false, selectName=''){
            let out = []
            if(!isSelect){
                for(let i=0;i<post.portfolios.length;i++){
                    let folio = post.portfolios[i]
                    for(let j=0;j<folio.hashtags.length;j++){
                        out.push(folio.hashtags[j])
                    }
                }
                return out
            }
            else if(post.userData && post.userData.selected){
                let userTags = post.userData.selected[selectName]
                for(let i=0; i<userTags.length; i++){
                    out.push(userTags[i])
                }
            }
                
            return out                
        },
        ifelemInList(elem,list){
            for(let i=0; i<list.length; i++){
                if(list[i] == elem) return true
            }
            return false
        },
        turnSelectIf(dict,name){
            dict[name] = !dict[name]
            this.prnok = false
            this.prnok = true
        },
        // 이름순 정렬 -------------------------------------------------------
        sortPortfolio:function(up){
            // this.folios[2].id
            // this.folios.sort()
            this.folios.sort(this.comparefolio)
            if(!up) this.folios.reverse()
            this.cardUpdateSignal += 1
        },
        comparefolio:function(a,b){
            let str1 = a.pk
            let str2 = b.pk

            return str1.localeCompare(str2)
        },
    },
    watch:{
         sortup:function(){
             this.sortPortfolio(this.sortup)
         },
         '$route.name':function(){
             window.location.reload()
         }
    }

}
</script>

<style lang="scss" scoped>
.mainBackBanner{
    font-size: 3rem; 
    font-weight: 300; 
    letter-spacing: 0.08rem; 
    text-shadow: 2px 2px 2px #103b5b; 
    color: white;
}

.foliolist{
    display: grid;
    margin:30px 0 30px 40px;
    width:70%;
    // border:2px solid black;
    grid-template-columns: 32% 32% 32%;
}

.folio{
    // height:500px;
    width:90%;
    margin:10px auto;
}
.folioLink{
    color:blueviolet;
}

.resultOut{
    text-align: center; 
    font-size: 2rem; 
    font-weight: 300; 
    margin-top: 3rem; 
    margin-bottom: 5rem;
}

.sidebar{
    // position: absolute;
    width:300px;
    min-height:200px;
    border:1px solid red;
    background-color: white;
    top:20%;
    left:0;
}
.sidebar-part{
    position: relative;
    min-height: 4em;
    text-align: left;
}
.tag-title{
    display: inline-block;
    font-size:2em;
    margin-left: 2em;
    
}
.open-btn{
    float: right;
    padding:0 1em;
    margin-right:1em;
    font-size:2em;
    cursor:pointer
}
.tag-list{
    font-size: 1.3em;
    cursor:pointer
}

</style>

