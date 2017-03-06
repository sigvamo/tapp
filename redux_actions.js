export const UPDATE_TODO = 'UPDATE_TODO'
export const ADD_TODO    = 'ADD_TODO'

export function actionUpdateTodo(todoUpdate) {
  return { type: UPDATE_TODO, todoUpdate: todoUpdate }
}

export function actionAddTodo(todoObj) {
  return { type: ADD_TODO, todo: todoObj }
}
