<template>
  <v-layout row align-center style="min-height: 100vh; position: relative; background-size: cover; background-image: url('img/mainbanner.png');">
      <!-- 회원가입 화면 -->
        <v-layout v-show="viewSign" row class="loginLayout" style="background-color: #fafafa; padding-left: 10rem; padding-right: 10rem; margin-top: 1rem;">
          <div class="py-5 pageDescript" style="margin-top: 2rem;">
            <h1 class="headline pb-2 loginh1">쉽고 빠르게</h1>
            <h1 class="headline pb-2 loginh1">당신의 포트폴리오를</h1>
            <h1 class="headline pb-2 loginh1">완성하기 위한 방법,</h1>
            <p class="headline pb-2 loginp">바로 시작해 보세요.</p>
          </div>
          <div class="py-5">
            <v-flex>
              <!-- logo -->
              <div>
                <a class="homeBtn" href="/"><p style="color: #FFBDC2;">DEVFOLIO</p></a>
              </div>
              <!-- hint text -->
              <div>
                <h3 class="loginh3">포트폴리오를 만들고,<br>공유하려면 가입하세요.</h3>
              </div>
              <!-- login function -->
              <LoginButtons v-bind:viewSign="viewSign"/>

              <!-- <div>
                <p>가입하면 서비스 이용약관, 개인정보 처리방침에 동의하게 됩니다.</p>
              </div> -->
            </v-flex>
            <v-flex>
              <div>
                <span>계정이 있으신가요?</span>
                <v-btn flat small style="width: 116px;" @click="viewSign = !viewSign">로그인하기</v-btn>
              </div>
            </v-flex>
          </div>
        </v-layout>


        <!-- 로그인 화면 -->
        <v-layout v-show="!viewSign" row class="loginLayout" style="background-color: #fafafa; padding-left: 10rem; padding-right: 10rem; margin-top: 1rem;">
          <div class="py-5">
            <v-flex>
              <!-- logo -->
              <div>
                <a class="homeBtn" href="/"><p style="color: #FFBDC2;">DEVFOLIO</p></a>
              </div>

              <!-- login function -->
              <LoginButtons v-bind:viewSign="viewSign"/>

              <!-- <div>
                <p>가입하면 서비스 이용약관, 개인정보 처리방침에 동의하게 됩니다.</p>
              </div> -->
            </v-flex>
            <v-flex>
              <div>
                <span>계정이 없으신가요?</span>
                <v-btn flat small style="width: 116px;" @click="viewSign = !viewSign">가입하기</v-btn>
              </div>
            </v-flex>
          </div>
        </v-layout>
  </v-layout>
</template>

<script>
import LoginButtons from '../components/LoginButtons'

export default {
  name: 'loginpage',
  components: {
    LoginButtons
  },
  data () {
    return {
      viewSign: true,
    }
  }
}
</script>

<style scope>

.loginh1, .loginp {
  text-align: left;
}
.loginh3 {
  text-align: center;
}
.loginCtn {
  margin:100px auto;
}
.loginLayout {
  /* background-color: white; */
  /* text-align: center; */
  /* display: inline-block; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
}
.homeBtn {
  color: #E67079;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 4px 4px 0px #1565C0, 8px 8px 0px #42A5F5, 12px 12px 0px #E3F2FD;
  font-size: 1.9rem;
}
.pageDescript {
  width: 400px;
}

@media screen and (max-width: 1088px) {
  .pageDescript {
    display: none;
  }
}
</style>
