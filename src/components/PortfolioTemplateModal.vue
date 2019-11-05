<!-- css 종류를 유저 디비에 저장-->
<template lang="html">
  <div class="portfolio">
    <section role="region" id="modalPortfolio" class="l-section">
        <Introduce :intro="intros[0]"></Introduce>
        <div class="l-section-holder">
            <h2 class="section-heading is-init is-animated" data-animation="fade-up">
                <span class="secondary">Portfolio</span>
                <span class="primary">My works</span>
            </h2>
            <div id="portfolio" class="section-content gallery alternate">
                <v-flex v-for="ex in examples">
                    <PortfolioList :ports="ex" :cssmod="css"></PortfolioList>
                    <hr>
                </v-flex>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import ImageBanner from '@/components/ImageBanner.vue'
import FirebaseService from '@/services/FirebaseServices'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'
import Introduce from '@/components/Introduce.vue'

import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Introduce,
        ImageBanner,
        PortfolioList,
    },
    props:{
        css: {type: null},

    },
    data(){
        return {
            examples:[
                {
                    title:'예술의 전당 랜딩 페이지',
                    img:require("@/assets/example1.png"),
                    viewport:'반응형',
                    ie_support:'IE9+',
                    demo_url:'./Portfolio-SAC/',
                    repos_url:'https://github.com/findawayer/Portfolio-SAC/tree/gh-pages',
                    content:'<p><a href="http://www.sac.or.kr/" target="_blank">예술의 전당 사이트</a>의 메인 페이지를 부트스트랩 4를 기반으로 한 반응형 구조로 리뉴얼해 보았습니다.</p> \
                                <p><a href="https://v4-alpha.getbootstrap.com/" target="_blank">부트스트랩의 4 alpha 버전</a>을 기반으로 제작되었고, 이 버전의 부트스트랩이 사용하는 Sass를 테마 제작에도 사용했으며, IE9+를 지원하는 jQuery 3.1 및 jQuery UI가 사용되었습니다.</p>\
                            ',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5, ARIA, SVG'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/bootstrap-theme.scss',
                            file:'bootstrap-custom.css',
                            keyword:'Responsive, Bootstrap 4'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/style.scss',
                            file:'style.scss',
                            keyword:'CSS3, Sass, Compass'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/tree/gh-pages/scss/partials',
                            file:'Sass partials',
                            keyword:'CSS3, Sass, Compass, Responsive'
                        }
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/js/main.js',
                            file:'main.js',
                            keyword:'JavaScript, jQuery 3, <a href="http://kenwheeler.github.io/slick/" target="_blank">slick</a>'
                        }
                    ],
                },
                {
                    title:'대한민국 기상청 랜딩 페이지',
                    img:require("@/assets/example2.png"),
                    viewport:'IE8+',
                    ie_support:'데스크탑',
                    content:'<p><a href="http://www.kma.go.kr/index.jsp" target="_blank">기상청</a> 사이트의 대문을 리뉴얼해 보았습니다. 인터페이스용 그림에는 SVG를 적극적으로 활용했고, 백업 png를 병용했습니다.</p> \
                                <p>공공기관 사이트로서 보다 많은 사용자 환경에 대응하기 위해 익스플로러 8까지의 호환성 지원, 웹 접근성 관리가 되어 있습니다.</p> \
                            ',
                    demo_url:'./Portfolio-KMA/',
                    repos_url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5, ARIA, SVG'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/scss/style.scss',
                            file:'style.scss',
                            keyword:'CSS3, Sass, Compass'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages/scss/partials',
                            file:'Sass partials',
                            keyword:'CSS3, Sass, Compass, CSS sprite'
                        },
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/common.js',
                            file:'common.js',
                            keyword:'JavaScript, jQuery 1, <a href="https://modernizr.com/" target="_blank">Modernizr</a>'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/main.js',
                            file:'main.js',
                            keyword:'JavaScript, jQuery 1, jQuery UI, AJAX'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/json/meteo.json',
                            file:'meteo.json',
                            keyword:'JSON'
                        }
                    ],
                },
                {
                    title:'오리지널 영화 사이트',
                    img:require("@/assets/example3.png"),
                    viewport:'모바일',
                    ie_support:'',
                    demo_url:'./Portfolio-KMA/',
                    repos_url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages',
                    content:'<p>오리지널 영화 정보 및 예매사이트를 모바일 전용으로 구성해 보았습니다. <b>영화 목록 페이지</b>, <b>특정 영화 정보 페이지</b>, <b>티켓 예매 페이지</b> 3가지 샘플을 포함하고 있습니다.</p>\
                                <p>기기별 기본 UX를 최대한 유지하기 위해 검색상자나 선택상자 등은 네이티브 형식을 사용했으며, 유튜브의 트레일러 영상 불러오기, 날짜 선택기 등의 기능이 추가돼 있습니다.</p>\
                            ',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/movie.html',
                            file:'movie.html',
                            keyword:'HTML5'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/order.html',
                            file:'order.html',
                            keyword:'HTML5'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/style.less',
                            file:'style.scss',
                            keyword:'CSS3, LESS'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/tree/gh-pages/less/partials',
                            file:'dhtmlxcalendar material dark.less',
                            keyword:'CSS3, LESS, Responsive'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/dhtmlxcalendar_material_dark.less',
                            file:'Sass partials',
                            keyword:'CSS3, LESS'
                        },
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/common.js',
                            file:'common.js',
                            keyword:'JavaScript, jQuery 1, <a href="http://hammerjs.github.io/" target="_blank">HammerJS</a>'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/movie.js',
                            file:'movie.js',
                            keyword:'JavaScript, jQuery 1, <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">YouTube Iframe Player</a>, <a href="https://dhtmlx.com/docs/products/dhtmlxCalendar/" target="_blank">dhtmlXCalendar</a>, starRate(자작)'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/plugins/starRate/starRate.js',
                            file:'starRate.js',
                            keyword:'JavaScript, jQuery 1'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/order.js',
                            file:'order.js',
                            keyword:'JavaScript, jQuery 1'
                        }
                    ],
                }
            ],
            
            intros:[],
            isuser:false,
        }
    },

    created(){
        
    },
    mounted(){
        let th = this
        this.checkCss()
    },
    methods :{
        checkCss:function(){
            let css = this.css
            let body = document.querySelector('#modalPortfolio')
            console.log("css: ",this.css)
            console.log("body: ",body)
            console.log("document: ",document)
            if(this.css==1){
                body.style.backgroundColor = 'white'
                body.style.color = 'black'
            }
            else if(this.css==2){
                body.style.backgroundColor = 'rgb(40,40,40)'
                body.style.color = 'rgb(255, 255, 255)'
            }
            else if(this.css=3){
                body.style.backgroundColor = '#30b7e8'
                body.style.color = 'rgb(255, 255, 255)'
            }
        }
    },
    watch: {
        css:function(){
            this.checkCss()
        }
    }
}
</script>

<style lang="css" scoped>
/* section */
@media screen and (max-width: 1499px)
.l-section {
    padding: 100px 5vw;
}

.l-section {
    background: white;
    min-height: 100vh;
    padding: 15vh 70px;
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
.gallery-title::before {
    color: #30b7e8;
    display: inline-block;
    width: 130px;
    position: relative;
    left: -0.05em;
    vertical-align: -0.1em;
    line-height: 1;
    font-size: 64px;
    font-weight: 400;
    content: counter(article,decimal-leading-zero);
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
    border-color: #424242 !important;
}

.primary {
    border-color: #1976d2 !important;
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

.section-heading .primary {
    display: block;
    font-size: 64px;
    padding-bottom: .25em;
    position: relative;
}

.section-heading .primary::after {
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
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
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



</style>
