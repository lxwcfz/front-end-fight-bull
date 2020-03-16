import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index.vue';
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          name: 'index',
          path: '/',
          component: Index
        },
        {
          name: 'room',
          path: '/room',
          component: () => import(/* webpackChunkName: "room" */ '../views/room/index.vue')
        }
      ]
    },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue')
    // }
  ]
})
