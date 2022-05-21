import React from "react";
import { Todo } from "../modal";
import { MemoSingleTodo } from "./SingleTodo";
import "./styles.css";

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  
};
const TodoList = ({
  todos,
  setTodos,
}: Props) => {
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
          />
        );
      })}
    </div>
    // <div className="container">
    //   <div className="todos">
    //     <span className="todos__heading">Active Tasks</span>
    //     {todos.map((todo) => (
    //       <MemoSingleTodo
    //         key={todo.id}
    //         todo={todo}
    //         todos={todos}
    //         setTodos={setTodos}
    //       />
    //     ))}
    //   </div>
    //   <div className="todos remove">
    //     <span className="todos__heading">Completed Tasks</span>
    //     {todos.map((todo) => (
    //       <MemoSingleTodo
    //         key={todo.id}
    //         todo={todo}
    //         todos={todos}
    //         setTodos={setTodos}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
};

export default TodoList;
