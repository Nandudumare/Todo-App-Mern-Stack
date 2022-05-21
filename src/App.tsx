import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import InputFeild from "./Components/InputFeild";
import TodoList from "./Components/TodoList";
import { Todo } from "./modal";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  // console.log(todos);

  return (
    // <DragDropContext>
    <div className="App">

   


      <span className="heading">Todo App</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
      />
    </div>
    // </DragDropContext>
  );
};

export default App;
