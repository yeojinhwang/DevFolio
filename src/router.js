import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'
import firebaseApp from 'firebase/app'
import AdminPage from './views/AdminPage.vue'
import UserPage from './views/UserPage.vue'
import LoginPage from './views/LoginPage.vue'

import Board from "./views/BoardPage.vue"
import BoardEdit from './views/BoardEdit.vue'
import WritePort from './views/WritePort.vue'

import AdminUser from './components/AdminVues/AdminUser.vue'
import AdminDb from './components/AdminVues/AdminDb.vue'
import AdminStorage from './components/AdminVues/AdminStorage.vue'

import PortfolioPage from './views/PortfolioPage.vue'
import mainPortfolioPage from './views/MainPortfolioPage'
// 검색 결과 페이지 링크
import SearchResult from './views/SearchResult.vue'

// 포트폴리오 입력 링크
import PortfolioWrite from './views/PortfolioWrite.vue'

import TestPage from './views/TestPage.vue'

Vue.use(Router)

// 로그인 상태 정보를 vuex에 저장하고 판단
const requireAuth = () => (to, from, next) => {
    const inUser = true
    firebaseApp.auth().onAuthStateChanged(function(user){
        if(!user || !user.uid){
            inUser = false
        }
    })
    if (inUser === false) {
        alert('로그인이 필요합니다!')
        return next('/login')
    }
    next()
}

const existAuth = () => (to, from, next) => {
    const inUser = false
    firebaseApp.auth().onAuthStateChanged(function(user){
        if (user) {
            inUser = true
        }
    })
    if (inUser === true) {
        alert('로그인되어 있습니다!')
        return next('/')
    }
    console.log('asdasd')
    next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/user/:userId',
            name: 'userpage',
            component: UserPage,
            // router guard
            beforeEnter: requireAuth()
        },
        {
            path: '/login',
            name: 'loginpage',
            component: LoginPage,
            beforeEnter: existAuth()
        },
        {
            path: '/board',
            name: 'board',
            component: Board
        },
        {
            path: '/board/:board_id',
            name: 'boardedit',
            component: BoardEdit
        },
        {
            path: '/writeport',
            name: 'writeport',
            component: WritePort
        },
        {
            path: '/search/:search_value',
            name: 'search',
            component: mainPortfolioPage
        },
        {
            path: '/write_portfolio',
            name: 'write_portfolio',
            component: PortfolioWrite
        },
        {
            path: '/test',
            name: 'test',
            component: TestPage
        },
        {
            path: '/portfoliopage',
            name: 'portfoliopage',
            component: PortfolioPage,
            beforeEnter: requireAuth()
        },
        {
            path: '/portfoliopage/:uid',
            name: 'portfoliopage',
            component: PortfolioPage
        },
        {
            path: '/Portfolios',
            name: 'mainportfoliopage',
            component: mainPortfolioPage
        },
        {
            path: '/admin',
            name: 'adminpage',
            component: AdminPage,
            children: [
                {
                  path: 'user',
                  name: 'adminuser',
                  component: AdminUser
                },
                {
                  path: 'data',
                  name: 'admindb',
                  component: AdminDb
                },
                {
                    path: 'storage',
                    name: 'adminstorage',
                    component: AdminStorage
                },

            ]
        }
    ]
})
