<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
    @click.prevent="changeAmount(-1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <label for="product-amount">
      <input type="text" v-model.number="curAmount"
      id="product-amount" name="count">
    </label>

    <button type="button" aria-label="Добавить один товар"
      @click.prevent="changeAmount(1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'productAmount',
    event: 'productAmount',
  },
  props: ['productAmount'],
  data() {
    return { curAmount: this.productAmount };
  },
  watch: {
    curAmount(value) {
      if (value >= 1) {
        this.$emit('productAmount', value);
      }
    },
  },
  methods: {
    changeAmount(value) {
      this.curAmount += value;
      if (this.curAmount > 0) {
        this.$emit('productAmount', this.productAmount + value);
      } else {
        this.curAmount = 1;
      }
    },
  },
};
</script>
