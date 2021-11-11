import "./App.css";
import Header from "./components/Header";
import Todolist from "./components/ToDoList";
function App() {
  return (
    <div className="main-app">
      <div className="todo-wrapper">
        <Header appName="ToDo App" />
        <Todolist />
      </div>
    </div>
  );
}

export default App;
