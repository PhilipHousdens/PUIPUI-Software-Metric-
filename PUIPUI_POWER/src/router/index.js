import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductView
    },
    {
      path: '/ProductDetail/:id',
      name: 'productDetail',
      component: ProductDetail,
      props: true
    }
  ]
})

export default router
