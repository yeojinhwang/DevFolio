<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-if="careerData.selected.inUser == true" v-slot:activator="{ on }">
        <v-btn round color="#3090D7" dark v-on="on">Edit</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>

        <v-tabs v-model="tab" vertical grow>
          <v-tab v-for="item in items" :key="item">
            <!-- <v-icon left>mdi-account</v-icon> -->
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-tabs-items v-model="tab">

        <!-- 유저 추가정보 -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-container grid-list-md>
                <div>
                  <!-- 경력 -->
                  <div>
                    <p>경력</p>
                    <v-combobox
                      v-model="careerData.selected.career" :items="selectItems.경력여부"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 채용 -->
                  <div>
                    <p>직군</p>
                    <v-combobox
                      v-model="careerData.selected.recruit" :items="selectItems.채용분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 활동 -->
                  <div>
                    <p>기술</p>
                    <v-combobox
                      v-model="careerData.selected.tool" :items="selectItems.활동분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <v-btn color="blue darken-1" flat @click="saveCareerHandler()">Save</v-btn>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <!-- 유저 name, password -->
        <v-tab-item>
          
          <v-card flat v-show="!edit">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-avatar tile size="256" class="profileImg">
                      <img :src="careerData.userImg" alt="avatar">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.name" label="User name*" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" disabled></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn color="blue darken-1" flat @click="edit = true">Edit</v-btn>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>

          <v-card flat v-show="edit">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>

                    <!-- 스토리지에 저장하고 불러오기 / photoURL 저장 -->

                    <!-- user.photoURL -->
                    <v-avatar v-if="viewImage === null" tile size="256" class="profileImg">
                      <img :src="careerData.userImg" alt="avatar">
                    </v-avatar>

                    <!-- upload image -->
                    <v-avatar v-if="viewImage !== null" tile size="256" class="profileImg">
                      <img :src="viewImage" alt="avatar">
                    </v-avatar>

                    <input class="inputTag" @change="onChange" type="file">

                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.name" label="User name*" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="user.password"
                      :append-icon="pwShow ? 'visibility' : 'visibility_off'"
                      :rules="pwRules"
                      label="Password*"
                      :type="pwShow ? 'text' : 'password'"
                      @click:append="pwShow = !pwShow"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn color="blue darken-1" flat @click="saveUserHandler()">save</v-btn>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false, edit = false">Close</v-btn>
            </v-card-actions>
          </v-card>

        </v-tab-item>
      </v-tabs-items>

    </v-dialog>
  </v-layout>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import { setTimeout } from 'timers';

export default {
  props: ['careerData'],
  data () {
    return {
      dialog: false,
      // 정보수정
      edit: false,
      user: {
        name: this.$store.state.firebaseUser.name,
        password: ''
      },
      // pw rule
      pwShow: false,
      password: '',
      pwRules: [
        v => !!v || 'password is Required.',
        v => v.length >= 8 || 'Min 8 characters',
      ],
      // tab items
      tab: null,
      items: ['content', 'account'],
      // comboBox save Data
      // 선택된 것 저장
      selected: {
        recruit: [],
        tool: [],
        career: [],
      },
      selectItems: {
        채용분야: ['SW 개발', 'HW 개발', '게임 개발', '디자인', '기획/PM', '마케팅', '운영', '경영지원'],
        활동분야: [ 'Android', 'iOS', 'C#', 'C++', 'Java', 'PHP', 'Python', 'Ruby', 'JSP', 'Node.js', 'AngularJS', 'jQuery'],
        경력여부: ['신입', '인턴', '경력'],
      },
      // save image
      viewImage: null,
      saveImage: null,
    }
  },
  methods: {
    // btn handler
    saveCareerHandler() {
      this.dialog = false
      this.updateCareer()
    },
    saveUserHandler() {
      // password를 바꿈
      if (this.user.password.length !== 0) {
        this.changePassword()
      }
      if (this.saveImage !== null) {
        this.changePhoto()
      }
      this.dialog = false
      this.edit = false
    },
    // career 저장
    async updateCareer() {
      let fixCareer = {
        career: this.careerData.selected.career,
        recruit: this.careerData.selected.recruit,
        tool: this.careerData.selected.tool,
      }
      let result = await FirebaseServices.updateUserCareer(this.$store.state.firebaseUser.uid, fixCareer)
      console.log('save career')
    },
    // 유저 프로필 이미지 바꾸기, 패스워드 바꾸기
    async changePassword() {
      let result = await FirebaseServices.changeUserPassword(this.user.password)
      console.log('change password')
      this.user.password = ''
    },
    onChange: function (file) {
      let loadFile = file.target.files || file.dataTransfer.files
      if (loadFile.length == 0) {
        return
      }
      this.addViewImage(loadFile)
    },
    addViewImage: function(files) {
      let _this = this;
      let file = files[0]
      let reader = new FileReader()
      if (file.type.match(/image.*/)) {
        reader.onload = function(e) {
        _this.viewImage = e.target.result;
      }
        reader.readAsDataURL(file)
        _this.saveImage = file
      } else {
        alert('이미지 파일만 올려주세요.')
      }
    },
    async changePhoto() {
      let result = await FirebaseServices.uploadImage(this.$store.state.firebaseUser.uid, this.saveImage, 'profilePhoto')
      this.$EventBus.$emit('changePhoto', this.viewImage)
    }
  }
}
</script>

<style scoped>
.selectForm {
  display: flex;
}
.inputTag {
  position: absolute;
  cursor: pointer;
  top: 6%; left: 20%; right: 0; bottom: 0;
  width: 256px;
  height: 256px;
  opacity: 0;
}
</style>