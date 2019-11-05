<template>
  <v-layout>
    <v-flex>
      <!-- login provider -->
      <v-flex>
        <div id="loginProvider">
          <v-btn 
            class="loginBtn"
            depressed small style="color: #0F9D58;"
            @click="googleLogin">
            <v-icon right dark style="
              margin-left: 0px;
              margin-right: 7px;
              ">fab fa-google</v-icon>
            Google로 로그인
          </v-btn>
        </div>

        <div id="loginProvider">
          <v-btn
            class="loginBtn"
            depressed small style="color: #3b5998;"
            @click="facebookLogin">
            <v-icon right dark style="
              margin-left: 0px;
              margin-right: 7px;
            ">fab fa-facebook-square</v-icon>
            Facebook으로 로그인
          </v-btn>   
        </div>
      </v-flex>

      <v-divider></v-divider>

      <!-- email with password -->
      <v-form
        ref="form"
        v-model="form"
        v-show="viewSign"
        >
        <!-- email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          filled
          label="Email address"
          type="email"
          style="width:240px; margin: auto;"
        ></v-text-field>
        <!-- displayName -->
        <!-- 회원가입 폼에서만 보임 -->
        <v-text-field
          v-model="displayName"
          :rules="nameRules"
          filled
          label="name"
          name="nameForm"
          style="width:240px; margin: auto;"
          v-on:keyup="characterCheck()"
          v-on:keydown="characterCheck()"
        ></v-text-field>
        <!-- password -->
        <v-text-field
          v-model="password"
          :append-icon="pwShow ? 'visibility' : 'visibility_off'"
          :rules="pwRules"
          filled
          label="Password"
          :type="pwShow ? 'text' : 'password'"
          @click:append="pwShow = !pwShow"
          style="width:240px; margin: auto;"
        ></v-text-field>

        <!-- 개인정보 동의란 -->
        <!-- checkBox -->
        <v-checkbox
          v-show="viewSign"
          v-model="agreement"
          :rules="agreeRules"
        >
          <template
            v-slot:label>
            <div
            style="font-size: 11px">
              I agree to the&nbsp;
              <a href="#"
                style="color: black"
                @click.stop.prevent="dialog = true">Terms of Service</a>
              &nbsp;and&nbsp;
              <a href="#"
                style="color: black"
                @click.stop.prevent="dialog = true">Privacy Policy</a>*
            </div>
          </template>
        </v-checkbox>
        <!-- 개인정보동의 modal -->
        <v-dialog
          v-model="dialog"
          absolute
          max-width="400"
          persistent
        >
          <v-card>
            <v-card-title class="title">개인정보 수집 및 이용에 대한 동의</v-card-title>
            <v-card-text style="text-align: left">
              <p>1. 개인정보의 수집 및 이용목적</p>
              <div>
                실명확인 및 본인여부 확인, 포트폴리오 제공,채용정보 안내 및 채용선별 자료 등으로 이용
              </div>
              <v-divider></v-divider>
              <p>2. 개인정보 수집 항목</p>
              <div class="text-left">
                1. 필수항목<br>
                    개인식별정보 (성명, 생년월일, 비밀번호, 사진 등)<br>
                    기초정보 (희망연봉, 전화번호, 종교, 휴대전화번호, E-mail, 자택주소 등)<br>
                    신상정보 (병역사항, 병역기간, 군별, 계급, 보훈대상여부, 장애대상여부, 미필사유 등)<br>
                    학력정보 (재학기간, 학교, 전공, 졸업여부, 소재지, 성적 등)<br>
                    포트폴리오<br>
                2. 선택항목<br>
                    Git 정보 (Git 주소, 코드 등)<br>
                    홈페이지 정보 (홈페이지 링크 정보, 홈페이지 트래픽 정보)
              </div>
              <v-divider></v-divider>
              <p>3. 개인정보의 보유 및 이용기간</p>
              <div>
                회사는 개인정보 수집 및 이용목적이 달성된 경우, 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우에는 해당 정보를 지체 없이 파기 합니다.
              </div>
            </v-card-text>

            <v-divider></v-divider>
            
            <p style="font-size:12px">※ 귀하는 상기의 개인정보 수집 및 이용 동의를 거부할 수 있습니다.</p>

            <v-card-actions>
              <v-btn
                flat
                text
                @click="agreement = false, dialog = false"
              >
                No
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                flat
                class="white--text"
                color="deep-purple accent-4"
                @click="agreement = true, dialog = false"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          class="loginBtn"
          :loading="loading"
          :disabled="!form"
          color="success"
          @click="loader()"
        >
          가입하기
        </v-btn>
      </v-form>
      
      <v-form
        ref="form"
        v-model="form"
        v-show="!viewSign"
        >
        <!-- email -->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          filled
          label="Email address"
          type="email"
          style="width:240px; margin: auto;"
        ></v-text-field>
        <!-- password -->
        <v-text-field
          v-model="password"
          :append-icon="pwShow ? 'visibility' : 'visibility_off'"
          :rules="pwRules"
          filled
          label="Password"
          :type="pwShow ? 'text' : 'password'"
          @click:append="pwShow = !pwShow"
          style="width:240px; margin: auto;"
        ></v-text-field>

        <v-btn
          class="loginBtn"
          :loading="loading"
          :disabled="!form"
          color="success"
          @click="loader()"
        >
          로그인
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase'
import router from '../router'
import store from '../store'

