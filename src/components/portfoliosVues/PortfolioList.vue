<template lang="html">
    <div>
    <div v-if="listlayout === 'template1'">
    <section role="region" id="works" class="l-section" style="background-color: #fafafa;">
        <div class="l-section-holder">
            <h2 class="section-heading is-init">
                <span class="secondary">Portfolio</span>
                <span class="primar" id="prim">My works</span>
            </h2>
            <div id="portfolio" class="section-content gallery alternate" v-for="(item, index) in portfolios.portfolios" style="margin-top: 3rem;">
                <v-card>
                <v-card-text role="article" id="work1" class="gallery-item is-init is-animated" data-animation="fade-left">
                    <figure role="group" class="gallery-figure">
                        <div class="gallery-image">
                        <img class="gallery-image-thumb" :src="item.imageNames" :alt="item.title" aria-describedby="work1Description" style="width: 100%;">

                        </div>
                        <figcaption class="gallery-caption">
                            <h3 class="gallery-title"><span id="listTitle"><p class="index">0</p><p class="index">{{ index+1 }}</p></span><span style="font-size: 2rem; padding-left: 1rem;">{{ item.title }}</span></h3>
                            <ul class="gallery-spec">
                                <li v-if="item.viewport !== null" class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">{{ item.viewport }}</span></li>
                                <li v-if="item.ie !== null" class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">{{ item.ie }}</span></li>

                            </ul>
                            <div id="work1Description" style="text-align: center;">
                                <p style="font-size: 1.5rem;">{{ item.description }}</p>
                            </div>
                            <div class="ui-group text-xs-center ml-5" >
                                <v-btn round class="listbutton" :color="btncolor" :href="item.demo" style="height: 3rem;  width: 8rem;" target="_blank" dark>Demo</v-btn>
                                <v-btn round class="listbutton" :color="btncolor" :href="item.repository" style="height: 3rem;  width: 8rem;" target="_blank" dark>Repos</v-btn>
                            </div>
                        </figcaption>
                    </figure>
                    <table class="gallery-table">
                        <thead>
                            <tr id="headname">
                                <th class="gallery-table-col category">Category</th>
                                <th class="gallery-table-col source">Source</th>
                                <th class="gallery-table-col keywords">Detailed</th>
                            </tr>
                        </thead>
                        <tbody v-if="item.sources.length < 1">
                            <tr style="text-align: center;">
                                <td style="text-align: center;"></td>
                                <td style="text-align: center;">no source code :(</td>
                                <td style="text-align: center;"></td>
                            </tr>
                        </tbody>
                        <tbody v-for="source in item.sources">
                            <tr>
                                <td v-if="source.category === 'css'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #8dca35; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'vue'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #00bfdd; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'html'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #ff702a; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'js'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #39CCCC; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'json'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #85144b; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'java'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #001f3f; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'c'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #FFDC00; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'c++'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #B10DC9; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'python'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #FFA500; color: white;">{{ source.category }}</span></td>
                                <td data-th="Source"><a :href="source.gitPath" target="_blank">{{ source.fileName }}</a></td>
                                <td data-th="Related Keywords">{{ source.fileDes }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-card-text>
                </v-card>
            </div>
        </div>
    </section>
    </div>

    <div v-else-if="listlayout === 'template2'" style="margin-bottom: 8rem;">
        <div id="title_on">
            <div style="background-color: #67ceeb; width: 1px; margin-top: 3rem; height: 10rem; margin-left: 50%; display: block;"></div>
            <h1 style="font-size: 9em; color:#8cddeb;">Work.</h1>

            <i style="top: -10px; font-size: 2rem; color: #aaa; font-weight: light;">Featured Work</i>
        </div>
        <div style="margin-top: 5rem;">
            <v-layout style="margin-left: 5rem; margin-right: 5rem;">
                <v-flex lg6 md6 sm6 v-for="item in portfolios.portfolios" style="padding-left: 0.5rem; padding-right: 0.5rem;">
                    <div class="container" @click="modal = true; viewPort(portfolios.portfolios.indexOf(item))">
                        <img :src="item.imageNames" alt="Avatar" class="image">
                        <div class="overlay">
                            <div class="text" style="font-family: 'Roboto', sans-serif; letter-spacing: 0.08rem;">{{ item.title }}</div>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </div>
        <!-- contents 를 보는 모달 -->
        <v-dialog v-model="modal" persistent>
            <v-card>
                <v-card-text>
                    <figure role="group" class="gallery-figure">
                        <figcaption class="gallery-caption">
                            <h3 class="gallery-title"><span id="listTitle"><p class="index">0</p><p class="index">{{ portidx+1 }}</p></span style="font-size: 2rem; padding-left: 1rem;">{{ portfolio.title }}</h3>
                            <ul class="gallery-spec">
                                <li v-if="portfolio.viewport !== null" class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">{{ portfolio.viewport }}</span></li>
                                <li v-if="portfolio.ie !== null" class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">{{ portfolio.ie }}</span></li>

                            </ul>
                            <div id="work1Description">
                                <p>{{ portfolio.description }}</p>
                            </div>
                            <div class="ui-group text-xs-center ml-5" >
                                <v-btn round class="listbutton" :color="btncolor" :href="portfolio.demo" style="height: 3rem;  width: 8rem;" target="_blank" dark>Demo</v-btn>
                                <v-btn round class="listbutton" :color="btncolor" :href="portfolio.repository" style="height: 3rem;  width: 8rem;" target="_blank" dark>Repos</v-btn>
                            </div>
                        </figcaption>
                    </figure>
                    <div class="gallery-image">
                        <img class="gallery-image-thumb" :src="portfolio.imageNames" :alt="portfolio.title" aria-describedby="work1Description" style="width: 100%;">
                    </div>
                    <table class="gallery-table">
                        <thead>
                            <tr id="headname">
                                <th class="gallery-table-col category">Category</th>
                                <th class="gallery-table-col source">Source</th>
                                <th class="gallery-table-col keywords">Detailed</th>
                            </tr>
                        </thead>
                        <tbody v-if="portfolio.sources.length < 1">
                            <tr style="text-align: center;">
                                <td style="text-align: center;"></td>
                                <td style="text-align: center;">no source code :(</td>
                                <td style="text-align: center;"></td>
                            </tr>
                        </tbody>
                        <tbody v-for="source in portfolio.sources">
                            <tr>
                                <td v-if="source.category === 'css'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #8dca35; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'vue'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #00bfdd; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'html'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #ff702a; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'js'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #39CCCC; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'json'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #85144b; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'java'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #001f3f; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'c'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #FFDC00; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'c++'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #B10DC9; color: white;">{{ source.category }}</span></td>
                                <td v-else-if="source.category === 'python'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: #FF4136; color: white;">{{ source.category }}</span></td>
                                <td data-th="Source"><a :href="source.gitPath" target="_blank">{{ source.fileName }}</a></td>
                                <td data-th="Related Keywords">{{ source.fileDes }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-layout style = "margin-bottom: 3rem;">
                    <v-flex>
                        <v-btn class="mx-auto" color="green darken-1" dark @click="modal = false">Close</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </div>
    
    <div class="editor">
        <!-- portfolio editor -->
        <v-navigation-drawer v-model="PortfolioDrawer" fixed temporary disable-route-watcher>
        <v-list dense>
            <v-expansion-panel>
                <!-- layout selector -->
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div><i class="fas fa-indent pr-3"></i>Layout</div>
                    </template>
                    <v-card>
                        <v-card-text>
                            <v-radio-group v-model="listlayout">
                                <v-radio label="List" value="template1" color="primary"></v-radio>
                                <v-radio label="Dialog" value="template2" color="primary"></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
                <!-- color selector -->
                <v-expansion-panel-content>
                    <template v-slot:header>
                    <div><i class="fas fa-palette pr-3"></i>Color</div>
                    </template>
                    <v-card>
                    <v-card-text>
                        <v-radio-group v-model="colorchip" row>
                            <v-layout>
                                <v-radio color="info" label="blue" value="blue" style="padding-right: 1.5rem;"></v-radio>
                                <v-radio color="success" label="green" value="green"></v-radio>
                            </v-layout>
                            <v-layout style="padding-top: 1rem;">
                                <v-radio color="indigo" label="indigo" value="indigo" style="padding-right: 0.6rem;"></v-radio>
                                <v-radio color="orange" label="orange" value="orange"></v-radio>
                            </v-layout>
                        </v-radio-group>
                    </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
                <!-- text ditor -->
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div><i class="fas fa-keyboard pr-3"></i>Contents</div>
                    </template>
                    <v-card>
                        <v-card-text v-for="port in portfolios.portfolios">
                            <v-hover>
                            <v-card @click="dialog = true; editPort(portfolios.portfolios.indexOf(port))" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" style="height: 15rem; width: 18rem; text-align: center;">
                                <v-img :src="port.imageNames" style="height: 12rem;"></v-img>
                                <span style="line-height: 3rem; vertical-align: middle;">{{port.title}}</span>
                            </v-card>
                            </v-hover>
                        </v-card-text>
                        <v-card-text>
                            <v-hover>
                            <v-card @click="dialog = true; addPort();" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" style="height: 15rem; width: 18rem; text-align: center;">
                                <i class="fas fa-plus fa-2x" style="color: grey; line-height: 15rem; vertical-align: middle;"></i>
                            </v-card>
                            </v-hover>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <div style="text-align: center; margin-top: 2rem;">
                <v-btn small color="primary" @click="saveAll(); PortfolioDrawer = false;">Save</v-btn>
            </div>
        </v-list>
        </v-navigation-drawer>

        <!-- contents editor -->
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title>
                    <span class="headline">PORTFOLIO</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="portfolio.title" label="Title"></v-text-field>
                    <v-text-area name="input-7-1" v-model="portfolio.description" label="Description"></v-text-area>
                    <v-text-field v-model="hashtag" label="Hashtag" v-on:keyup.enter="enrollTag()"></v-text-field>
                    <template>
                        <td v-for="(tag, index) in portfolio.hashtags">
                            <v-chip close color="teal" text-color="white" v-model="portfolio.hashtags[index]">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                {{ tag }}
                            </v-chip>
                        </td>
                    </template>
                    <v-text-field v-model="portfolio.viewport" label="ViewPort"></v-text-field>
                    <v-text-field v-model="portfolio.ie" label="IE"></v-text-field>
                    <v-text-field v-model="portfolio.demo" label="Demo Link"></v-text-field>
                    <v-text-field v-model="portfolio.repository" label="Repository Link"></v-text-field>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-left pt-3 pb-2">Category</th>
                                <th class="text-left">File Name</th>
                                <th class="text-left">Git Path</th>
                                <th class="texdt-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="pb-2" v-for="(item, index) in portfolio.sources">
                            <td>
                                <v-select
                                v-model="item.category"
                                :items="items"
                                label="Category"
                                solo
                                required
                                ></v-select>
                            </td>
                            <td>
                                <v-text-field
                                v-model="item.fileName"
                                label="File Name"
                                solo
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                v-model="item.gitPath"
                                label="Git Path"
                                solo
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                v-model="item.fileDes"
                                label="Description"
                                solo
                                ></v-text-field>
                            </td>
                            <td class="text-xs-center">
                                <v-btn color="error" fab small dark @click="removeSource(index)">
                                <v-icon>remove</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                            <tr class="pb-2">
                            <td>
                                <v-select
                                v-model="source.category"
                                :items="items"
                                label="Category"
                                solo
                                required
                                ></v-select>
                            </td>
                            <td>
                                <v-text-field
                                v-model="source.fileName"
                                label="File Name"
                                solo
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                v-model="source.gitPath"
                                label="Git Path"
                                solo
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                v-model="source.fileDes"
                                label="Description"
                                solo
                                ></v-text-field>
                            </td>
                            <td class="text-xs-center">
                                <v-btn color="teal" fab small dark @click="addSource()">
                                <v-icon>add</v-icon>
                                </v-btn>
                            </td>
                            </tr>
                        </tbody>
                        </v-simple-table>
                        <!-- image 추가하기 -->
                        <v-layout wrap justify-center>
                            <v-flex xs6 md6 lg6 d-flex>
                                <v-sheet
                                class="d-flex my-3"
                                color="teal lighten-3"
                                height="150"
                                :elevation="6"
                                id="drop-zone"
                                v-bind:class="[isDragging?'drag-over':'']"
                                v-on:dragover="isDragging=true"
                                v-on:dragenter="isDragging=true"
                                v-on:dragleave="isDragging=false"
                                >
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;"> 
                                    <p class="my-auto mx-auto">Drag and Drop image files</p>
                                </div>
                                <input type="file" @change="onChange" multiple style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100% opacity: 0;">
                                </v-sheet>
                            </v-flex>
                        </v-layout>
                        <v-layout v-if="portfolio.dumpImg !== null">
                            <v-flex class="px-3 py-3">
                                <img v-bind:src="portfolio.dumpImg" width="400rem" height="200rem">
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex>
                                <v-btn color="grey" @click="portfolio.dumpImg = null;">Reset</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false; save();">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
    </div>
</template>

<script>
import FirebaseServices from '@/services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfoliolist',
    data() {
        return {
            // firebase portfolios 컬렉션에서 가져온 데이터
            portfolios:[],
            portidx: null,
            PortfolioDrawer:false,
            // db에 저장해야 할 값
            listlayout: 'template1',
            colorchip: 'blue',
            //
            dialog: false,
            modal: false,
            idx: null,
            hashtag: null,
            items: ['html', 'css', 'vue', 'js', 'json', 'c', 'c++', 'java', 'python'],
            isDragging: false,
            btncolor: '#30b7e8',
            imageList: [],
            source: {
                category: null,
                fileName: null,
                gitPath: null,
                fileDes: null
            },
            portfolio: {
                title: null,
                description: null,
                viewport: null,
                ie: null,
                demo: null,
                hashtags: [],
                repository: null,
                sources: [],
                imageNames: null,
                dumpImg: null
            }
        }
    },
    props: ['userData'],
    mounted(){
        this.$EventBus.$on('Portfolio', () => {
            this.PortfolioDrawer = !this.PortfolioDrawer
        })
        this.$watch('userData', userData => {
            this.getPortfolio()
        })
        
    },
    watch: {
        colorchip: function() {
            if (this.colorchip === 'green') {
                document.getElementById('headname').style.backgroundColor = 'rgba(0, 151, 19, 0.05)';
                document.getElementById('listTitle').style.color = 'rgba(0, 151, 19, 0.6)';
                this.btncolor = 'rgba(0, 151, 19, 0.6)';
            } else if (this.colorchip === 'indigo') {
                document.getElementById('headname').style.backgroundColor = 'rgba(40, 53, 147, 0.05)';
                document.getElementById('listTitle').style.color = '#283593';
                this.btncolor = '#283593';
            } else if (this.colorchip === 'orange') {
                document.getElementById('headname').style.backgroundColor = 'rgba(251, 140, 0, 0.05)';
                document.getElementById('listTitle').style.color = '#FB8C00';
                this.btncolor = '#FB8C00';
            } else if (this.colorchip === 'blue') {
                document.getElementById('headname').style.backgroundColor = 'rgba(77,128,153,0.05)';
                document.getElementById('listTitle').style.color = '#30b7e8';
                this.btncolor = '#30b7e8';
            }
        }
    },
    methods:{
        async getPortfolio() {
            let __this = this;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            FirebaseServices.getMyPort(this.userData.uid).then(function(res) {
                __this.portfolios = res;
                __this.colorchip = __this.portfolios.foliotheme.color;
                __this.listlayout = __this.portfolios.foliotheme.layout;
                for (let item in __this.portfolios.portfolios) {
                    storageRef.child('users/' + __this.userData.uid + '/' + __this.portfolios.portfolios[item].imageNames).getDownloadURL().then(function(url) {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function(event) {
                            var blob = xhr.response;
                        }
                        xhr.open('GET', url)
                        xhr.send();
                        __this.portfolios.portfolios[item].imageNames = url;
                    })
                }
            }).then(function(res) {
                console.log(__this.portfolios.portfolios)
                if (__this.colorchip === 'green') {
                    document.getElementById('headname').style.backgroundColor = 'rgba(0, 151, 19, 0.05)';
                    document.getElementById('listTitle').style.color = 'rgba(0, 151, 19, 0.6)';
                    __this.btncolor = 'rgba(0, 151, 19, 0.6)';
                } else if (__this.colorchip === 'indigo') {
                    document.getElementById('headname').style.backgroundColor = 'rgba(40, 53, 147, 0.05)';
                    document.getElementById('listTitle').style.color = '#283593';
                    __this.btncolor = '#283593';
                } else if (__this.colorchip === 'orange') {
                    document.getElementById('headname').style.backgroundColor = 'rgba(251, 140, 0, 0.05)';
                    document.getElementById('listTitle').style.color = '#FB8C00';
                    __this.btncolor = '#FB8C00';
                }
            })
        },
        editPort(idx) {
            this.idx = idx;
            this.portfolio.title = this.portfolios.portfolios[idx].title;
            this.portfolio.description = this.portfolios.portfolios[idx].description;
            this.portfolio.viewport = this.portfolios.portfolios[idx].viewport;
            this.portfolio.ie = this.portfolios.portfolios[idx].ie;
            this.portfolio.demo = this.portfolios.portfolios[idx].demo;
            this.portfolio.hashtags = this.portfolios.portfolios[idx].hashtags;
            this.portfolio.repository = this.portfolios.portfolios[idx].repository;
            this.portfolio.sources = this.portfolios.portfolios[idx].sources;
            this.portfolio.imageNames = this.portfolios.portfolios[idx].imageNames;
            this.portfolio.dumpImg = this.portfolios.portfolios[idx].imageNames;
        },
        // 태그 추가하기
        enrollTag: function() {
            this.portfolio.hashtags.push(this.hashtag)
            this.hashtag = null
        },
        // 소스 추가하기
        addSource: function() {
            if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
                this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
                this.source.category = null
                this.source.fileName = null
                this.source.gitPath = null
                this.source.fileDes = null
            }
        },
        // 소스 지우기
        removeSource: function(idx) {
            this.portfolio.sources.splice(idx, 1)
        },
        // image view 만들기
        onChange(file) {
            this.isDragging = false
            let loadFile = file.target.files || file.dataTransfer.files

            if (loadFile.length == 0) {
                return
            }
            this.addViewImage(loadFile)
        },
        addViewImage: function(files) {
            let _this = this

            for (let i=0; i < files.length; i++) {
                let file = files[i]
                let reader = new FileReader()
                if (file.type.match(/image.*/)) {
                reader.onload = function(e) {
                    for (let j=0; j < files.length; j++) {
                    }
                    _this.portfolio.dumpImg = e.target.result;
                    console.log(_this.portfolio.dumpImg);
                }
                reader.readAsDataURL(file)
                _this.portfolio.imageNames = file.name
                _this.imageList.push(file)
                } else {
                alert('이미지 파일만 올려주세요.')
                }
            }
        },
        upload(user) {
            console.log(user)
            for (const image in this.imageList) {
                FirebaseServices.uploadfile(user, this.imageList[image])
            }
        },
        addPort() {
            this.idx = null;
            this.portfolio.title = null;
            this.portfolio.description = null;
            this.portfolio.viewport = null;
            this.portfolio.ie = null;
            this.portfolio.demo = null;
            this.portfolio.hashtags = [];
            this.portfolio.repository = null;
            this.portfolio.sources = [];
            this.portfolio.imageNames = [];
            this.portfolio.dumpImg = null;
        },
        viewPort(idx) {
            this.portidx = idx;
            this.portfolio.title = this.portfolios.portfolios[idx].title;
            this.portfolio.description = this.portfolios.portfolios[idx].description;
            this.portfolio.viewport = this.portfolios.portfolios[idx].viewport;
            this.portfolio.ie = this.portfolios.portfolios[idx].ie;
            this.portfolio.demo = this.portfolios.portfolios[idx].demo;
            this.portfolio.hashtags = this.portfolios.portfolios[idx].hashtags;
            this.portfolio.repository = this.portfolios.portfolios[idx].repository;
            this.portfolio.sources = this.portfolios.portfolios[idx].sources;
            this.portfolio.imageNames = this.portfolios.portfolios[idx].imageNames;
            this.portfolio.dumpImg = this.portfolios.portfolios[idx].imageNames;
        },
        async save() {
            if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
                this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
                this.source.category = null
                this.source.fileName = null
                this.source.gitPath = null
                this.source.fileDes = null
            }
            // 포트폴리오 저장하기
            if (this.idx !== null) {
                this.portfolios.portfolios[this.idx].title = this.portfolio.title;
                this.portfolios.portfolios[this.idx].description = this.portfolio.description;
                this.portfolios.portfolios[this.idx].viewport = this.portfolio.viewport;
                this.portfolios.portfolios[this.idx].ie = this.portfolio.ie;
                this.portfolios.portfolios[this.idx].demo = this.portfolio.demo;
                this.portfolios.portfolios[this.idx].hashtags = this.portfolio.hashtags;
                this.portfolios.portfolios[this.idx].repository = this.portfolio.repository;
                this.portfolios.portfolios[this.idx].sources = this.portfolio.sources;
                this.portfolios.portfolios[this.idx].imageNames = this.portfolio.imageNames;
                this.portfolios.portfolios[this.idx].dumpImg = this.portfolio.dumpImg;
                this.imageList = [];
            } else {
                this.portfolios.portfolios.push(JSON.parse(JSON.stringify(this.portfolio)));
                console.log(this.portfolios.portfolios);
            }
            this.upload(this.userData.uid);
            const result = await FirebaseServices.postPortfolios(this.userData.uid, this.portfolios.aboutMe, this.portfolios.foliotheme, this.portfolios.banner, this.portfolios.portfolios, this.portfolios.skills, this.portfolios.subtitle, this.portfolios.title);
            this.getPortfolio();
            alert('저장 완료!');
            
        },
        async saveAll() {
            this.portfolios.foliotheme.color = this.colorchip;
            this.portfolios.foliotheme.layout = this.listlayout;
            const result = await FirebaseServices.postPortfolios(this.userData.uid, this.portfolios.aboutMe, this.portfolios.foliotheme, this.portfolios.banner, this.portfolios.portfolios, this.portfolios.skills, this.portfolios.subtitle, this.portfolios.title);
            alert('저장 완료!');
        }
    }
}
</script>

<style>
    .container {
        position: relative;
    }

    .image {
        display: block;
        width: 100%;
        height: 100%;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background-color: rgba(69, 69, 69, 0.8);
    }

    .container:hover .overlay {
        opacity: 1;
    }

    .text {
        color: white;
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }
</style>

<style lang="css" scoped>
    /* section */
    @media screen and (max-width: 1499px)
    .l-section {
        padding: 100px 5vw;
    }

    #select-css{
        z-index:20;
        position:fixed;
        top:10%;
        left:10px;
        padding:10px;
        border:3px solid black;
    }
    #select-css button{
        padding:5px 10px;
        margin:5px;
        font-size:15px;
        border:1px solid gray;
    }
    #select-css #css1{
        color:black;
        background-color: white;
    }
    #select-css #css2{
        color:greenyellow;
        background-color: black;
    }
    #select-css #css3{
        color:white;
        background-color:royalblue;
    }

    .l-section {
        background: white;
    }

    .l-section {
        min-height: 100vh;
        padding: 15vh 100px;
        position: relative;
        box-sizing: border-box;
    }

    figcaption {
        display: block;
    }

    /* gallery */
    .gallery-spec-item {
        display: block;
        line-height: 2.4;
    }
    .gallery-spec-key {
        min-width: 130px;
        padding-right: .5em;
        font-family: "Quicksand",sans-serif;
    }
    .index {
        display: inline-block;
        position: relative;
        left: -0.05em;
        vertical-align: -0.1em;
        line-height: 1;
        font-size: 64px;
        font-weight: 400;
        /*content: counter(article, 'decimal-leading-zero');*/
    }

    .gallery-title {
        position: relative;
        margin-bottom: 1.5em;
    }

    .gallery-spec-key, .gallery-spec-value {
        display: inline-block;
        vertical-align: middle;
    }

    b, strong, dt {
        font-weight: 500;
    }

    .gallery-spec-item {
        display: block;
        line-height: 2.4;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        line-height: 1.2;
        font-family: "Quicksand",sans-serif;
        font-weight: normal;
    }

    h2 {
    color: black;
    }

    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }

    /*palette */

    li {
        display: list-item;
        text-align: -webkit-match-parent;
    }
    .palette {
        display: inline-block;
        margin: 0;
        padding: 0;
        vertical-align: middle;
        list-style: none;
    }

    section {
        display: block;
        color: black;
        line-height: 2;
        font-family: "Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Malgun Gothic",Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        font-weight: 400;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
        font-size: 15px;
    }

    /*portfolio  head */
    .secondary {
        background-color: #fafafa !important;
        border-color: #424242 !important;
    }

    .primar {
        background-color: #fafafa !important;
    }
    .section-heading .secondary {
        display: block;
        font-size: 24px;
        opacity: .5;
        speak: none;
    }

    .section-heading {
        text-align: center;
    }

    .section-heading .primar {
        display: block;
        font-size: 64px;
        padding-bottom: .25em;
        position: relative;
    }

    .section-heading .primar::after {
        background: #30b7e8;
        border-radius: .25em;
        display: block;
        width: 1.25em;
        height: 2px;
        margin-left: -.625em;
        position: absolute;
        bottom: 0;
        left: 50%;
        content: "";
    }





    /* table*/

    a {
        background-color: transparent;
        color: #30b7e8;
        text-decoration: none;
        cursor: pointer;
    }

    /* categ */
    .categ.html {
        background: #8dca35;
        color: white;
    }

    .categ.css {
        background: #00bfdd;
        color: white;
    }

    .categ {
        border-radius: .25em;
        display: inline-block;
        min-width: 2em;
        padding: .35em .65em;
        line-height: 1;
        font-family: "Quicksand",sans-serif;
        font-size: .92rem;
        text-align: center;
    }

    .categ.js {
        background: #ff702a;
        color: white;
    }

    /*ui button */

    ul {
        display: block;
        list-style-type: disc;
    }

    .ui-button {
        background: #30b7e8;
        border-radius: 44px;
        color: white;
        display: inline-block;
        min-width: 7em;
        height: 44px;
        margin: 0;
        overflow: hidden;
        padding: 12px 16px 14px;
        vertical-align: middle;
        letter-spacing: -.03em;
        line-height: 18px;
        font-family: "Quicksand",sans-serif;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        box-sizing: border-box;
        -moz-user-select: -moz-none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        position: relative;
    }
    .ui-group {
        margin: 1rem 0;
        padding: 0;
        text-align: center;
    }

    p, dl, ol, ul {
        word-break: keep-all;
    }

    .ui-dropdown {
        background: #30b7e8;
        border-radius: 0 0 22px 22px;
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        visibility: hidden;
        z-index: 10000;
        opacity: 0;
        transition: visibility 0s linear .2s, opacity .2s;
    }

    .ui-button::after {
        background-color: rgba(0,0,0,0.08);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        content: "";
        transition: height .3s;
    }

    .ui-dropdown.is-expanded {
        display: block;
        visibility: visible;
        opacity: 1;
        transition: visibility 0s linear 0s, opacity .2s;
    }


    .ui-dropdown-trigger.is-triggered {
        border-radius: 22px 22px 0 0;
    }



    table {
        border: 0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 1em 0;
        width: 100%;
    }

    table th, table td {
        border-bottom: 1px solid #e6e9ea;
        padding: .3em 1em;
        text-align: left;
    }

    td {
        display: table-cell;
        vertical-align: inherit;
    }

    table thead tr th {
        
        border-top-width: 1px;
        color: #94979c;
        padding: 1.2em 1em;
    }

    table caption, table th {
        font-weight: 500;
        text-align: left;
    }

    th {
        display: table-cell;
        vertical-align: inherit;
        font-weight: bold;
        text-align: -internal-center;
    }

    table thead {
        font-family: "Quicksand",sans-serif;
    }
    #listTitle {
        color: #30b7e8;
    }

    #headname {
        background-color: rgba(77,128,153,0.05);
    }
</style>
