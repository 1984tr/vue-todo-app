<template>
  <div>
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <todo-creator @create-todo="createTodo"/>
  </div>
</template>

<script>
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _cloneDeep from 'lodash/cloneDeep'
import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default {
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      db: null,
      todos: []
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    initDB () {
      const adapter = new LocalStorage('todo-app') // DB Name
      this.db = lowdb(adapter)

      const hasTodos = this.db.has('todos').value()
      if (hasTodos) {
        this.fetchTodos()
      } else {
        // Local DB 초기화
        this.db
          .defaults({
            todos: [] // Collection
          })
          .write()
      }
    },
    createTodo (title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title: title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }
      this.db
        .get('todos')
        .push(newTodo)
        .write()
    },
    fetchTodos () {
      this.todos = _cloneDeep(this.db.getState().todos)
    },
    updateTodo () {
      console.log('update todo!')
    },
    deleteTodo () {
      console.log('delete todo!')
    }
  }
}
</script>

<style lang="scss">

</style>