export default {
  name: 'Loginbuttons',
  components: {
  },
  props:['viewSign'],
  data () {
    return {
      // login modal
      agreement: false,
      dialog: false,
      // form
      form: false,
      // input rules
      email: '',
      emailRules: [
        v => !!(v || '').match(/@/) || '@를 포함한 email을 입력해주세요.',
      ],
      displayName: '',
      nameRules: [
        v => !!v || '이름을 입력해주세요.',
      ],
      // pw rule
      pwShow: false,
      password: '',
      pwRules: [
        v => !!v || '비밀번호를 입력해주세요.',
        v => v.length >= 8 || '최소 8자 이상 입력해주세요.',
      ],
      // service rule
      agreeRules: [
        v => !!v || '동의가 필요합니다.',
      ],
      // loading button
      loading: false,
    }
  },
  methods: {
    loader() {
      // btn 클릭에 맞는 func
      if(this.viewSign == true) {
        this.createUserWithEmail()
      } else {
        this.emailLogin()
      }
      // 로딩활성화
      this.loading = true
    },
    async createUserWithEmail() {
      let _this = this
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(function(user) {
          FirebaseServices.createdbForNewUser(user.user.uid, _this.$store.state.today, _this.displayName)
          // 유저 생성하면서 입력받은 이름 설정
          let _user = firebase.auth().currentUser
          _user.updateProfile({
              displayName: _this.displayName,
              photoURL: 'http://dy.gnch.or.kr/img/no-image.jpg'
          })
          setTimeout(function () {
            router.push('/')
          }, 2000)
        })
        .catch(function(err) {
            if (err.code == 'auth/email-already-in-use') {
              alert('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.')
              _this.email = ''
            }
            _this.loading = false
            _this.agreement = false
        })
    },
    async emailLogin() {
      let _this = this
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(function(result) {
          store.commit('setPhotoURL', result.user.photoURL)
          setTimeout(function () {
            router.push('/')
          }, 2000)
        })
        .catch(function(err) {
          if (err.code == 'auth/user-not-found') {
            alert('존재하지 않는 유저 입니다.')
            _this.email = ''
            _this.password = ''
          }
          else if (err.code == 'auth/wrong-password') {
            alert ('비밀번호가 틀렸습니다. 다시 입력해주세요.')
            _this.password = ''
          }
          _this.loading = false
        })
    },
    async googleLogin() {
      await FirebaseServices.loginUserWithGoogle()
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          router.push('/')
        }
      })
    },
    async facebookLogin() {
      await FirebaseServices.loginUserWithFacebook()
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          router.push('/')
        }
      })
    },
    // 유저네임 특수문자 제한
    characterCheck() {
      let RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi
      let obj = document.getElementsByName("nameForm")[0]
      if (RegExp.test(obj.value)) {
        // 현재 데이터와 연결해서 특수문자 입력을 받으면 마지막 문자를 제거
        this.displayName = obj.value.substring(0, obj.value.length - 1)
        alert('특수문자는 입력하실 수 없습니다.')
      }
    }
  }
}
</script>

<style>
.loginBtn {
  width:240px;
}
.v-divider {
  margin: 20px;
}
#loginProvider {
  height: 30px;
}
</style>