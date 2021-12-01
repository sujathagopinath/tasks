import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom'
// import Main from './Pages/Main'
import  Registration from './Pages/Registration';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes path='/' exact render = {(props)=><Main/>} />
        <Routes path='/registration' exact render={(props)=>< Registration/>} />
      </Router> */}
      <Registration/>
    </div>
  );
}

export default App;
