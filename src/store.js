import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchItem :'',
    imgurID: "Client-ID eadc208fc721efd",
    // firebase user info
    firebaseUser: {
      inUser: false,
      uid: null,
      name: null,
      email: null,
      photoURL: null,
    },
    theme: 'default',
    imgSrc: {
      noImgSrc: 'http://dy.gnch.or.kr/img/no-image.jpg',
    },
    today: null
  },
  mutations: {
    changeItem : function(state, payload){
      state.searchItem=payload;
    },
    changeTheme(state, color) {
      state.theme = color
    },
    setDate(state, date) {
      state.today = date
    },
    setUserName(state, rename) {
      state.firebaseUser.name = rename
    },
    setUserState(state, bool) {
      state.firebaseUser.inUser = bool
    },
    setUserId(state, id) {
      state.firebaseUser.uid = id
    },
    setPhotoURL(state, link) {
      state.firebaseUser.photoURL = link
    }
  },
  actions: {
  },
  getters: {
    searchItem : state => state.searchItem
  }
})
