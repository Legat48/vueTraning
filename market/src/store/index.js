import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProductArr: [
      { productId: 1, amount: 2 },
    ],
  },
  getters: {
    cartDetalProductArr(state) {
      return state.cartProductArr.map((e) => ({
        ...e,
        product: products.find((p) => p.id === e.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetalProductArr
        .reduce((e, item) => (item.product.price * item.amount) + e, 0);
    },
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProductArr.find((e) => e.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProductArr.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProductArr.find((e) => e.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProductArr = state.cartProductArr.filter((e) => e.productId !== productId);
    },
  },
  actions: {
  },
  modules: {
  },
});
