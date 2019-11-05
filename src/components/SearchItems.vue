<!-- main page에서 제시되는 추천 검색어 -->
<template>
  <v-layout row justify-center align-center class="px-5" style="padding-top: 15rem; padding-bottom: 15rem;">
    <v-flex>
        <p style="font-size: 5vmin;">관심 있는 분야의 포트폴리오를 키워드로 검색해보세요.</p>
    </v-flex>
    <v-flex class="px-3">
        <p style="font-size: 3vmin; font-weight: 600;">검색어 제안</p>
        <v-btn round depressed large v-on:click="inputChange('빅데이터')">빅데이터</v-btn>
        <v-btn round depressed large v-on:click="inputChange('iot')">IoT</v-btn>
        <v-btn round depressed large v-on:click="inputChange('ai')">AI</v-btn>
        <v-btn round depressed large v-on:click="inputChange('블록체인')">블록체인</v-btn>
        <v-btn round depressed large v-on:click="inputChange('front-end')">front-end</v-btn>
        <v-btn round depressed large v-on:click="inputChange('mysql')">MySQL</v-btn>
        <v-btn round depressed large v-on:click="inputChange('임베디드')">임베디드</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
      name: 'SearchItems',
      methods : {
        inputChange(inputItem){
          this.$router.push('/search/' + inputItem)
        }
      }
    }
</script>
