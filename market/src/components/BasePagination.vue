  <template>

  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow pagination__link--disabled"
         aria-label="Предыдущая страница" @click.prevent="paginateBtn(false)"
         @keydown="paginateBtn(false)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a href="#" class="pagination__link" @click.prevent="paginate(pageNumber)"
        :class="{'pagination__link--current':pageNumber === page}">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow"
         href="#" aria-label="Следующая страница" @click.prevent="paginateBtn(true)"
          @keyup="paginateBtn(true)">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    paginateBtn(direction) {
      let { page } = this;
      if (direction && page !== this.pages) {
        page += 1;
      } else if (!direction && page !== 1) {
        page -= 1;
      }
      this.$emit('paginate', page);
    },
  },
};
</script>
