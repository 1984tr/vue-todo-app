import Vue from 'vue'
import cryptoRandomString from 'crypto-random-string'
import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'
import _forEachRight from 'lodash/forEachRight'

export default {
  namespaced: true,
  state: () => ({
    db: null,
    todos: [],
    filter: 'all'
  }),
  getters: {
    total (state) {
      return state.todos.length
    },
    activeCount (state) {
      return state.todos.filter(todo => !todo.done).length
    },
    completedCount (_state, getters) {
      return getters.total - getters.activeCount
    },
    filteredTodos (state) {
      switch (state.filter) {
        case 'all':
        default:
          return state.todos
        case 'active':
          return state.todos.filter(todo => !todo.done)
        case 'completed':
          return state.todos.filter(todo => todo.done)
      }
    }
  },
  mutations: { // 동기
    assignDB (state, db) {
      state.db = db
    },
    createDB (state, newTodo) {
      state.db
        .get('todos')
        .push(newTodo)
        .write()
    },
    updateDB (state, { todo, value }) {
      state.db
        .get('todos')
        .find({ id: todo.id })
        .assign(value)
        .write()
    },
    deleteDB (state, todo) {
      state.db
        .get('todos')
        .remove({ id: todo.id })
        .write()
    },
    assignTodos (state, todos) {
      state.todos = todos
    },
    assignTodo (state, { foundTodo, value }) {
      _assign(foundTodo, value)
    },
    pushTodo (state, newTodo) {
      state.todos.push(newTodo)
    },
    deleteTodo (state, foundIndex) {
      Vue.delete(state.todos, foundIndex)
    },
    updateTodo (state, { todo, key, value }) {
      todo[key] = value
    },
    updateFilter (state, filter) {
      state.filter = filter
    }
  },
  actions: { // 비동기
    initDB (context) {
      const { state, commit, dispatch } = context
      const adapter = new LocalStorage('todo-app') // DB Name
      commit('assignDB', lowdb(adapter))

      const hasTodos = state.db.has('todos').value()
      if (hasTodos) {
        dispatch('readTodos')
      } else {
        // Local DB 초기화
        state.db
          .defaults({
            todos: [] // Collection
          })
          .write()
      }
    },
    readTodos (context) {
      const { state, commit } = context
      commit('assignTodos', _cloneDeep(state.db.getState().todos))
    },
    createTodo ({ commit }, title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title: title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }
      commit('createDB', newTodo)
      commit('pushTodo', newTodo)
    },
    updateTodo ({ state, commit }, { todo, value }) {
      commit('updateDB', { todo, value })

      const foundTodo = _find(state.todos, { id: todo.id })
      commit('assignTodo', { foundTodo, value })
    },
    deleteTodo ({ state, commit }, todo) {
      commit('deleteDB', todo)

      const foundIndex = _findIndex(state.todos, { id: todo.id })
      commit('deleteTodo', foundIndex)
    },
    completeAll ({ state, commit }, checked) {
      const newTodos = state.db
        .get('todos')
        .forEach(todo => {
          todo.done = checked
          commit('updateTodo', {
            todo,
            key: 'done',
            value: checked
          })
        })
        .write()

      commit('assignTodos', _cloneDeep(newTodos))
    },
    clearCompleted ({ state, dispatch }) {
      // this.todos
      //   .reduce((list, todo, index) => {
      //     if (todo.done) {
      //       list.push(index)
      //     }
      //     return list
      //   }, [])
      //   .reverse()
      //   .forEach(index => {
      //     this.deleteTodo(this.todos[index])
      //   })
      _forEachRight(state.todos, todo => {
        if (todo.done) {
          dispatch('deleteTodo', todo)
        }
      })
    }
  }
}
