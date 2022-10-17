<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />

      <section class="catalog">
        <div v-if="productLoad">Загрузка товаров</div>
        <div v-if="productLoadError">
          Произошла ошибка
          <button @click.prevent="loadProducts()">
            Попробовать ещё раз
          </button>
        </div>
        <ProductList :products="productsShow" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

import { API_BASE_URL } from '@/confing';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 2,
      productsPerPage: 3,
      productArrData: null,

      productLoad: false,
      productLoadError: false,
    };
  },
  computed: {
    productsShow() {
      return this.productArrData
        ? this.productArrData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productArrData ? this.productArrData.pagination.total : 0;
    },
  },
  methods: {
    loadProductArr() {
      this.productLoad = true;
      this.productLoadError = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => {
            this.productArrData = response.data;
          }).catch((e) => {
            this.productLoad = false;
            this.productLoadError = true;
            console.log(e);
          }).then(() => {
            this.productLoad = false;
          });
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProductArr();
    },
    filterCategoryId() {
      this.loadProductArr();
    },
    filterPriceFrom() {
      this.loadProductArr();
    },
    filterPriceTo() {
      this.loadProductArr();
    },
    filterColorId() {
      this.loadProductArr();
    },
  },
  created() {
    this.loadProductArr();
  },
};
</script>
