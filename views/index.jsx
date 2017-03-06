import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux'
import * as actions from '../redux_actions.js'


export default class TodoBox extends React.Component {
        render() {
            return (
                <div className="todoBox">
                    <h1>Todos</h1>
                    <TodoList_ />
                    <TodoForm_ />
                    <TodoFooter_ />
                </div>
            );
        }
    }



class TodoList extends React.Component {
  render() {
     let todo = this.props.todos.map( (todos) => { return <Todo_ titel={todos.titel} check={todos.checked} key={todos.titel}>{todos.detail}</Todo_> } )
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
           <input id={this.props.titel} type="checkbox" checked={this.props.checked} onChange={this.props.handleChange}/>
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

  constructor(props) {
    super(props)

    this.state = { value: '' }
  }

  handleChange(event) {
    this.state.value = event.target.value
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAddTodo(this.state.value)
    document.getElementById("frm").value=''
  }

  render() {
    return (
        <div className="todoForm">
          <form onSubmit={this.handleSubmit.bind(this)}>
             <label>Titel:<input id="frm" type="text" name="titel" onChange={this.handleChange.bind(this)} /></label>
                          <input type="submit" value="Submit" />
          </form>
        </div>
     );
  }
}

class TodoFooter extends React.Component {
  render() {
    return (
        <div className="todoFooter">
          <span>The count of todos is {this.props.cnt}</span>
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

const mapStateToPropsTodoFooter = function (state) {
   return { cnt: state.todosCnt }
}

const mapDispatchToPropsTodoForm = function(dispatch) {
  return {
    handleAddTodo: function(titel) {
      dispatch(actions.actionAddTodo({titel: titel, detail: 'Not done', checked: false}));
    }
  }
}

const TodoForm_ = connect(null, mapDispatchToPropsTodoForm)(TodoForm)

const Todo_ = connect(null, mapDispatchToProps)(Todo)

const TodoList_ = connect(mapStateToProps)(TodoList)

const TodoFooter_ = connect(mapStateToPropsTodoFooter)(TodoFooter)
