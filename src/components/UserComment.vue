<template>
<div>
    <h3>comment 갯수 : {{comments.length}}개</h3>
    <ul>
        <li v-for="comment in comments">
            <p>작성시간 : {{comment.time}}</p>
            <p>작성자 : {{comment.writer}}</p>
            <p>{{comment.content}}</p>
            <button v-if="comment.writer == meUid" @click="deleteFunc(comment)">delete</button>
        </li>
    </ul>

    <hr>
    <div v-if="myUid && myUid != userUid">
        <textarea v-model="writeContent"  rows="4" cols="50"></textarea>
        <button @click="writeFunc()">write</button>
    </div>


</div>
</template>

<script>
import FirebaseServices from '@/services/FirebaseServices.js'
import firebase from 'firebase/app'

export default {
    name:'UserComments',
    components:{
        FirebaseServices,
    },
    data(){
        return {
            comments:[],
            writeContent:'',
        }
    },
    props:{
        userUid:{type:null},
        myUid:{type:null},
    },
    created(){
        let th = this
        FirebaseServices.getComments(userUid).then(function(data){
            th.userUid = data
        })
    },
    methods:{
        writeFunc:function(){
            FirebaseServices.writeComments(this.userUid, this.myUid, this.writeContent)
            let newComment = {content:this.writeContent , writer:this.myUid , time:firebase.database.ServerValue.TIMESTAMP}
            this.comments.push(newComment)
        },
        deleteFunc: function(comment){
            FirebaseServices.deleteComments(this.userUid,comment)
            for(let i=0; i<this.comments.length; i++){
                if(this.comments[i] == comment){
                    for(let j=i; j<this.comments.length; j++){
                        this.comments[j] = this.comments[j+1]
                    }
                }
                this.comments.pop()
            }
        },

    }

}
</script>

<style lang="scss" scoped>

</style>