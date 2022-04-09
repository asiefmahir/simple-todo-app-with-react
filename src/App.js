import {useState} from 'react';
import './App.css';

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null); // {} {id}
  // ["todo 1", "todo 1" "todo 2", "todo 3"];
  // todoList = [ {id: "1", title: "Todo 1", isComplete: false}, {id: "2", title: "Todo 2", isComplete: true}]
  // newTodo = {id: "3", title: "Todo 3", isComplete: false}
  // todoList.push(newTodo) // [ {id: "1", title: "Todo 1", isComplete: false}, {id: "2", title: "Todo 2", isComplete: true},{id: "3", title: "Todo 3", isComplete: false} ]
  // setTodoList([ {id: "1", title: "Todo 1", isComplete: false}, {id: "2", title: "Todo 2", isComplete: true},{id: "3", title: "Todo 3", isComplete: false} ])
  /**
   * todo  = {
   *    id: id,
   *    title: string,
   *    isComplete: false 
   * }
   */

  const createTodoHandler = () => {
    if (todoTitle !== '') {
      const newTodo = {
        id: Date.now(),
        title: todoTitle,
        isComplete: false
      };


      // todoList.push(newTodo);
      setTodoList([...todoList, newTodo]);
      setTodoTitle("")


    } else {
      alert("Please Enter a valid title")
    }
  }

  const deleteTodoHandler = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList)
  }

  const editTodoHandler = (id) => {
    const todoToBeEdited = todoList.find((item) => item.id === id);
    setEditMode(true);
    setEditableTodo(todoToBeEdited);
    setTodoTitle(todoToBeEdited.title);
  }

  const updateTodoHandler = () => {
    setTodoList(todoList.map((todo) => {
      if (todo.id === editableTodo.id) {
        todo.title = todoTitle;
      } 
      return todo;
    }));
    setEditMode(false);
    setTodoTitle("")
    setEditableTodo(null);
  }

  return (
    <div className="App">
      <div class="todo-app">
        <input type="text" value = {todoTitle} onChange = {(event) => setTodoTitle(event.target.value)} />
        <button onClick = {() => {
          editMode ? updateTodoHandler() : createTodoHandler() 
        }}>
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
        <ul class="todo-list">
          {todoList.map(todo => (
            <li>
              <span>
                {todo.title}
              </span>
              <button onClick = {() => editTodoHandler(todo.id)}>
                Edit
              </button>
              <button onClick= {() => deleteTodoHandler(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
