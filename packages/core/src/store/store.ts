// @ts-nocheck
import { createStore } from 'redux'
import { Event } from '../api/EventImpl'
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
    case 'SET_ALL_EVENTS':
      const data = []
      for (let i = 0; i < action.list.length; i++) {
        data.push(new Event(action.list[i]))
      }
      return {
        todos: data
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
