<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
       :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>

      <section class="catalog">
        <ProductList :products="productsShow"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterCategoryId: 0,
      filterColorId: 0,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let filterProducts = products;
      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filterProducts = filterProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }
      if (this.filterColorId) {
        filterProducts = filterProducts.filter(
          (product) => product.colorIdArr.indexOf(this.filterColorId) !== -1,
        );
      }
      return filterProducts;
    },
    productsShow() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filterProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filterProducts.length;
    },
  },
};
</script>
