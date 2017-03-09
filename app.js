import * as React from 'react';
import ReactDOM from 'react-dom';
import TodoBox from './views/index.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Actions from './redux_actions.js';
import update from 'immutability-helper';

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

const todosReducer = function (state={todos: data, todosCnt: data.length }, action) {
  //let newState = JSON.parse(JSON.stringify(state));
  let newState = {}
  switch(action.type) {
    case Actions.UPDATE_TODO:
        let newState = update(state, { todos: {$set:  updateRow(state.todos, 'titel', action.todoUpdate.id, 'checked', action.todoUpdate.checked)  }})
        //let upd1 = updateRow(newState.todos, 'titel', action.todoUpdate.id, 'checked', action.todoUpdate.checked)
        
        newState = update(newState, { todos: {$set:  updateRow(newState.todos, 'titel', action.todoUpdate.id, 'detail', action.todoUpdate.checked ? 'Done' : 'Not done')  }})
        //newState.todos = updateRow(upd1, 'titel', action.todoUpdate.id, 'detail', action.todoUpdate.checked ? 'Done' : 'Not done')
        return newState
      break;
    case Actions.ADD_TODO:
        newState = update(state, {todos : {$push : [action.todo] }} )
        newState.todosCnt = newState.todos.length
        return newState
      break;
    default:
        return state;
  }
}

function updateRow(tab, where, val, updfield, val2) {
    let newTab = []
    let Obj = {}
    tab.forEach( (row) => {
        //row[where] === val ? row[updfield] = val2 : null
        Obj[updfield]={$set: val2}
        row[where] === val ? newTab.push(update(row, Obj)) : newTab.push(row)
    })
    return newTab
}

var Store = createStore(todosReducer)

ReactDOM.render(<Provider store={Store}>
	                    <TodoBox />
	            </Provider>, document.getElementById("app"));
