import React, { useState, useRef, useEffect } from "react";
export const TodoForm = ({ addTodos }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleTodos = (e) => {
    e.preventDefault();
    console.log(input);
    addTodos({
      id: Math.floor(Math.random() * 10000) + 1,
      text: input,
      completed: false,
    });
    setInput("");
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <>
      <form className="todo-form" onSubmit={handleTodos}>
        <input
          ref={inputRef}
          type="text"
          placeholder="enter your todos"
          onChange={handleInput}
          value={input}
          className="todo-form-input"
        />
        <button type="submit">
          {" "}
          <i class="fa fa-plus"></i>
        </button>
      </form>
    </>
  );
};
