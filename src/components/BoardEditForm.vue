<template>
  <v-container style="background-color: white;">
    <v-flex>
      <v-text-field
        v-model="title"
        label="제목"
        placeholder="title"
      ></v-text-field>
    </v-flex>

    <v-flex class="py-3">
      <v-textarea
        v-model="body"
        name="inputField"
        label="내용"
        value=""
        rows="25"
        hint="Hint text"
      >{{ body }}</v-textarea>
    </v-flex>

    <v-flex>
      <v-btn color="success" @click="postPost()">submit</v-btn>
      <v-btn color="error" @click="ListMode()">cancel</v-btn>
    </v-flex>

  </v-container>
</template>

<script>
// firebase
import FirebaseServices from '../services/FirebaseServices'
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
  data () {
    return{
      title: '',
      post: {},
      body:'',
      islogin:true
    }
  },
  mounted () {
    checklogin(this)
    this.getPost()
  },
	methods: {
    // 글 작성 후 뒤로 가기
    async getPost() {
      this.post = await FirebaseServices.getPostId(this.$route.params.board_id)
      this.title= this.post.title
      this.body = this.post.body
    },
    async postPost () {
      const user = firebase.auth().currentUser
      this.post.created_at = firebase.firestore.FieldValue.serverTimestamp()
      await FirebaseServices.editPost(this.post.pk, user.uid, this.title, this.body, this.post.notice, this.post.created_at)
      this.ListMode()
    },
    ListMode: function() {
        this.$router.push('/board')
    }
  }
}
</script>

<style>

</style>

