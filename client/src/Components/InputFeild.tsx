import React, { useRef } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild = ({ task, setTask, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action=""
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={task}
        type="text"
        placeholder="Enter a Task"
        className="input_box"
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputFeild;
