<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
     @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}}₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors(product.colorIdArr)"
      :key="`${product.id}${color.id}`">
        <label class="colors__label" :for="`color${product.id}${color.id}`">
          <input class="colors__radio sr-only" :id="`color${product.id}${color.id}`" type="radio"
          :value="color.color" v-model="selectedСolor">
          <span class="colors__value" :style="{backgroundColor: color.color}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '@/data/colors';
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
    colors(prodColors) {
      return colors.filter((e) => prodColors.includes(e.id));
    },
    goToPage,
  },
  mounted() {
    this.selectedСolor = this.$el.querySelector('.colors__radio').value;
  },
};
</script>
