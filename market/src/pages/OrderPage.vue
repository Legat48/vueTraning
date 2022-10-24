<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
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
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
            :error="formError.name"
            :placeholder="'Введите ваше полное имя'"
            :title="'ФИО'"
            :name="'name'"
            v-model="formData.name"/>

            <BaseFormText
            :error="formError.address"
            :placeholder="'Введите ваш адрес'"
            :title="'Адрес доставки'"
            :name="'address'"
            v-model="formData.address"/>

            <BaseFormText
            :error="formError.phone"
            :placeholder="'Введите ваш телефон'"
            :title="'Телефон'"
            :type="'tel'"
            :name="'phone'"
            v-model="formData.phone"/>

            <BaseFormText
            :error="formError.email"
            :placeholder="'Введи ваш Email'"
            :title="'Email'"
            :type="'email'"
            :name="'email'"
            v-model="formData.email"/>

            <BaseFormTextarea
            :error="formError.comments"
            :name="'comments'"
            :placeholder="'Ваши пожелания'"
            :title="'Комментарий к заказу'"
            v-model="formData.comments"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                  class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block"
        v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/confing';

export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      axios.post(`${API_BASE_URL}api/orders`, {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data);
        this.$store.commit('resertCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
      }).catch((e) => {
        this.formError = e.response.data.error.request || {};
        this.formErrorMessage = e.response.data.error.message || '';
      });
    },
  },
};
</script>
