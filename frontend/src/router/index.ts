import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import GuideView from '../views/GuideView.vue'
import AcceptChallengeView from '../views/AcceptChallengeView.vue'
import SubmitChallengeView from '../views/SubmitChallengeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView
    },
    {
      path: '/accept',
      name: 'accept',
      component: AcceptChallengeView
    },
    {
      path: '/submit',
      name: 'submit',
      component: SubmitChallengeView
    }
  ]
})

export default router

