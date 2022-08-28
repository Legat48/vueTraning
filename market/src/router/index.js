import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    devtool: 'source-map',
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
