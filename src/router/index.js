import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdressView from '../views/AdressView.vue'
import AdressDetail from '../views/AdressDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/adress',
      name: 'adress',
      component: AdressView,
      children: [
        {
          path: '/adress/:lat/:lng',
          name: 'adress_detail',
          component: AdressDetail,
          props: (route) => ({
            lng: Number(route.params.lng),
            lat: Number(route.params.lat),
          }),
        },
      ]
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
