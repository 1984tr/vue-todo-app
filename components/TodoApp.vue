<template>
  <div>
    <todo-item />
    <todo-creator />
  </div>
</template>

<script>
import TodoCreator from './components/TodoCreator'
import TodoItem from './components/TodoItem'

export default {
  components: {
    TodoCreator,
    TodoItem
  }
}
</script>
