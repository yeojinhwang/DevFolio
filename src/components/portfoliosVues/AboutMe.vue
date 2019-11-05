<template>
  <v-container v-if="tempView" :class="{css1:cssArr[0], xs6:cssArr[0], css2:cssArr[1], xs12:cssArr[1]}">
    <div :themeColor="this.$store.state.theme" class="aboutMeBody" style="overflow: hidden; height: auto;">
      <!-- about my self -->
      <div class="contentSize aboutMe_about">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title" style="color: white; opacity: 0.5; font-size: 1.7rem; font-family: 'Nanum Gothic', sans-serif;">Intro</span>
            <span id="aboutTitle1" class="aboutMe_subTitle">About myself.</span>
          </h4>
          <div id="aboutSubtitle1">
            <p style="font-family: 'Nanum Gothic', sans-serif;" v-for="item in (portfolio.aboutMe.content || '').split('.')" >{{ item }}</p>
          </div>
        </v-container>
      </div>

      <!-- about my skill -->
      <div class="contentSize aboutMe_skills">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title" style="color: white; opacity: 0.5; font-size: 1.7rem; font-family: 'Nanum Gothic', sans-serif;">skills</span>
            <span id="aboutTitle2" class="aboutMe_subTitle">What I can do.</span>
          </h4>
          <div id="aboutSubtitle2">
            <div v-for="item in portfolio.skills" style="margin-bottom: 1rem;">
              <p style="display: inline; font-family: 'Nanum Gothic', sans-serif; font-weight: bolder;"><i class="far fa-check-circle"></i><span style="margin-left: 1rem;">{{ item.name }}</span><span style="font-size: 70%; margin-left: 0.8rem;">/ {{ item.degree }}</span></p>
              <!--<div :id="item.name" class="bar back" :data-skill="item.degree"></div>-->
              <div style="font-size: 90%; margin-left: 3rem;"><span>{{ item.description }}</span></div>
            </div>
          </div>
        </v-container>
      </div>

      <!-- about profile image -->
      <div class="contentSize aboutMe_images">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">profile</span>
          </h4>
        </v-container>
        <v-img class="aboutMe_image" :src="userData.photoURL"
          lazy-src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/10/designer-developer-1200x616.jpg"
          style="object-fit: cover;"
        ></v-img>
      </div>

    </div>
    <!-- sidebar -->
    <v-navigation-drawer v-model="aboutDrawer" fixed temporary disable-route-watcher>
      <v-list class="pt-0" dense>
        <v-expansion-panel>

          <!-- layout selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>Layout</div>
            </template>
            <v-card>
              <v-card-text>
                <div v-for="items in this.layoutItems">
                  <!-- swtich btn -->
                  <v-radio-group row v-model="subItem.selected" v-for="subItem in items.items">
                    <v-radio :label="subItem.title" :value="subItem.value" @change="switchCss(items, subItem.value)"></v-radio>
                  </v-radio-group>
                </div>
                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                <div class="px-1">
                  <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Theme</p>
                  <div v-for="items in this.themeItems">
                    <v-radio-group row v-model="subItem.selected" v-for="subItem in items.items">
                      <v-radio :label="subItem.title" :value="subItem.value" @change="switchTheme(items, subItem.value)"></v-radio>
                    </v-radio-group>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <!-- font selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-font pr-3"></i>Font</div>
            </template>
            <v-card>
              <v-card-text>
                <div class="px-1">
                  <v-radio-group v-model="aboutChoice" row>
                    <v-radio label="Title" value="title" color="primary"></v-radio>
                    <v-radio label="Subtitle" value="subtitle" color="primary"></v-radio>
                  </v-radio-group>
                  <div class="px-1">
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Size</p>
                    <!-- title 선택했을 때 -->
                    <v-slider
                      v-if="aboutChoice === 'title'" v-model="aboutTitleS"
                      step="0.5" max="10" min="1" thumb-label ticks
                      class="px-2"
                    ></v-slider>
                    <!-- subtitle 선택했을 때 -->
                    <v-slider
                      v-else-if="aboutChoice === 'subtitle'" v-model="aboutSubtitleS"
                      step="0.5" max="5" min="1" thumb-label ticks
                      class="px-2"
                    ></v-slider>
                  </div>
                </div>

                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>

                <!-- color picker -->
                <div class="px-1">
                  <div class="px-1">
                    <p style="color: lightgrey; letter-spacing: 0.05rem;">Color</p>
                    <!-- color picker -->
                    <div v-if="aboutChoice === 'title'">
                        <div id="aboutTitleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
                        <v-layout
                            row
                            wrap
                        >
                            <v-flex xs9>
                                <v-slider
                                v-model="abouttRed"
                                :max="255"
                                label="R"
                                color="error"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="abouttRed"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs9>
                                <v-slider
                                v-model="abouttGreen"
                                :max="255"
                                label="G"
                                color="success"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="abouttGreen"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs9>
                                <v-slider
                                v-model="abouttBlue"
                                :max="255"
                                label="B"
                                color="primary"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="abouttBlue"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                  <div v-else-if="aboutChoice === 'subtitle'">
                    <div id="aboutSubtitleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
                        <v-layout
                            row
                            wrap
                        >
                            <v-flex xs9>
                                <v-slider
                                v-model="aboutsRed"
                                :max="255"
                                label="R"
                                color="error"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="aboutsRed"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs9>
                                <v-slider
                                v-model="aboutsGreen"
                                :max="255"
                                label="G"
                                color="success"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="aboutsGreen"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs9>
                                <v-slider
                                v-model="aboutsBlue"
                                :max="255"
                                label="B"
                                color="primary"
                                ></v-slider>
                            </v-flex>

                            <v-flex xs3>
                                <v-text-field
                                v-model="aboutsBlue"
                                class="mt-0 ml-auto"
                                style="width: 3.5rem;"
                                type="number"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>

          <!-- animation selector -->
          <!--<v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>Animation</div>
            </template>
            <v-card>
              <v-card-text>
                <div>
                  <div>
                    <button>애니메이션 1</button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>-->

          <!-- text ditor -->
          <v-expansion-panel-content>
            <template v-slot:header>
                <div @click="dialog = true"><i class="fas fa-keyboard pr-3"></i>Contents</div>
            </template>
            <template v-slot:actions>
                  <v-icon color="teal"> </v-icon>
            </template>
          </v-expansion-panel-content>

        </v-expansion-panel>
        <div style="text-align: center; margin-top: 2rem;">
          <v-btn small color="primary" @click="saveAll(); aboutDrawer = false;">Save</v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>
    <!-- text editor -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
            <span class="headline">ABOUT</span>
        </v-card-title>
        <v-card-text style="padding-left: 2rem; padding-right: 2rem;">
            <v-text-field v-model="portfolio.aboutMe.content" label="About My Self" rows=15 style="margin-bottom: 1rem;"></v-text-field>
            <v-card v-for="item in portfolio.tmp" class="mb-3">
              <v-card-text>
                <v-layout>
                  <v-flex lg3 class="px-3">
                    <v-text-field
                      label="skill"
                      v-model="item.name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex lg9 class="px-3">
                    <v-subheader>level</v-subheader>
                    <v-slider
                      v-model="item.degree"
                      step="1"
                      max=10
                      thumb-label
                      ticks
                    ></v-slider>
                  </v-flex>
                </v-layout>
                <v-textarea
                  name="input-7-1"
                  label="description"
                  v-model="item.description"
                  class="px-3"
                ></v-textarea>
              </v-card-text>
            </v-card>
            <v-card>
            <v-card-text>
              <v-layout>
                <v-flex lg3 class="px-3">
                  <v-text-field
                    label="skill"
                    v-model="skill.name"
                  ></v-text-field>
                </v-flex>
                <v-flex lg9 class="px-3">
                  <v-subheader>level</v-subheader>
                  <v-slider
                    v-model="skill.degree"
                    step="1"
                    max=10
                    thumb-label
                    ticks
                  ></v-slider>
                </v-flex>
              </v-layout>
              <v-textarea
                name="input-7-1"
                label="description"
                v-model="skill.description"
                hint="해당 기술 수준을 설명해주세요."
                class="px-3"
              ></v-textarea>
            </v-card-text>
          </v-card>
          <div class="text-xs-center py-3">
            <v-btn color="teal" fab small dark @click="addSkill()">
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false; saveMe();">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import firebase from 'firebase/app'

