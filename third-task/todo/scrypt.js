Vue.component('like-dislike-buttons', {
  data: function() {
    return {
      counterLike: 0,
      counterDisLike: 0
    }
  },
  template: '<span><button type="button" @click="counterLike++">&#9829; {{counterLike}}</button><button type="button" @click="counterDisLike++">&#128078; {{counterDisLike}}</button></span>'
})

Vue.component('tasks-list', {
  props: ['tasks', 'title'],
  template: `
  <div class="list">
    <h2 v-if="title">{{ title }}</h2>
    <div class="item" :class="{done: task.done}" v-for="task in tasks" :key="task.text">
      <input type="checkbox" v-model="task.done">
      {{ task.text }}
      <like-button></like-button>
      <dislike-button></dislike-button>
    </div>
  </div>`
})

var app = new Vue({
  el: '#app',
  data: {
    title: 'Список задач',
    subtitle: 'Осталось сделать задач',
    message: 'Привет, Vue!',
    tasks: [
      {text: 'Развернуть окружение в Codepen', done: true},
      {text: 'Пройти курс по Vue', done: false},
      {text: 'Сделать интернет-магазин на Vue', done: false},
    ],
    tasksTwo: [
      'Использовать знания в реальных проектах',
      'Набрать побольше опыта',
      'Стать сеньером-фронтендером с отличным знанием Vue',
    ]
  },
  methods: {
    addTask() {
      this.tasks.push({text: this.message, done:false});
      this.message = '';
    },
    count() {
      return this.tasks.filter(task => !task.done).length;
    },
    completedTasks() {
      return this.tasks.filter(task => task.done)
    },
    uncompletedTasks() {
      return this.tasks.filter(task => !task.done)
    },
  }
})