<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn small v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">My account</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <!-- user name -->
                        <v-flex xs12 sm6 md4>
                            <v-text-field label="display name*" v-model="displayName" required>{{ displayName ? displayName : '' }}</v-text-field>
                        </v-flex>
                        <!-- user img -->
                        <v-flex xs12 sm6 md4>
                            <v-avatar size="256" class="profileImg">
                                <img id="image" :src="photoURL ? photoURL:this.$store.state.imgSrc.noImgSrc" alt="avatar">
                            </v-avatar>
                            <!-- imageUpload -->
                            <input id="file" type="file" @change="uploadImage">
                        </v-flex>
                        <!-- password -->
                        <v-flex xs12>
                            <v-text-field id="password" label="Password*" type="password"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false, changeSave()">Save</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'

export default {
    name: 'UserProfileBtn',
    components: {
    },
    data () {
        return {
            dialog: false
        }
    },
    props: {
        photoURL: {type: String},
        displayName: {type: String}
    },
    methods: {
        uploadImage() {
            let file = document.getElementById('file')
            let image = document.getElementById('image')
            let target = event.currentTarget
            let xmlHttpRequest = new XMLHttpRequest()
            xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true)
            xmlHttpRequest.setRequestHeader("Authorization", this.$store.state.imgurID)
            xmlHttpRequest.send(target.files[0])

            xmlHttpRequest.onreadystatechange = () => {
                if (xmlHttpRequest.readyState == 4) {
                    if (xmlHttpRequest.status == 200) {
                        let result = JSON.parse(xmlHttpRequest.responseText)
                        this.photoURL = result.data.link
                    } 
                    else {
                        alert("업로드 실패")
                        this.photoURL = ""
                    }
                }
            }
        },
        changeSave: function() {
            FirebaseServices.updatedForUser(this.displayName, this.photoURL)
            let password = document.getElementById('password')
            if (password) {
                FirebaseServices.changePassword(password)
            }
        }
    }
}
</script>

<style>

</style>
