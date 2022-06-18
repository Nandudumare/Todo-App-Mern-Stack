import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Form from "./Components/Form/Form";
import InputFeild from "./Components/InputFeild";
import TodoList from "./Components/TodoList";
import { Todo } from "./modal";

const App: React.FC = () => {
  const [state, setState] = React.useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  let value: any = localStorage.getItem("apiKey");
  let apiKey: string = JSON.parse(value);

  React.useEffect(() => {
    if (apiKey !== null) {
      setState(true);
    } else {
      setState(false);
    }
  }, [state, apiKey]);

  let fn = async () => {
    let res = await axios.get(
      `https://todo-application-best.herokuapp.com/todo/${apiKey}`
    );
    const data = res.data;
    console.log("data:", data);
    setTodos([...data]);
  };

  React.useEffect(() => {
    try {
      if (state) {
        fn();
      }
    } catch (err) {
      console.log(err);
    }
  }, [state, apiKey]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      let payload = { id: Date.now(), task: task, status: false };
      await axios.post(
        `https://todo-application-best.herokuapp.com/todo/${apiKey}`,
        payload
      );
      fn();
      // setTodos([...todos, payload]);
      setTask("");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    setState(false);
  };

  return (
    <div className="App">
      {state ? (
        <>
          <span className="heading">Todo App</span>

          <button onClick={handleLogout} id="logout">
            Log Out
          </button>

          <InputFeild task={task} setTask={setTask} handleAdd={handleAdd} />
          <TodoList todos={todos} setTodos={setTodos} />
        </>
      ) : (
        <Form setState={setState} />
      )}
    </div>
  );
};

export default App;
