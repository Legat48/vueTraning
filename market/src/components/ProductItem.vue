<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}}₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors(product.colorIdArr)" :key="color.id">
        <label class="colors__label" :for="`color${color.id}`">
          <input class="colors__radio sr-only" :id="`color${color.id}`" type="radio"
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

export default {
  data() {
    return {
      selectedСolor: '',
    };
  },
  props: ['product'],
  methods: {
    colors(prodColors) {
      let filterColors = colors;
      function filterArr(item, arr) {
        let value = false;
        arr.forEach((e) => {
          if ((item) === e) {
            value = true;
          }
        });
        return value;
      }
      filterColors = filterColors.filter((color) => filterArr(color.id, prodColors));
      return filterColors;
    },
  },
  mounted() {
    this.selectedСolor = this.$el.querySelector('.colors__radio').value;
  }, // как фиксить этот баг я не понял, тут неправильно переключается
};
</script>
