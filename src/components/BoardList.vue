<template>
    <v-container>
        <v-card-title primary-title>
            Notices
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <!-- 게시판 -->
        <v-data-table flat :headers="headers" :items="posts" :expand="expand" item-key="title" :loading="true" :search="search" class="elevation-1">
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
                <tr @click="props.expanded = !props.expanded; showDetail(props.item.body)">
                    <!-- 글 번호 지정 -->
                    <td v-if="props.item.notice"><v-btn small round color="primary" style="width: 2rem;">공지</v-btn></td>
                    <td v-else>{{ posts.length - props.item.idx }}</td>
                    <td class="text-xs-right">{{ props.item.title }}</td>
                    <td class="text-xs-right">{{ props.item.view_created }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon small class="mr-2" @click="editItem(props.item.pk)">
                            edit
                        </v-icon>
                        <v-icon small @click="deleteItem(props.item.pk)">
                            delete
                        </v-icon>
                    </td>
                    <td class="text-xs-center">
                        <v-icon v-if="props.item.notice" small class="mr-2" color="warning" @click="enrollNotice(props.item.pk)">
                            star
                        </v-icon>
                        <v-icon v-else small class="mr-2" @click="enrollNotice(props.item.pk)">
                            star
                        </v-icon>
                    </td>
                </tr>
            </template>
            <template v-slot:expand="props">
                <v-card flat>
                    <v-card-text style="padding-top: 2rem; padding-bottom: 4rem;">{{ content }}</v-card-text>
                </v-card>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </template>
        </v-data-table>
        <v-flex class="py-4">
            <!--권한 db 저장된 이후, display none 하기-->
            <v-btn color="info" @click="writeMode()">
                write
            </v-btn>
        </v-flex>
    </v-container>
</template>

<script>
// firebase
import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase'

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
    data() {
        return{
        expand: false,
        content: '',
        search: '',
        headers: [
            {
            text: '번호',
            align: 'center',
            sortable: false,
            value: 'number'
            },
            { 
            text: '제목',
            align: 'center',
            sortable: false,
            value: 'title',
            },
            { 
            text: '등록일',
            align: 'center',
            sortable: false,
            value: 'date'
            },
            { 
            text: '수정/삭제',
            align: 'center',
            sortable: false,
            value: 'change'
            },
            {
            text: '공지설정',
            align: 'center',
            sortable: false,
            value: 'notice'
            }
        ],
        // firebase에서 가져옴
        posts: [],
        tmp: [],
        post: [],
        islogin:true,
        toggle_exclusive: 2
    }},
    mounted() {
        checklogin(this)
        this.getPosts()
    },
    props: {
        propsdata: {type: String}
    },
    methods: {
        async getPosts() {
            this.posts = await FirebaseServices.getPosts()
            console.log(this.posts)
            for (var post in this.posts) {
                if (this.posts[post].notice === true) {
                    this.tmp.push(this.posts[post])
                    this.posts.splice(post, 1)
                }
            }
            this.posts = this.tmp.concat(this.posts)
        },
        writeMode: function() {
            this.propsdata = 'write'
            this.$emit('send-state', this.propsdata)
        },
        showDetail: function(content) {
            this.content = content
        },
        editItem: function(pk) {
            this.$router.push('/board/' + pk)
        },
        async deleteItem(pk) {
            await FirebaseServices.deletePost(pk)
            setTimeout(function() {
                window.location.reload()
            }, 500);
            // this.$router.push('/board')
        },
        async enrollNotice(pk) {
            for (let post in this.posts) {
                if (this.posts[post].pk === pk) {
                    console.log(this.posts[post])
                    if (this.posts[post].notice === true) {
                        this.posts[post].notice = false
                    } 
                    else {
                        this.posts[post].notice = true
                    }
                    const user = firebase.auth().currentUser
                    await FirebaseServices.editPost(this.posts[post].pk, user.uid, this.posts[post].title, this.posts[post].body, this.posts[post].notice, this.posts[post].created_at)
                }
            }
            window.location.reload()
        }
    }
}
</script>

