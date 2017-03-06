import * as React from 'react';
import ReactDOM from 'react-dom';
import TodoBox from './views/index.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Actions from './redux_actions.js';

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

const todosReducer = function (state={todos: data, todosCnt: data.length }, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case Actions.UPDATE_TODO:

        let upd1 = updateRow(newState.todos, 'titel', action.todoUpdate.id, 'checked', action.todoUpdate.checked)
        newState.todos = updateRow(upd1, 'titel', action.todoUpdate.id, 'detail', action.todoUpdate.checked ? 'Done' : 'Not done')
        return newState
      break;
    case Actions.ADD_TODO:

        newState.todos.push(action.todo)
        newState.todosCnt = newState.todos.length
        return newState
      break;
    default:
        return state;
  }
}

function updateRow(tab, where, val, updfield, val2) {
    tab.forEach( (row) => {
        row[where] === val ? row[updfield] = val2 : null
    })
    return tab
}

var Store = createStore(todosReducer)

ReactDOM.render(<Provider store={Store}>
	                    <TodoBox />
	            </Provider>, document.getElementById("app"));
