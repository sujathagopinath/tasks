import * as React from "react";
import { TodoContextType, ITodo } from "../shared/interfaces";
import { TodoContext } from "../context/todoContext";
import Todo from "../components/Todo";

const Todos = () => {
  const { todos, updateTodo } = React.useContext(
    TodoContext
  ) as TodoContextType;
  return (
    <>
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} updateTodo={updateTodo} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
