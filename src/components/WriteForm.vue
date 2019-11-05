<template>
  <v-stepper non-linear v-model="e6" vertical style="padding-top: 3rem; padding-bottom: 5rem; padding-left: 10rem; padding-right: 10rem; background-color: #fafafa">
    <!--<v-stepper-step editable :complete="e6 > 3" step="1">-->
    <v-stepper-step editable step="1">
      ABOUT
      <small>자기 소개와 Skill을 작성하세요.</small>
    </v-stepper-step>
    <v-stepper-content step="1" class="px-5">
      <v-card class="mb-3 px-3">
        <v-card-text>
          <v-text-field
            v-model="pageTitle"
            label="Page Title"
          ></v-text-field>
          <v-text-field
            v-model="greeting"
            label="Greeting"
          ></v-text-field>
          <v-textarea
            name="input-7-1"
            label="About My Self"
            v-model="aboutMe"
            hint="자기 자신을 소개하는 텍스트를 상세히 작성해주세요."
            rows=15
          ></v-textarea>
        </v-card-text>
      </v-card>
      <v-card class="mb-3" v-for="item in skills">
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
            hint="해당 기술 수준을 설명해주세요."
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
      <v-btn color="primary" @click="e6 = 2; addSkill()">Continue</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <!-- 2. portfolio 추가 -->
    <v-stepper-step editable step="2">
      PORTFOLIOS
      <small>수행한 포트폴리오를 정리하세요.</small>
    </v-stepper-step>

    <v-stepper-content step="2" class="px-5">
      <v-card class="mb-3 px-3" v-for="portItem in portfolios">
        <v-card-text >
          <v-form ref="form">
            <v-text-field
              v-model="portItem.title"
              label="Title"
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="portItem.description"
              hint="프로젝트를 설명해주세요."
              rows=10
            ></v-textarea>
            <v-text-field
              label="Hashtag"
              v-on:keyup.enter="enrollTag()"
            ></v-text-field>
            <template>
              <td v-for="(tag, index) in portItem.hashtags">
                <v-chip close color="teal" text-color="white" v-model="portItem.hashtags[index]">
                    <v-avatar>
                        <v-icon>check_circle</v-icon>
                    </v-avatar>
                    {{ tag }}
                </v-chip>
              </td>
            </template>
            <v-text-field
              v-model="portItem.viewport"
              label="Viewport"
            ></v-text-field>
            <v-text-field
              v-model="portItem.ie"
              label="IE Support"
            ></v-text-field>
            <v-text-field
              v-model="portItem.demo"
              label="Demo Link"
            ></v-text-field>
            <v-text-field
              v-model="portItem.repository"
              label="Repo Link"
            ></v-text-field>
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
                <tr class="pb-2" v-for="(item, index) in portItem.sources">
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
              </tbody>
            </v-simple-table>
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
            <v-layout v-if="portItem.dumpImg !== null">
              <v-flex style="height: 20rem;">
                <img v-bind:src="portItem.dumpImg" width="400rem" height="200rem">
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-btn color="grey" @click="portItem.dumpImg = null;">Reset</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card class="mb-3 px-3">
        <v-card-text >
          <v-form ref="form">
            <v-text-field
              v-model="portfolio.title"
              label="Title"
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="portfolio.description"
              hint="프로젝트를 설명해주세요."
              rows=10
            ></v-textarea>
            <v-text-field
              v-model="hashtag"
              label="Hashtag"
              v-on:keyup.enter="enrollTag()"
            ></v-text-field>
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
            <v-text-field
              v-model="portfolio.viewport"
              label="Viewport"
            ></v-text-field>
            <v-text-field
              v-model="portfolio.ie"
              label="IE Support"
            ></v-text-field>
            <v-text-field
              v-model="portfolio.demo"
              label="Demo Link"
            ></v-text-field>
            <v-text-field
              v-model="portfolio.repository"
              label="Repo Link"
            ></v-text-field>
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
              <v-flex class="py-5">
                <img v-bind:src="portfolio.dumpImg" width="400rem" height="200rem">
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-btn color="grey" @click="portfolio.dumpImg = null;">Reset</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
      <div class="text-xs-center py-3">
        <v-btn color="teal" fab small dark @click="addPortfolio()">
          <v-icon>add</v-icon>
        </v-btn>
      </div>
      <v-btn color="primary" @click="addPortfolio(); savePort()">Save</v-btn>
      <v-btn flat @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

  </v-stepper>
</template>