// theme 설정을 위해서 store에 저장
import ColorPicker from './AboutColorPicker'
import store from '../../store'

export default {
  name: '',
  components: {
    ColorPicker
  },
  data() {
    return {
      tempView: false,
      aboutLayout: 'css1',
      aboutDrawer: false,
      dialog: false,
      abouttRed: "255", 
      abouttBlue: "255", 
      abouttGreen: "255",
      aboutsRed: "255", 
      aboutsBlue: "255", 
      aboutsGreen: "255",
      // css
      cssArr: [true, false],
      themeArr: [true, false, false],
      // modal
      layoutItems: [
        {
          action: 'fas fa-drafting-compass',
          title: 'Layout',
          items: [
            { title: 'layout1', value: 1, selected: true},
            { title: 'layout2', value: 2, selected: false}
          ]
        },
      ],
      themeItems: [
        {
          action: 'fas fa-palette',
          title: 'Color',
          items: [
            { title: 'default', value: 1, selected: true},
            { title: 'mint', value: 2, selected: false},
            { title: 'simple_cookie', value: 3, selected: false},
          ]
        },
      ],
      fontItems: [
        {
          action: '',
          title: 'font',
          items: [
            { title: 'Title', value: 10},
            { title: 'Subtitle', value: 10}
          ]
        }
      ],
      skill: {
        name: null,
        degree: null,
        description: null
      },
      // font
      aboutChoice: 'title',
      aboutTitleS: '1',
      aboutSubtitleS: '1',
      portfolio: [],
      tmpcss: null,
      tmptheme: null
    }
  },
  props: ['userData'],
  watch: {
    // fontSize watch
    aboutTitleS: function() {
      document.getElementById('aboutTitle1').style.fontSize = this.aboutTitleS + 'rem';
      document.getElementById('aboutTitle2').style.fontSize = this.aboutTitleS + 'rem';
    },
    aboutSubtitleS: function() {
      document.getElementById('aboutSubtitle1').style.fontSize = this.aboutSubtitleS + 'rem';
      document.getElementById('aboutSubtitle2').style.fontSize = this.aboutSubtitleS + 'rem';
    },
    // title color
    abouttRed: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
      document.getElementById('aboutTitle2').style.color = rgb;
    },
    abouttGreen: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
      document.getElementById('aboutTitle2').style.color = rgb;
    },
    abouttBlue: function() {
      let rgb = 'rgb(' + this.abouttRed + ',' + this.abouttGreen + ',' + this.abouttBlue + ')';
      document.getElementById('aboutTitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutTitle1').style.color = rgb;
      document.getElementById('aboutTitle2').style.color = rgb;
    },
    // subTitle color
    aboutsRed: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
      document.getElementById('aboutSubtitle2').style.color = rgb;
    },
    aboutsBlue: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
      document.getElementById('aboutSubtitle2').style.color = rgb;
    },
    aboutsGreen: function() {
      let rgb = 'rgb(' + this.aboutsRed + ',' + this.aboutsGreen + ',' + this.aboutsBlue + ')';
      document.getElementById('aboutSubtitleColor').style.backgroundColor = rgb;
      document.getElementById('aboutSubtitle1').style.color = rgb;
      document.getElementById('aboutSubtitle2').style.color = rgb;
    }
  },
  mounted() {
    this.$EventBus.$on('About', () => {
      this.aboutDrawer = !this.aboutDrawer
    })
    this.$watch('userData', userData => {
      this.getAbout()
    })
  },
  methods: {
    // firebase db 가져오기
    getAbout: function() {
      let __this = this;
      FirebaseServices.getMyPort(this.userData.uid).then(function(res) {
        __this.portfolio = res;
        console.log(__this.portfolio);
        // 0812 / theme select
        for (let i=0; i < __this.themeArr.length; i++) {
          if (__this.portfolio.aboutMe.theme[i] === true) {
            __this.themeItems[0].items[i].selected = i+1
            store.commit('changeTheme', __this.themeItems[0].items[i].title)
          } else {
            __this.themeItems[0].items[i].selected = false
          }
        }
        __this.themeArr = __this.portfolio.aboutMe.theme;
        __this.aboutTitleS = __this.portfolio.aboutMe.title.size;
        __this.aboutSubtitleS = __this.portfolio.aboutMe.subtitle.size;
        // 0812 / btn select
        if (__this.portfolio.aboutMe.layout[0] === true) {
          __this.layoutItems[0].items[0].selected = 1
          __this.layoutItems[0].items[1].selected = false
        } else {
          __this.layoutItems[0].items[0].selected = false
          __this.layoutItems[0].items[1].selected = 2
        }
        __this.abouttRed = __this.portfolio.aboutMe.title.color.red
        __this.abouttGreen = __this.portfolio.aboutMe.title.color.green
        __this.abouttBlue = __this.portfolio.aboutMe.title.color.blue

        __this.aboutsRed = __this.portfolio.aboutMe.subtitle.color.red
        __this.aboutsGreen = __this.portfolio.aboutMe.subtitle.color.green
        __this.aboutsBlue = __this.portfolio.aboutMe.subtitle.color.blue

        __this.cssArr = __this.portfolio.aboutMe.layout;
        if (__this.userData.photoURL === null) {
          __this.userData.photoURL = "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/10/designer-developer-1200x616.jpg";
        }
        __this.portfolio.tmp = []

        res.skills.forEach(function(skill) {
          let temp = JSON.parse(JSON.stringify(skill));
          temp.degree = temp.degree.substring(7, temp.degree.length);
          __this.portfolio.tmp.push(JSON.parse(JSON.stringify(temp)));
        })
        __this.tempView = true
      }).then(function(res) {
        document.getElementById('aboutTitle1').style.fontSize = __this.aboutTitleS + 'rem';
        document.getElementById('aboutTitle2').style.fontSize = __this.aboutTitleS + 'rem';
        document.getElementById('aboutTitle1').style.color = 'rgb(' + __this.abouttRed + ',' + __this.abouttGreen + ',' + __this.abouttBlue + ')';
        document.getElementById('aboutTitle2').style.color = 'rgb(' + __this.abouttRed + ',' + __this.abouttGreen + ',' + __this.abouttBlue + ')';
        
        document.getElementById('aboutSubtitle1').style.fontSize = __this.aboutSubtitleS + 'rem';
        document.getElementById('aboutSubtitle2').style.fontSize = __this.aboutSubtitleS + 'rem';
        document.getElementById('aboutSubtitle1').style.color = 'rgb(' + __this.aboutsRed + ',' + __this.aboutsGreen + ',' + __this.aboutsBlue + ')';
        document.getElementById('aboutSubtitle2').style.color = 'rgb(' + __this.aboutsRed + ',' + __this.aboutsGreen + ',' + __this.aboutsBlue + ')';
      })
    },
    switchTheme(item, num) {
      let boolArr = []
      for (let i=0; i < this.themeArr.length; i++) {
        if (num == (i+1)) {
          boolArr.push(true)
          item.items[i].selected = true
          store.commit('changeTheme', item.items[i].title)
        } else {
          boolArr.push(false)
          item.items[i].selected = false
        }
      }
      this.themeArr = boolArr
    },
    // CSS 변환시 배열 교체용
    switchCss(item, num) {
      let boolArr = []
      for (let i=0; i < this.cssArr.length; i++) {
        if (num == (i+1)) {
          boolArr.push(true)
          item.items[i].selected = true
        } else {
          boolArr.push(false)
          item.items[i].selected = false
        }
      }
      this.cssArr = boolArr
    },
    addSkill: function() {
      // 깊은 복사
      if (this.skill.name !== null && this.skill.degree !== null && this.skill.description !== null) {
        this.portfolio.tmp.push(JSON.parse(JSON.stringify(this.skill)))
        this.skill.name = null
        this.skill.degree = null
        this.skill.description = null
      } else {
        alert("모두 작성하지 않은 skill은 저장되지 않습니다.");
      }
    },
    async saveMe() {
      if (this.skill.name !== null && this.skill.degree !== null && this.skill.description !== null) {
        this.portfolio.tmp.push(JSON.parse(JSON.stringify(this.skill)))
      }
      for (let idx in this.portfolio.tmp) {
        this.portfolio.tmp[idx].degree = 'Level. ' + this.portfolio.tmp[idx].degree;
      }
      this.portfolio.skills = this.portfolio.tmp;
      const result = await FirebaseServices.postPortfolios(this.userData.uid, this.portfolio.aboutMe, this.portfolio.foliotheme, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.skills, this.portfolio.subtitle, this.portfolio.title);
      window.location.reload()
    },
    async saveAll() {
      let fixContent = {
        animation: 'none',
        content: this.portfolio.aboutMe.content,
        layout: this.cssArr,
        theme: this.themeArr,
        title: {
          color: {
            red: this.abouttRed,
            green: this.abouttGreen,
            blue: this.abouttBlue
          },
          size: this.aboutTitleS
        },
        subtitle: {
          color: {
            red: this.aboutsRed,
            green: this.aboutsGreen,
            blue: this.aboutsBlue
          },
          size: this.aboutSubtitleS
        }
      }
      this.portfolio.aboutMe = fixContent
      const result = await FirebaseServices.postPortfolios(this.userData.uid, this.portfolio.aboutMe, this.portfolio.foliotheme, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.skills, this.portfolio.subtitle, this.portfolio.title);
      alert('저장 완료!');
    }
  }
}
</script>

