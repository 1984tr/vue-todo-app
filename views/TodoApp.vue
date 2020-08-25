<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <router-link
          to="all"
          tag="button">
          모든 항목 ({{ total }})
        </router-link>
        <router-link
          to="active"
          tag="button">
          해야 할 항목 ({{ activeCount }})
        </router-link>
        <router-link
          to="completed"
          tag="button">
          완료된 항목 ({{ completedCount }})
        </router-link>
      </div>
      <div class="actions clearfix">
        <div class="float--left">
          <label>
            <input
              v-model="allDone"
              type="checkbox">
            <span class="icon"><i class="material-icons">done_all</i></span>
          </label>
        </div>
        <div class="float--right clearfix">
          <button
            class="btn float--left"
            @click="scrollToTop">
            <i class="material-icons">expand_less</i>
          </button>
          <button
            class="btn float--left"
            @click="scrollToBottom">
            <i class="material-icons">expand_more</i>
          </button>
          <button
            class="btn btn--danger float--left"
            @click="clearCompleted">
            <i class="material-icons">delete_sweep</i>
          </button>
        </div>
      </div>
    </div>
    <div class="todo-app__list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo" />
    </div>
    <TodoCreator
      class="todo-app__creator" />
  </div>
</template>

<script>

import scrollTo from 'scroll-to'
import TodoCreator from '~/components/TodoCreator'
import TodoItem from '~/components/TodoItem'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  computed: {
    filteredTodos () {
      switch (this.$route.params.id) {
        case 'all':
        default:
          return this.todos
        case 'active':
          return this.todos.filter(todo => !todo.done)
        case 'completed':
          return this.todos.filter(todo => todo.done)
      }
    },
    todos () {
      return this.$store.state.todoApp.todos
    },
    total () {
      return this.$store.getters.todoApp.total
    },
    activeCount () {
      return this.$store.getters.todoApp.activeCount
    },
    completedCount () {
      return this.$store.getters.todoApp.completedCount
    },
    allDone: {
      get () {
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  created () {
    this.initDB()
  },
  methods: {

    scrollToTop () {
      scrollTo(0, 0, {
        ease: 'linear',
        duration: 1000
      })
    },
    scrollToBottom () {
      scrollTo(0, document.body.scrollHeight, {
        ease: 'linear',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss">

  @import 'scss/style';

  .filters button.router-link-active {
    background: royalblue;
    color: white;
  }
</style>