<script>
import firebase from 'firebase/app'
import FirebaseServices from '../services/FirebaseServices'

export default {
  name: 'WriteForm',
  data() {
    return {
      e6: 1,
      pageTitle: null,
      greeting: null,
      aboutMe: null,
      skill: {
        name: null,
        degree: null,
        description: null
      },
      skills: [],
      hashtag: null,
      source: {
        category: null,
        fileName: null,
        gitPath: null,
        fileDes: null
      },
      portfolios: [],
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
      },
      imageList: [],
      items: ['html', 'css', 'vue', 'js', 'json', 'c', 'c++', 'java', 'python'],
      isDragging: false,
    }
  },
  created() {
    let _this = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('in user')
        _this.inUser = true
      } else {
        _this.inUser = false
      }
    })
  },
  methods: {
    addSkill: function() {
      // 깊은 복사
      if (this.skill.name !== null && this.skill.degree !== null && this.skill.description !== null) {
        let tmp = JSON.parse(JSON.stringify(this.skill))
        tmp.degree = "Level. " + tmp.degree
        this.skills.push(tmp)
        this.skill.name = null
        this.skill.degree = null
        this.skill.description = null
      } else {
        alert("모두 작성하지 않은 skill은 저장되지 않습니다.");
      }
      // firebaseServices에서 this.skill == []인 경우 처리하기
    },
    addSource: function() {
      if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
        this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
        this.source.category = null
        this.source.fileName = null
        this.source.gitPath = null
        this.source.fileDes = null
      }
    },
    // source 지우기
    removeSource: function(idx) {
      this.portfolio.sources.splice(idx, 1)
    },
    // drag and drop
    onChange: function (file) {
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
            _this.portfolio.dumpImg = e.target.result
          }
          reader.readAsDataURL(file)
          console.log(file)
          _this.portfolio.imageNames = file.name
          _this.imageList.push(file)
        } else {
          alert('이미지 파일만 올려주세요.')
        }
      }
    },
    // image uploader
    upload(user) {
      console.log(user)
      for (const image in this.imageList) {
        FirebaseServices.uploadfile(user, this.imageList[image])
      }
    },
    addPortfolio: function() {
      if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
        this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
        this.source.category = null
        this.source.fileName = null
        this.source.gitPath = null
        this.source.fileDes = null
      }
      if (this.portfolio.title !== null) {
        this.portfolios.push(JSON.parse(JSON.stringify(this.portfolio)))
        // 깊은 복사 저장 후, 초기화 하기
        this.portfolio.title = null
        this.portfolio.description = null
        this.portfolio.viewport = null
        this.portfolio.ie = null
        this.portfolio.demo = null
        this.portfolio.repository = null
        this.portfolio.sources = []
        this.portfolio.imageList = []
        this.portfolio.dumpImg = null
      }
      console.log(this.portfolios)
    },
    // tag 추가 하기
    enrollTag: function() {
      this.portfolio.hashtags.push(this.hashtag)
      this.hashtag = null
    },
    // firebase에 최종 저장하기
    savePort() {
      let _this = this
      firebase.auth().onAuthStateChanged(async function(user) {
        // default banner
        let banner = {theme: 'Horizon', img: 'https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/banner%2Fexample6.jpg?alt=media&token=b4bed72d-2c2f-4fdd-a9f4-14a1cc17d2e3', opacity: 'opacity1', layout: 'template2'}
        // default title
        let title = {content: _this.pageTitle, color: {red: 255, blue: 255, green: 255}, size: 6, animation: 'none'}
        // default subtitle
        let subtitle = {content: _this.greeting, color: {red: 255, blue: 255, green: 255}, size: 6, animation: 'none'}
        // default list layout
        let foliotheme = {layout: 'template1', color: 'blue', animation: 'none'}
        // default aboutme
        let aboutme = {
          content: _this.aboutMe,
          layout: [true, false],
          theme: [true, false, false],
          title: {
            size: '5',
            color: {
              red: 255,
              green: 255,
              blue: 255
            }
          },
          subtitle: {
            size: '2',
            color: {
              red: 255,
              green: 255,
              blue: 255
            }
          },
          animation: 'none'
        }
        // firebase storage에 저장
        _this.upload(user.uid);
        const result = await FirebaseServices.postPortfolios(user.uid, aboutme, foliotheme, banner, _this.portfolios, _this.skills, subtitle, title);
        return   _this.$router.push('/portfoliopage');
      })
    }
  }
}
</script>