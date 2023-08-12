let nextTodoId = 0
export default {
  addTodo: (text: any) => ({ type: 'ADD_TODO', id: ++nextTodoId, text }),
  toggleTodo: (id: any) => ({ type: 'TOGGLE_TODO', id }),
  setLists: (list: any) => ({ type: 'SET_ALL_EVENTS', list: list }),
  directDispatch: (data: any) => data
}
