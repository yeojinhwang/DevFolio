<template>
    <div>
        <div id="title_on">
            <h1 style="font-size: 9em; margin-top:0.5em; color:#8cddeb;">Work.</h1>

            <i style="top: -10px; font-size: 2rem; color: #aaa; font-weight: light;">Featured Work</i>
        </div>
        <div style="margin-top: 5rem;">
            <v-layout style="margin-left: 5rem; margin-right: 5rem;">
                <v-flex lg6 md6 sm6 v-for="item in portfolios.portfolios" style="padding-left: 0.5rem; padding-right: 0.5rem;">
                    <div class="container" @click="modal = true;viewPort(portfolios.portfolios.indexOf(item))">
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
                            <h3 class="gallery-title"><span id="listTitle"><p class="index">0</p><p class="index">{{ portidx+1 }}</p></span>{{ portfolio.title }}</h3>
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
                        <img class="gallery-image-thumb" :src="portfolio.imageNames" :alt="portfolio.title" aria-describedby="work1Description" style="width: 65rem;">
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
                                <td v-else-if="source.category === 'python'" data-th="Category"><span class="categ" style="text-transform: uppercase; background: ##FF4136; color: white;">{{ source.category }}</span></td>
                                <td data-th="Source"><a :href="source.gitPath" target="_blank">{{ source.fileName }}</a></td>
                                <td data-th="Related Keywords">{{ source.fileDes }}</td>
                            </tr>
                        </tbody>
                    </table>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="green darken-1" dark @click="modal = false" style="margin-right: 43rem; margin-bottom: 3rem;">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {
    name: 'TestPage',
    data() {
        return {
            // firebase portfolios 컬렉션에서 가져온 데이터
            portfolios:[],
            portidx: null,
            user: null,
            // gradient: 'to top right, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
            mybookmark:false,
            iscontrol:false,
            portfolioDrawer:false,
            tmplayout: null,
            btncolor: '#30b7e8',
            tmp: {
                layout: null,
                color: null,
            },
            css:{
                color:1,
                modal:false,
                grid:false,
                version:'2.0.0',
            },
            visitNum:0,
            toBookMarkNum:0,
            cssChange:0,
            dialog: false,
            modal: false,
            idx: null,
            hashtag: null,
            items: ['html', 'css', 'vue', 'js', 'json', 'c', 'c++', 'java', 'python'],
            isDragging: false,
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
    mounted(){
        let __this = this;

        this.getPortfolio();
    },
    methods:{
        async getPortfolio(uid) {
            let __this = this;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            const tmp = firebase.auth().onAuthStateChanged(function(user) {
                __this.user = user.uid;
                console.log(__this.user);
                FirebaseServices.getMyPort(__this.user).then(function(res) {
                    __this.portfolios = res;
                    for (let item in __this.portfolios.portfolios) {
                        storageRef.child('users/' + __this.user + '/' + __this.portfolios.portfolios[item].imageNames).getDownloadURL().then(function(url) {
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
                    console.log(__this.portfolios.portfolios)
                })
            })
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



