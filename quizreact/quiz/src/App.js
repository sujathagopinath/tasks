import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './Pages/Home'
import Quiz from './Pages/Quiz'
import Result from './Pages/Result'
import axios from 'axios';

function App() {
  const [name, setName] = useState("")
  const [questions, setQuestions] = useState("")
  const [score, setScore] = useState(0)
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get
      // ('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      (`https://opentdb.com/api.php?amount=5${category && `& category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}& type=multiple`);

    console.log("triviadb", data)
    setQuestions(data.results);
  }
  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: "url(./quizbg.png)" }}>
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>

          <Route path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>

          <Route path="/result">
            <Result
              name={name}
              score={score} />
          </Route>

        </Switch>
      </div >
    </BrowserRouter>
  );
}

export default App;
