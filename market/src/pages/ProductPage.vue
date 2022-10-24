<!-- eslint-disable object-shorthand -->
<!-- eslint-disable object-shorthand -->
<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div>
    <main class="content container" v-if="productLoad">Загрузка товара</main>
    <main class="content container" v-else-if="productLoadError">Не удалось загрузить товар</main>
    <main class="content container" v-if="productData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link
            tag="div"
            class="breadcrumbs__link" :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="product.image" :alt="product.title">
          </div>
          <ul class="pics__list">
            <li class="pics__item">
              <a href="" class="pics__link pics__link--current">
                <img width="98" height="98" src="img/phone-square-1.jpg"
                 srcset="img/phone-square-1@2x.jpg 2x" :alt="product.title">
              </a>
            </li>
            <li class="pics__item">
              <a href="" class="pics__link">
                <img width="98" height="98" src="img/phone-square-2.jpg"
                 srcset="img/phone-square-2@2x.jpg 2x" :alt="product.title">
              </a>
            </li>
            <li class="pics__item">
              <a href="" class="pics__link">
                <img width="98" height="98" src="img/phone-square-3.jpg"
                 srcset="img/phone-square-3@2x.jpg 2x" :alt="product.title">
              </a>
            </li>
            <li class="pics__item">
              <a class="pics__link" href="#">
                <img width="98" height="98" src="img/phone-square-4.jpg"
                 srcset="img/phone-square-4@2x.jpg 2x" :alt="product.title">
              </a>
            </li>
          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <b class="item__price">
                {{ product.price | numberFormat}}
              </b>
              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                <li class="colors__item" v-for="color in product.colors"
                :key="`${product.id}${color.id}`">
                  <label class="colors__label" :for="`color${product.id}${color.id}`">
                    <input class="colors__radio sr-only" :id="`color${product.id}${color.id}`"
                     type="radio" :value="color.color" v-model="selectedСolor">
                    <span class="colors__value" :style="{backgroundColor: color.code}">
                    </span>
                  </label>
                </li>
              </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объемб в ГБ:</legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label" for="4">
                      <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                      <span class="sizes__value">
                        32gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label" for="5">
                      <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                      <span class="sizes__value">
                        64gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label" for="6">
                      <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                       checked="">
                      <span class="sizes__value">
                        128gb
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <BaseCounter v-model="productAmount"/>

                <button class="button button--primery" type="submit" :disabled="productAddSending">
                  В корзину
                </button>
              </div>
              <div v-show="productAdded">Добавлено в корзину</div>
              <div v-show="productAddSending">Идет добавление в корзину</div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#">
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
              Синхронизация со смартфоном<br>
              Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
              Поддержка сторонних приложений<br>
            </p>

            <a href="#">
              Все характеристики
            </a>

            <h3>Что это?</h3>

            <p>
              Wahoo ELEMNT BOLT GPS – это велокомпьютер,
              который позволяет оптимизировать свои велотренировки,
              сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с
              датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются
              на дисплее, а также сохраняются на смартфоне.
              При этом на мобильное устройство можно установить как фирменное приложение,
              так и различные приложения сторонних разработчиков.
              Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого
              комплекса спутников.
              Эта информация позволяет смотреть уже преодоленные маршруты и планировать
              новые велопрогулки.
            </p>

            <h3>Дизайн</h3>

            <p>
              Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
              Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
              что не превышает габариты смартфона.
              Корпус гаджета выполнен из черного пластика.
              На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
              На дисплей выводятся координаты и скорость,
              а также полученная со смартфона и синхронизированных датчиков информация:
              интенсивность, скорость вращения педалей, пульс и т.д.
              (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
              защиты от влаги IPX7.
              Это означает, что устройство не боится пыли, а также выдерживает кратковременное
              (до 30 минут)
              погружение в воду на глубину не более 1 метра.
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import colors from '@/data/colors';
import numberFormat from '@/helpers/numberFormat';
import BaseCounter from '@/components/BaseCounter.vue';
import axios from 'axios';

import { API_BASE_URL } from '@/confing';

import { mapActions } from 'vuex';

export default {
  components: { BaseCounter },
  data() {
    return {
      productAmount: 1,
      productData: null,

      productLoad: false,
      productLoadError: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      const product = this.productData;
      if (product.image.file.url) {
        product.image = product.image.file.url;
      }

      return product;
    },
    category() {
      return this.productData ? this.productData.category : [];
    },
    selectedСolor() {
      return this.productData.colors[0].code;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    colors(prodColors) {
      return colors.filter((e) => prodColors.includes(e.id));
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.productLoad = true;
      this.productLoadError = false;
      axios
        .get(`${API_BASE_URL}api/products/${this.$route.params.id}`, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.productData = response.data;
        }).catch((e) => {
          this.productLoad = false;
          this.productLoadError = true;
          console.log(e);
        }).then(() => {
          this.productLoad = false;
        });
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
