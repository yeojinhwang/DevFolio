<template>
<div class="text-xs-center" >
    <v-dialog v-model="dialog" width="300">
        <template v-slot:activator="{ on }">
            <v-btn v-if="isVisible" color="red lighten-2" dark v-on="on" @click="loginWithUi()">
                Login
            </v-btn>
            <v-btn v-if="isVisible" color="red lighten-2" dark @click="signout()">
                Logout
            </v-btn>
        </template>

        <v-card>
            <v-card-text id="firebaseui-auth-container">
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">
                    cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
// firebase
import FirebaseService from '../services/FirebaseServices'
import firebase from 'firebase'
// firebase ui settings
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
// component
// import UserInfo from '../components/UserInfo'

export default {
  name: 'LoginModal',
  components: {
  },
  data () {
    return {
      dialog: false,
      // 미구현 / login logout 전환
      isVisible: true
    }
  },
  created () {
    this.userState()
  },
  methods: {
		loginWithUi() {
			var uiConfig = {
        callbacks: {
          // signin 성공시 실행하는 함수 return이 true일시 페이지 로드를 함
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // // 1. 로그인한 유저 정보
            // console.log(authResult)
            // // 2. 신규가입 유저인지 아닌지 판단
            // console.log(authResult.additionalUserInfo.isNewUser)

            if (authResult.additionalUserInfo.isNewUser) {
              // 신규 유저면 데이터베이스 생성
              FirebaseServices.createdbForNewUser(authResult.user.uid)
            }
            return true;
          },
        },
        credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        immediateFederatedRedirect: false,
				signInSuccessUrl: 'http://localhost:8080/',
				signInOptions: [
          // firebaseui login 지원
          // 1. 구현
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // 2. 미구현
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
				],
				tosUrl: '<your-tos-url>',
				privacyPolicyUrl: function() {
				window.location.assign('<your-privacy-policy-url>');
				}
			}

      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())

      // if (ui.isPendingRedirect()) {
      //   ui.start('#firebaseui-auth-container', uiConfig)
      // } else {
      //   console.log('현재 세션에 로그인한 유저가 있습니다.')
      // }
      console.log("login print pre: ",document.querySelector('#firebaseui-auth-container').style)
      ui.start('#firebaseui-auth-container', uiConfig)
      console.log("login print: ",document.querySelector('#firebaseui-auth-container').style)

      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    },
    signout() {
      firebase.auth().signOut().then(function() {
      }).catch(function(error) {
        console.log(error)
      })
    },
    // onAuthStateChanged
    // auth 개체 관찰자. auth의 변경을 감시함
    userState() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('user is signed in')
        } else {
          console.log('No user is signed in')
        }
      })
    },
	}
}
</script>

<style>

</style>
