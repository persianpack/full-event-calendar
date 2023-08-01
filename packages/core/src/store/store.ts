// @ts-nocheck
import { createStore } from 'redux'

const defaultState = {
  todos: []
}
// todos reducer
const todos = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      }
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo))
      }
    default:
      return state
  }
}

export default createStore(todos)
