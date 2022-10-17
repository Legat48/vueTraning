import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/confing';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProductArr: [],
    userAccessKey: null,
    cartProductArrData: [],
  },
  getters: {
    cartDetalProductArr(state) {
      return state.cartProductArr.map((item) => {
        const { product } = state.cartProductArrData
          .find((e) => e.product.id === item.productId);
        if (product.image.file) {
          product.image = product.image.file.url;
        }
        return {
          ...item,
          product,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetalProductArr
        .reduce((e, item) => (item.product.price * item.amount) + e, 0);
    },
  },
  mutations: {
    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateCartProductArrData(state, arr) {
      state.cartProductArrData = arr;
    },
    syncCartProductArr(state) {
      state.cartProductArr = state.cartProductArrData.map((e) => ({
        productId: e.product.id,
        amount: e.quantity,
      }));
    },
    addToCart() {
      this.$store.dispatch(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
      );
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProductArr.find((e) => e.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    removeProduct(state, productId) {
      state.cartProductArr = state.cartProductArr.filter((item) => item.productId !== productId);
    },
  },
  actions: {
    loadCart(context) {
      axios
        .get(`${API_BASE_URL}api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductArrData', response.data.items);
          context.commit('syncCartProductArr');
        }).catch((e) => {
          this.productLoad = false;
          this.productLoadError = true;
          console.log(e);
        }).then(() => {
          this.productLoad = false;
        });
    },
    addProductToCart(context, { productId, amount }) {
      // eslint-disable-next-line no-promise-executor-return
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => axios
          .post(`${API_BASE_URL}api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductArrData', response.data.items);
            context.commit('syncCartProductArr');
          }));
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      if (amount < 1) { return; }
      // eslint-disable-next-line consistent-return
      return axios.put(`${API_BASE_URL}api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductArrData', response.data.items);
        }).catch(() => {
          context.commit('syncCartProductArr');
        });
    },
    removeProduct(context, productId) {
      context.commit('removeProduct', productId);
      return axios
        .delete(`${API_BASE_URL}api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((res) => {
          context.commit('updateCartProductArrData', res.data.items);
        })
        .catch(() => {
          context.commit('syncCartProductArr');
        });
    },
  },
});
