import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TradeView from '../views/TradeView.vue'
import Market from '../views/Market.vue'
import ErrorPage from '../views/ErrorPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/trade',
    name: 'trade',
    component: TradeView
  },
  {
    path: '/market',
    name: 'market',
    component: Market
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
