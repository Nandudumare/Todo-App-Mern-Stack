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
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    try {
      let res = await axios.get(
        `https://todo-app-c9s2.onrender.com/todo/${apiKey}`
      );
      const data = res.data;
      setTodos([...data]);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Something went wrong");
      }, 1000);
    }
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
      setLoading(true);
      try {
        let payload = { id: Date.now(), task: task, status: false };
        await axios.post(
          `https://todo-app-c9s2.onrender.com/todo/${apiKey}`,
          payload
        );
        setLoading(false);
        fn();
        setTask("");
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          alert("Something went wrong");
        }, 1000);
      }
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("apiKey");
    setState(false);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <ul className="loader_ul">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      ) : (
        ""
      )}

      {state ? (
        <>
          <span className="heading">Todo App</span>

          <button onClick={handleLogout} id="logout">
            Log Out
          </button>

          <InputFeild
            task={task}
            setTask={setTask}
            handleAdd={handleAdd}
            loading={loading}
            setLoading={setLoading}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            loading={loading}
            setLoading={setLoading}
          />
        </>
      ) : (
        <Form setState={setState} loading={loading} setLoading={setLoading} />
      )}
    </div>
  );
};

export default App;
