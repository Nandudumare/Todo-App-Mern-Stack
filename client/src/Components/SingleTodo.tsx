import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../modal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { MdDone, MdEdit } from "react-icons/md";

import "./styles.css";
import axios from "axios";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const SingleTodo = ({ todo, todos, setTodos, loading, setLoading }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);
  const value: any = localStorage.getItem("apiKey");
  const apiKey: string = JSON.parse(value);

  const handleDone = async (id: number) => {
    setLoading(true);
    try {
      const item = todos.filter((el) => el.id === id);
      const Item = item[0];

      await axios.patch(
        `https://todo-app-c9s2.onrender.com/todo/${apiKey}/${id}`,
        {
          ...Item,
          status: !Item.status,
        }
      );
      setLoading(false);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Something went wrong");
      }, 1000);
    }
  };
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://todo-app-c9s2.onrender.com/todo/${apiKey}/${id}`
      );
      setTodos(todos.filter((todo) => todo.id !== id));
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Something went wrong");
      }, 1000);
    }
  };

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setLoading(true);
    try {
      const item = todos.filter((el) => el.id === id);
      const Item = item[0];

      await axios.patch(
        `https://todo-app-c9s2.onrender.com/todo/${apiKey}/${id}`,
        {
          ...Item,
          task: editTodo,
        }
      );
      setLoading(false);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task: editTodo } : todo
        )
      );
      setEdit(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        alert("Something went wrong");
      }, 1000);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          type="text"
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.status ? (
        <s className="todos__single--text">{todo.task}</s>
      ) : (
        <span className="todos__single--text">{todo.task}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.status) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export const MemoSingleTodo = React.memo(SingleTodo);
