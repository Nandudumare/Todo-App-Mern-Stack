import React from "react";
import { Todo } from "../modal";
import { MemoSingleTodo } from "./SingleTodo";
import "./styles.css";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoList = ({ todos, setTodos,loading, setLoading }: Props) => {
  return (
    //normal
    <div className="todos">
      {todos.map((todo) => {
        return (
          <MemoSingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            loading={loading}
            setLoading={setLoading}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
