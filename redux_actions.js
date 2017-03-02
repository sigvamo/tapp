export const UPDATE_TODO = 'UPDATE_TODO'

export function actionUpdateTodo(todoUpdate) {
  return { type: UPDATE_TODO, todoUpdate: todoUpdate }
}
