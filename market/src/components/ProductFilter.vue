<template>
  <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price" for="filter-from">
              <input class="form__input" id="filter-from"
               type="text" name="min-price" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price" for="filter-to">
              <input class="form__input" id="filter-to"
              type="text" name="max-price" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select" for="filter-category">
              <select class="form__select" id="filter-category"
              type="text" name="category" v-model.number="currentCategoryId">
                <option :value="category.id" v-for="category in categories" :key="category.id" >
                  {{category.title}}
                </option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="color in colors" :key="color.id">
                <label class="colors__label" :for="`color-filter${color.id}`">
                  <input class="colors__radio sr-only" :id="`color-filter${color.id}`"
                   type="radio" name="color" :value="color.id"  v-model.number="currentColorId">
                  <span class="colors__value" :style="{backgroundColor: color.color}">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объем в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-8">
                  <input class="check-list__check sr-only" id="filter-volume-8"
                   type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-16">
                  <input class="check-list__check sr-only" id="filter-volume-16"
                   type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-32">
                  <input class="check-list__check sr-only" id="filter-volume-32"
                   type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-64">
                  <input class="check-list__check sr-only" id="filter-volume-64"
                  type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-128">
                  <input class="check-list__check sr-only" id="filter-volume-128"
                  type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label" for="filter-volume-264">
                  <input class="check-list__check sr-only" id="filter-volume-264"
                   type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second"
          @click.prevent="reset()" type="button">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import categories from '@/data/categories';
import colors from '@/data/colors';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
  },
};
</script>
