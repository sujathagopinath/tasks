import React from 'react';
import './App.css';
import Greet from './Components/sample';
import Personname from './Components/object';
import { PeopleList } from './Components/peopleList';
import { Button } from './Components/Button'
import { InputHandler } from './Components/input';
import { LoggedIn } from './Components/hook'
import { User } from './Components/dynamicuser';
import { Counter } from './Components/counterl';
import { Todos } from './Components/todos';

function App() {
  const people = {
    first: 'abc',
    last: 'xyz'
  }
  const ListPeople = [
    {
      firstname: 'hello',
      lastname: 'kitty'
    },
    {
      firstname: 'hello',
      lastname: 'kitten'
    }
  ]
  return (
    <div className="App">
      <h4>TypeScript with Functional Components</h4>
      <Greet name="sujatha" count={10} isLoggedin={true} />
      <Personname name={people} />
      <PeopleList names={ListPeople} />
      <Button handleClick={(event, id) => {
        console.log("Button Clicked", event, id)
      }} />
      <InputHandler value="" handleChange={(event) => {
        console.log(event.target.value)
      }} />
      <LoggedIn />
      <User />
      <Counter />
      <Todos />
    </div>
  );
}

export default App;
