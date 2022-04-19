import * as React from "react";
import { ITodo } from "../shared/interfaces";

type Props = {
  todo: ITodo;
  updateTodo: (id: number) => void;
};

const Todo = (props: Props) => {
  const checkTodo: string = props.todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{props.todo.title}</h1>
        <span className={checkTodo}>{props.todo.description}</span>
      </div>
      <button
        onClick={() => props.updateTodo(props.todo.id)}
        className={props.todo.status ? "hide-button" : "Card--button"}
      >
        Status
      </button>
    </div>
  );
};
export default Todo;
