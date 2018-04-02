import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Index from '../components/index'
import Invite from '../components/invite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect:'/index',
      children:[
        {
          path:'index',
          component:Index
        },
        {
          path:'invite',
          component:Invite
        }
      ]
    }
  ]
})
