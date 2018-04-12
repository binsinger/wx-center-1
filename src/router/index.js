import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Index from '../components/index'
import Invite from '../components/invite'
import PhoneBind from '../components/phonebind'
import Rank from '../components/rank'
import Lottery from '../components/lottery'
import Task from '../components/task'
import Integral from '../components/integral'

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
        },
        {
          path:'phonebind',
          component:PhoneBind
        },
        {
          path:'rank',
          component:Rank
        },
        {
          path:'lottery',
          component:Lottery
        },
        {
          path:'task',
          component:Task
        },
        {
          path:'integral',
          component:Integral
        }
      ]
    }
  ]
})
