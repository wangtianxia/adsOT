import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/page/home'
import firstPage from '@/page/firstPage'
import part from '@/components/clock.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'firstPage',
      component:firstPage
    }
  ]
})
