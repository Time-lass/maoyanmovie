import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Main',
    component: () => import('../views/Main.vue'),

    //二级路由
    children: [
      {
        path: '/',
        name: 'Movie',
        component: () => import('../views/Movie.vue'),
      },
      {
        path: 'mtheatre',
        name: 'Mtheatre',
        component: () => import('../views/Mtheatre.vue')
      },
      {
        path:'me',
        name:'Me',
        component: () => import('../views/Me.vue')
      }
    ]
  },
  {
    path:'/cinema',
    name:'Cinema',
    component: () => import('../views/Cinema')
  },
  {
    path:'/city-list',
    name:'City-list',
    component: () => import('../views/City-list.vue')
  },
  {
    path:'/movie-details',
    name:'Movie-details',
    component: () => import('../views/Movie-details.vue')
  },
  {
    path:'/theatre-details',
    name:'Theatre-details',
    component: () => import('../views/Theatre-details.vue')
  },
  {
    path:'/bay',
    name:'Bay',
    component: () => import('../views/Bay.vue')
  },
  {
    path:'/likes',
    name:'Likes',
    component: () => import('../views/Likes.vue')
  },
  {
    path:'/gomovie',
    name:'Gomovie',
    component: () => import('../views/Gomovie.vue')
  },
  {
    path:'/colls',
    name:'Colls',
    component: () => import('../views/Colls.vue')
  },
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router