<style lang="scss" scoped>
// layout selector
.css1{
  @import "./scss/aboutMe_1.scss";
}
.css2{
  @import "./scss/aboutMe_2.scss";
}
.isok{
  position:absolute;
  top:50%;
  right:20%;
  transform: translateY(-50%);
  margin:auto 20px;
  background-color: green;
  border-radius: 10px;
  height:20px;
  width:20px;
}

// skill graph code
@keyframes load{
  from {
      width: 0%
  }
  }
  @-webkit-keyframes load{
  from {
      width: 0%
  }
  }
  @-moz-keyframes load{
  from {
      width: 0%
  }
  }
  @-o-keyframes load{
  from {
      width: 0%
  }
  }

  .bar{
  background-color: #EEE;
  padding: 2px;
  border-radius: 15px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #FFF;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  }
  .bar::before{
  content:  attr(data-skill);
  background-color: #f3b0ff;
  display: inline-block;
  padding: 5px 0 5px 10px;
  border-radius: inherit;
  animation: load 2s 0s;
  -webkit-animation: load 2s 0s;
  -moz-animation: load 2s 0s;
  -o-animation: load 2s 0s;
  }

  .bar.front::before{
  background-color: #ffcc33;
  }
  .bar.back::before{
  background-color: #a6cfe3;
  }
</style>
