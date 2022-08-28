<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.product.img" width="120" height="120"
      :alt="product.product.title">
    </div>
    <h3 class="product__title">
      {{product.product.title}}
    </h3>
    <span class="product__code">
      Артикул: {{product.product.id}}
    </span>
    <BaseCounter v-model="amount"/>
    <!-- <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div> -->

    <b class="product__price">
      {{(product.product.price * product.amount) | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины"
    @click.prevent="deleteProduct(product.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';
import BaseCounter from './BaseCounter.vue';

export default {
  props: ['product'],
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.product.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', { productId: this.product.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
  components: { BaseCounter },
};
</script>
