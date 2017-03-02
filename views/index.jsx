import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux'
import * as actions from '../redux_actions.js'


class TodoBox extends React.Component {
        render() {
            return (
                <div className="todoBox">
                    <h1>Todos</h1>
                    <TodoList data={this.props.todos} func={this.props.handleChange.bind(this)}/>
                    <TodoForm />
                </div>
            );
        }
    }



class TodoList extends React.Component {
  render() {
     let todo = this.props.data.map( (todos) => { return <Todo titel={todos.titel} func={this.props.func} check={todos.checked} key={todos.titel}>{todos.detail}</Todo> } )
     return (
        <div className="todoList">
            <table style={{border: "2px solid black"}}>
              <tbody>
                 {todo}
              </tbody>
            </table>
        </div>
     );
  }
}


class Todo extends React.Component {
   render() {
    return (
      <tr>
        <td style={style.tableContent}>
           <input id={this.props.titel} type="checkbox" checked={this.props.checked} onChange={this.props.func}/>
        </td>
        <td style={style.tableContent}>{this.props.titel}</td>
        <td style={style.tableContent}>{this.props.children}</td>
      </tr>
    );
   }
}


Todo.propTypes = {
   titel: React.PropTypes.string.isRequired
}


class TodoForm extends React.Component {
  render() {
    return (
        <div className="todoForm">
        I am a TodoForm.
        </div>
     );
  }
}

let style = {
        tableContent: {
            border: "1px solid black"
        }
    };


const mapStateToProps = function (state) {
   return { todos: state.todos }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleChange: function(event) {
      dispatch(actions.actionUpdateTodo({id: event.target.id, checked: event.target.checked}));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(TodoBox)


