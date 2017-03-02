import * as React from 'react';
import ReactDOM from 'react-dom';
import TodoBox from './views/index.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as actions from './redux_actions.js';

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

const todosReducer = function (state={todos: data}, action) {
  switch(action.type) {
    case actions.UPDATE_TODO:
        let newState = JSON.parse(JSON.stringify(state));
        //let newState = Object.assign({}, state)
        let upd1 = updateRow(newState.todos, 'titel', action.todoUpdate.id, 'checked', action.todoUpdate.checked)
        newState.todos = updateRow(upd1, 'titel', action.todoUpdate.id, 'detail', action.todoUpdate.checked ? 'Done' : 'Sorry not done')
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
