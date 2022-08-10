Vue.component('like-button', {
  model: {
    prop: 'counter',
    event: 'counter',
  },
  props: ['counter'],
  template: `<button type="button" @click="increment">&#9829; {{counter}}</button>`,
  methods: {
    increment(){
      this.$emit('counter', this.counter + 1);
    },
  }
});

Vue.component('tasks-list', {
  props: ['tasks', 'title'],
  template: `
  <div class="list">
    <h2 v-if="title">{{ title }}</h2>
    <div class="item" :class="{done: task.done}" v-for="task in tasks" :key="task.text">
      <input type="checkbox" v-model="task.done">
      {{ task.text }}
      <like-button v-model="task.likes"></like-button>
    </div>
  </div>`
});

var app = new Vue({
  el: '#app',
  data: {
    title: 'Список задач',
    subtitle: 'Осталось сделать задач',
    message: 'Привет, Vue!',
    likesHeader: 2,
    likesForm: 3,
    tasks: [
      {text: 'Развернуть окружение в Codepen', done: true, likes: 2},
      {text: 'Пройти курс по Vue', done: false, likes: 1},
      {text: 'Сделать интернет-магазин на Vue', done: false, likes: 4},
    ],
    tasksTwo: [
      'Использовать знания в реальных проектах',
      'Набрать побольше опыта',
      'Стать сеньером-фронтендером с отличным знанием Vue',
    ]
  },
  methods: {
    addTask() {
      this.tasks.push({text: this.message, done:false, likes: 0});
      this.message = '';
    },
  },
  computed: {
    count() {
      return this.tasks.filter(task => !task.done).length;
    },
    completedTasks() {
      return this.tasks.filter(task => task.done);
    },
    uncompletedTasks() {
      return this.tasks.filter(task => !task.done);
    },
    countLikes() {
      return this.likesHeader + this.likesForm + this.tasks.reduce((value, task) => value + task.likes, 0);
    }
  }
});