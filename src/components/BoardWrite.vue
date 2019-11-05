<template>
  <v-container style="background-color: white;">
    <v-flex>
      <v-text-field
        v-model="title"
        label="제목"
        placeholder="제목을 입력해주세요."
      ></v-text-field>
    </v-flex>

    <v-flex>
      <v-textarea
        v-model="text"
        name="inputField"
        label="내용"
        value=""
        rows="25"
        hint="Hint text"
      ></v-textarea>
    </v-flex>

    <v-flex>
      <v-btn color="success" @click="postPost()">submit</v-btn>
      <v-btn color="error" @click="ListMode()">cancel</v-btn>
    </v-flex>

  </v-container>
</template>

<script>
// firebase
import FirebaseServices from '../services/FirebaseServices';
import firebase from 'firebase'

import router from '../router'


function checklogin(th){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            th.islogin = true
        } 
        else {
            // User is signed out.
            th.islogin = false
        }
    })
}

export default {
	name: 'Board',
	props: {
	},
  data () {
    return{
      title:'',
      text:'',
      islogin:true
    }
  },
  props: {
    propsdata: {type: String}
  },
  mounted () {
    checklogin(this)
  },
	methods: {
    // 글 작성 후 뒤로 가기
    async postPost () {
      const user = firebase.auth().currentUser
      await FirebaseServices.postPost(user.uid, this.title, this.text)
      this.ListMode()
    },
    ListMode: function() {
        this.propsdata = 'view'
        this.$emit('send-state', this.propsdata)
    },
    execute: function() {
      this.$router.push('/board')
    }
  }
}
</script>

<style>

</style>

