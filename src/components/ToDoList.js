import React, { useState, useEffect } from "react";
import { TodoForm } from "./ToDoForm";
import { Todoupdatemodal } from "./ToDoUpdateModal";
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [todoId, setToDoId] = useState(null);
  const [updatedText, setupdatedText] = useState("");
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos([...JSON.parse(localStorage.getItem("todos"))]);
    }
  }, []);
  useEffect(() => {
    if (todos.length >= 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodos(todoId, updatedText);
    setToDoId(null);
    setupdatedText("");
    setModal(!modal);
  };

  const addTodos = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    //this is going to add todo's to our state
    const newTodos = [...todos, todo];
    //this is going to update our todo's state with newly added todo's
    setTodos(newTodos);
  };

  //this function contains logic that will check whether the given todo is set completed or not.
  const completeTodos = (todoId) => {
    let refreshedTodos = todos.map((todo, index) => {
      if (todo.id === todoId) {
        todos[index].completed = !todos[index].completed; //this is just a toggling logic
      }
      return todo;
    });
    setTodos([...refreshedTodos]);
  };

  //this function is responsible to update our todo's
  const updateTodos = (todoId, updatedTodoText) => {
    if (!updatedTodoText || /^\s*$/.test(updatedTodoText)) {
      return;
    }
    //this logic is not that much tougher , what this have done is : just check if item is the given item with given id or not.If this matches than this is the object we want to update so update it.Since map returns something,here in our case returns an array.
    setTodos((previousState) =>
      previousState.map((item) =>
        item.id === todoId
          ? { id: item.id, text: updatedTodoText, completed: item.completed }
          : item
      )
    );
  };

  //this is just removing todo's
  const removeTodos = (todoId) => {
    //here filter is just returing the residue we are trying to filter.Here,residue means what we want to filter
    const todosAfterDelete = todos.filter((todo) => todo.id !== todoId);
    setTodos(todosAfterDelete);
  };

  return (
    <>
      <TodoForm addTodos={addTodos} />
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <div className="todo-list-wrapper" key={index}>
              <div
                className={
                  todo.completed ? "completed todo" : "notcompleted todo"
                }
                onClick={() => completeTodos(todo.id)}
              >
                {todo.text}
              </div>
              <button
                disabled={todo.completed ? "" : "true"}
                className={todo.completed ? "todo-btn" : "todo-btn noedit"}
                onClick={() => removeTodos(todo.id)}
              >
                <i class="fa fa-trash"></i>
              </button>
              <button
                className="todo-btn"
                onClick={() => {
                  setModal(!modal);
                  setToDoId(todo.id);
                }}
              >
                <i class="fa fa-edit"></i>
              </button>
            </div>
          );
        })}
      </div>
      {modal && (
        <Todoupdatemodal
          handleUpdate={handleUpdate}
          setupdatedText={setupdatedText}
        />
      )}
    </>
  );
};

export default Todolist;
