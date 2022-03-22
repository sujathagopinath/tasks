import React from 'react';
import './App.css';
import Greet from './Components/sample';
import Personname from './Components/object';
import { PeopleList } from './Components/peopleList';

function App() {
  const people = {
    first: 'abc',
    last:'xyz'
  }
  const ListPeople = [
    {
    firstname: 'hello',
    lastname:'kitty'
    },
    {
      firstname: 'hello',
    lastname:'kitten'
    }
  ]
  return (
    <div className="App">
          <h4>TypeScript with Functional Components</h4>  
         <Greet name="sujatha" count={10} isLoggedin={true} />
      <Personname name={people} />
      <PeopleList names={ListPeople}/>
    </div>
  );
}

export default App;
