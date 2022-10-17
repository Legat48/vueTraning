<template>
  <li class="catalog__item">
    <router-link class="catalog__pic"
    :to="{ name: 'product', params: {id: product.id, selectedСolor}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}}₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="`${product.id}${color.id}`">
        <label class="colors__label" :for="`color${product.id}${color.id}`">
          <input class="colors__radio sr-only" :id="`color${product.id}${color.id}`" type="radio"
          :value="color.code" v-model="selectedСolor">
          <span class="colors__value" :style="{backgroundColor: color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
// import colors from '@/data/colors';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      selectedСolor: '',
    };
  },
  filters: {
    numberFormat,
  },
  props: ['product'],
  methods: {
    goToPage,
  },
  computed: {
    // colorsArr() {
    //   return this.product.colorIdArr.map((e) => colors.find((item) => item.id === e));
    // },
  },
  mounted() {
    this.selectedСolor = this.$el.querySelector('.colors__radio').value;
  },
};
</script>
