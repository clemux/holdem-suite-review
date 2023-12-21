import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BrowseView from '@/views/BrowseView.vue'
import ReplayerView from '@/views/ReplayerView.vue'
import TournamentView from '@/views/TournamentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/browse',
      name: 'browse',
      component: BrowseView,
    },
    {
      path: '/replayer/:hand_id',
      name: 'replayer',
      component: ReplayerView,
      props: true,
    },
    {
      path: '/tournament/:tournamentId',
      name: 'tournament',
      component: TournamentView,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
