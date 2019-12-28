// Firebase default config
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

import router from '../router'
import store from '../store'

const USERS = 'users'
const POSTS = 'posts'
const PORTFOLIO = 'portfolio'
const PORTFOLIOS = 'tportfolio'
const MYPORT = 'portfolios'
const USERDATA = 'userData'

// Firebase SDK snippet
var firebaseConfig = {
    apiKey: "AIzaSyBRFyeE6vVC5EJ36fFxgJvtmkYfs51UfoA",
    authDomain: "devfolio-5745c.firebaseapp.com",
    databaseURL: "https://devfolio-5745c.firebaseio.com",
    projectId: "devfolio-5745c",
    storageBucket: "devfolio-5745c.appspot.com",
    messagingSenderId: "765853346254",
    appId: "1:765853346254:web:586dbdb1e4f60fabb0a39f",
    measurementId: "G-Y1D1RGL6FS"
};

firebase.initializeApp(firebaseConfig)

// firebase 인승상태 지속성
// login 시 페이지 로드가 한번 일어남으로 NONE으로 설정하면 인증이 해제됨
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

const db = firebase.firestore()

export default {
    getComments(uid){
        return new Promise(function(resolve, reject){
            db.collection('comments').doc(uid).get().then(function(data){
                if(data && data.exists){
                    resolve(data.data().comments)
                }
                else{
                    db.collection('comments').doc(uid).set({
                        'uid':uid,
                        'comments':[]
                    })
                    resolve([])
                }
            })
        })
    },
    writeComments(uid, writer, content){
        let data = {
            'writer': writer,
            'content': content,
        }
        return db.collection('comments').doc(uid).update({
            comments: firebase.firestore.FieldValue.arrayUnion(data)
        })
    },
    deleteComments(uid, comment){
        return db.collection('comments').doc(uid).set({
            comments: comment.reverse()
        }).then(console.log('done'))
    },
    //make tag DB
    async setTagsDBall(inputDB){
        let tagsDB_orignal = await db.collection('tags').get()
        tagsDB_orignal = tagsDB_orignal.docs
        for(let i=0;i<tagsDB_orignal.length; i++){
            await db.collection("tags").doc(tagsDB_orignal[i].id).delete()
        }

        for(let tagName in inputDB){
            db.collection("tags").doc(tagName).set(inputDB[tagName])
        }
    },
    getTagsAll(){
        return new Promise(function(resolve,reject){
            db.collection('tags').get().then(function(datas){
                let out = {}
                if(!datas.exists) resolve(out)

                datas = datas.docs
                for(let i=0; i<datas.length; i++){
                    out[datas[i].id] = datas[i].data()
                }

                resolve(out)
            })
        })
    },
    //read user data
    getUserData(uid) {
        return new Promise(function(resolve,reject){
            db.collection('userData').doc(uid).get()
            .then(function(doc) {
                if (doc.exists){
                    resolve(doc.data())
                }
                else{
                    let out = {
                            'bookmarks': [],
                            'uid': uid,
                            'selected': {'career':[], 'recruit':[], 'tool':[]},
                        }
                    db.collection('userData').doc(uid).set(out)

                    resolve(out)
                }
            })
            .catch(function(doc){
                console.log("error getUserData: ",doc)
            })
        })
    },
    updateUserBookmark(from, to,add){
        if (add) {
            return db.collection('userData').doc(from).update({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(to)
            })
        }
        else {
            return db.collection('userData').doc(from).update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(to)
            })
        }
    },
    getBookMarkFromUid(uid){
        return new Promise(function(resolve,reject){
            db.collection('userData').where("bookmarks", "array-contains", uid).get()
            .then(function(doc) {
                let out = []
                for(let i=0;i<doc.size;i++){
                    let temp = doc.docs[i].data()
                    temp['uid'] = doc.docs[i].id
                    temp['addr'] = '/portfoliopage/'+doc.docs[i].id
                    out.push(temp)
                }
                console.log(out);
                resolve(out)
            })
        })
    },
    // write post
    postPost(uid, title, body) {
        return db.collection(POSTS).add({
            uid,
            title,
            body,
            notice: false,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(console.log('done'))
    },
    // 다음 코드는 같은 uid 인 포스트를 조회하여 바꿈
    editPost(pk, uid, title, body, notice, created_at) {
        return db.collection(POSTS).doc(pk).set({
            uid,
            title,
            body,
            notice,
            created_at
            // created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(console.log('done'))
    },
    // 전체 포스트 목록을 조회
    getPosts() {
        const postsCollection = db.collection(POSTS)
        return postsCollection
        .orderBy('created_at', 'desc')
        .get()
        .then((docSnapshots) => {
            let idx = 0
            return docSnapshots.docs.map((doc) => {
                let data = doc.data()
                data.pk = doc.id
                data.view_created = new Date(data.created_at.toDate())
                data.idx = idx
                idx += 1
                return data
            })
        })
    },
    // board_id를 기반으로 하나의 게시글을 불러와 편집
    getPostId(board_id) {
        const postsCollection = db.collection(POSTS)
        return postsCollection
        .get()
        .then((docSnapshots) => {
            let results =  docSnapshots.docs.map((doc) => {
                let data = doc.data()
                data.pk = doc.id
                if (board_id === data.pk) {
                    return data
                }
            })
            for (var result in results) {
                if (results[result] !== undefined) {
                return results[result]
                }
            }
        })
    },
    // 포스트 삭제
    deletePost(board_id) {
        db.collection(POSTS).doc(board_id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    },

    // 포트폴리오 목록 조회
    async getPortfolios(issearch=false , inputOrignal=''){
        let userDB_orignal = await db.collection('userData').get()
        userDB_orignal = userDB_orignal.docs
        let userDB = {}
        for(let i=0;i<userDB_orignal.length; i++){
            let user = userDB_orignal[i]
            userDB[user.id] = user
        }

        let inputList = inputOrignal.trim().replace(',',' ').split(" ")


        return new Promise(function(resolve,reject){
            if(!issearch){
                db.collection('portfolios').get()
                .then(async function(snapshot) {
                    // console.log("getPortfolios(): ",snapshot.docs)
                    let outlist = snapshot.docs
                    let out = []

                    for(let i=0;i<outlist.length;i++){
                        let doc = outlist[i].data()
                        doc.pk = outlist[i].id
                        doc.like = false

                        let user_data = userDB[doc.pk]
                        if(user_data && user_data.exists){
                            doc.userData = userDB[doc.pk].data()
                            // doc.userData.selected = {'career':[],'recruit':[],'tool':[]}
                            // if(true){
                            //     let temp = Math.floor(Math.random() * 3) 
                            //     let li = ['신입', '인턴', '경력']
                            //     doc.userData.selected.career = [li[temp]]
                            // }
                            // if(true){
                            //     let li = []
                            //     if(Math.floor(Math.random() * 2)) li.push('SW 개발')
                            //     if(Math.floor(Math.random() * 2)) li.push('HW 개발')
                            //     if(Math.floor(Math.random() * 2)) li.push('운영')
                            //     if(li.length ==0) li.push("마케팅")
                            //     doc.userData.selected.recruit = li
                            // }
                            // if(true){
                            //     let li = []
                            //     if(Math.floor(Math.random() * 2)) li.push('C#')
                            //     if(Math.floor(Math.random() * 2)) li.push('C++')
                            //     if(Math.floor(Math.random() * 2)) li.push('Java')
                            //     if(li.length ==0) li.push("PHP")
                            //     doc.userData.selected.tool = li
                            // }

                            // db.collection('userData').doc(doc.pk).set(doc.userData)

                            out.push(doc)
                        }
                    }
                    // console.log("getPortfolios() return : ",out)
                    resolve(out)
                })
                .catch(function(res){
                    console.log("getPortfolios() error : ",res)
                })
            }
            else{
                db.collection('portfolios').get()
                .then(async function(snapshot) {
                    // console.log("getPortfolios(): ",snapshot.docs)
                    let foliolist = snapshot.docs
                    let out = []

                    for(let i=0;i<foliolist.length;i++){
                        let doc = foliolist[i].data()
                        let folio = doc.portfolios
                        let inputs = inputList.slice()
                        
                        for(let j=0;j<folio.length;j++){
                            let hashtags = folio[j].hashtags
                            console.log("func hashtags : ",hashtags)
                            for(let k=0;k<hashtags.length;k++){
                                if(typeof(hashtags[k]) != 'string') continue
                                for(let ini=0; ini<inputs.length; ini++){
                                    if(hashtags[k].replace(' ','_') == inputs[ini]){
                                        inputs[ini] = inputs[inputs.length-1]
                                        inputs.pop()
                                        break
                                    }
                                }
                            }
                            if(inputs.length == 0) break
                        }

                        doc.pk = foliolist[i].id
                        doc.like = false
                        let user_data = userDB[doc.pk]
                        if(user_data && user_data.exists){
                            doc.userData = user_data.data()
                        }
                        if(inputs.length != 0 && doc.userData && doc.userData.selected){
                            for(let mainName in doc.userData.selected){
                                let main = doc.userData.selected[mainName]
                                for(let j=0;j<main.length; j++){
                                    for(let ini=0; ini<inputs.length; ini++){
                                        if(typeof(main[j]) != 'string') continue
                                        if(main[j].replace(' ','_') == inputs[ini]){
                                            inputs[ini] = inputs[inputs.length-1]
                                            inputs.pop()
                                            break
                                        }
                                    }
                                }
                                if(inputs.length == 0) break
                            }
                        }
                        console.log("inputs : ",inputs)
                        if(inputs.length == 0){
                            out.push(doc)
                        } 
                    }
                    // console.log("getPortfolios() return : ",out)
                    console.log("search out : ",out)
                    resolve(out)
                })
                .catch(function(res){
                    console.log("getPortfolios() error : ",res)
                })
            }

                
        })
              
    },

    // 포트폴리오 목록 조회 리뉴얼
    getPortfolio(user_id){
        const portfolios = db.collection(PORTFOLIOS)
        const detailPort= portfolios
        .get()
        .then((docSnapshots)=> {
            let results= docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if(data.uid==user_id){
                    return data;
                }
            })
            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailPort;
    },

    // 나의 포트폴리오 가져오기
    async getMyPort(user) {
        const portfolios = db.collection(MYPORT)
        const detailPort = await portfolios
        .get()
        .then((docSnapshots)=> {
            let results = docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if(data.uid == user) {
                    return data;
                }
            })

            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailPort;
    },

    // 파이어베이스에 포트폴리오를 입력하는 함수
    // hashtag 를 저장하는 단계에서 str.toLowerCase() 함수를 사용하여 소문자로 변환, 저장하기 <- 검색 단계를 위함
    postPortfolios(user, aboutMe, foliotheme, banner, portfolios, skills, subtitle, title) {
        return db.collection(MYPORT).doc(user).set({
            uid: user,
            title: title,
            subtitle: subtitle,
            aboutMe: aboutMe,
            skills: skills,
            portfolios: portfolios,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            foliotheme: foliotheme,
            banner: banner
        }).then(console.log('done'))
    },
    // userstate 1. onAuthStateChanged
    // auth 개체 관찰자. auth의 변경을 감시함
    userState() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('user is signed in')
                return true;
            }
            else {
                console.log('No user is signed in')
                return false;
            }
        })
    },
    // 현재 로그인 user doc 가져오기
    async currentUser() {
        var user = firebase.auth().currentUser;
        var docRef = db.collection(USERS);
        const detailedUser = docRef.get().then((docSnapshots) => {
            let results = docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if (data.uid === user.uid) {
                    return data
                }
            })
            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailedUser
    },

    changePassword: function(password) {
        var user = firebase.auth().currentUser;
        var newPassword = password;

        user.updatePassword(newPassword).then(function() {
            console.log('password is updated.')
        }).catch(function(error) {
            console.log('password update is failed.')
        })
    },

    // 0806 view data
    async getVisitView(userID) {
        const userView = db.collection(USERDATA)
        const viewData = await userView.get()
            .then((docSnapshots)=> {
                let results = docSnapshots.docs.map((doc) => {
                    let data = doc.data()
                    if(data.uid == userID) {
                        return data;
                    }
                })
                for (var res in results) {
                    if (results[res] !== undefined) {
                        return results[res]
                    }
                }
            })
        return viewData;
    },
    // 0806 view data update
    // updated view
    updateUserView(userID, result) {
        return db.collection(USERDATA).doc(userID).update({
            visit: result
        })
    },
    // 0807 user career data get
    getUserCareer(userID) {
        return new Promise(function(resolve, reject) {
            db.collection(USERDATA).doc(userID).get()
                .then(function(snapshot) {
                    if (snapshot.empty) {
                        resolve(null)
                    }
                    let out = new Array()
                    out.push(snapshot.data())
                    resolve(out[0].selected)
                })
                .catch(function(res) {
                    console.log("error: ", res)
                })
        })
    },
    // 0807 user career data update
    updateUserCareer(userID, result) {
        return db.collection(USERDATA).doc(userID).update({
            selected: result
        })
    },
    // login 1. create DB
    // 신규유저 생성시 users 컬렉션에 uid로 접근 가능한 문서 생성
    async createdbForNewUser(userID, date, name) {
        await db.collection(USERDATA).doc(userID).set({
            displayName: name,
            uid: userID,
            bookmarks: [],
            visit: [],
            selected: {
                recruit: [],
                tool: [],
                career: [],
            },
            created_at: date,
            photoURL: 'http://dy.gnch.or.kr/img/no-image.jpg',
        })
    },
    // 현재 로그인 된 유저의 프로필 정보를 업데이트
    updatedForUser(display_name, photo_url) {
        var user = firebase.auth().currentUser
        user.updateProfile({
            displayName: display_name,
            photoURL: photo_url
        })
        console.log(user)
    },
    // store 에 있는 유저정보 업데이트
    updatedStoreUser() {
        let _user = firebase.auth().currentUser
        if (_user) {
            store.commit('setUserName', _user.displayName)
            store.commit('setUserState', true)
            store.commit('setPhotoURL', _user.photoURL)
        }
        else {
            store.commit('setUserName', '')
            store.commit('setUserState', false)
            store.commit('setPhotoURL', null)
        }
    },
    // login 2-2. login google
    loginUserWithGoogle() {
        let _this = this
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                _this.createdbForNewUser(result.user.uid, '20190813', result.user.displayName)
            }
        })
        .catch(function(error) {
            console.log(error.code, error.message)
        })
    },
    // login 2-3. login facebook
    loginUserWithFacebook() {
        let _this = this
        let provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                _this.createdbForNewUser(result.user.uid, '20190813', result.user.displayName)
            }
            console.log(result)
        })
        .catch(function(error) {
            console.log(error.code, error.message)
        })
    },
    // login 3. logout
    logoutUser() {
        firebase.auth().signOut().then(function() {})
        // 로그아웃 후 세션삭제
            .then(sessionStorage.clear())
            // 홈페이지로 이동
            .then(router.push('/'))
            .catch(function(error) {
                console.log(error)
        })
    },
    login() {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log(error)
        })
        .then('done')
    },
    // changePassword
    changeUserPassword(password) {
        var user = firebase.auth().currentUser;
        var newPassword = password

        user.updatePassword(newPassword).then(function() {
            console.log('done')
        }).catch(function(error) {
            console.log('error: ', error)
        });
    },
    updateUser() {
        // 이미지 올리면 유저 변경
    },
    // 이미지 업로더
    uploadfile(user, loadFile) {
       let filename = loadFile.name
       let storageRef = firebase.storage().ref('/users/' + user + '/' + filename)
       let uploadTask = storageRef.put(loadFile)
       uploadTask.on('state_changed', function(snapshot) {
         // progressbar
         // 진행정도를 보여줌
         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done')
         switch (snapshot.state) {
           case firebase.storage.TaskState.PAUSED:
             console.log('Upload is paused')
             break
           case firebase.storage.TaskState.RUNNING:
             console.log('Upload is running')
             break
         }
       }, function(error) {
         console.log(error)
         switch (error.code) {
           case 'storage/unauthorized':
             break
           case 'storage/canceled':
             break
           case 'storage/unknown':
             break
         }
       }, function() {
           uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           console.log('File available at', downloadURL)
         })
       })
     },
     uploadImage(user, loadFile, path) {
        console.log(loadFile)
        let filename = loadFile.name
        let storageRef = firebase.storage().ref('/users/' + user + '/' + path + '/' + filename)
        let uploadTask = storageRef.put(loadFile)
        uploadTask.on('state_changed', function(snapshot) {
          // progressbar
          // 진행정도를 보여줌
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running')
              break
          }
        }, function(error) {
          console.log(error)
          switch (error.code) {
            case 'storage/unauthorized':
              break
            case 'storage/canceled':
              break
            case 'storage/unknown':
              break
          }
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var user = firebase.auth().currentUser
                user.updateProfile({
                    photoURL: downloadURL
                })
                db.collection(USERDATA).doc(user.uid).update({
                    photoURL: downloadURL
                })
            console.log('File available at', downloadURL)
          })
        })
      }
    }
