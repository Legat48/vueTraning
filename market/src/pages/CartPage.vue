<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartProduct v-for="product in productArr" :key="product.productId"
            :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }}₽</span>
          </p>

          <router-link
          :to="{ name:'order' }"
          tag="button"
          class="cart__button button button--primery"
          type="submit"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartProduct from '@/components/CartProduct.vue';

export default {
  filters: {
    numberFormat,
  },
  components: {
    CartProduct,
  },
  computed: {
    ...mapGetters({ productArr: 'cartDetalProductArr', totalPrice: 'cartTotalPrice' }),
  },
};
</script>
