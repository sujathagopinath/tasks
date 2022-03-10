import logo from './logo.svg';
import './App.css';
import Stateless from './Components/Stateless'
import Statefull from './Components/Statefull';
import Test from './Components/newjsx';
import Props from './Components/props';
import Message from './Components/Stateclasscomp';
import Counter from './Components/Statefunccomp';
import EventBind from './Components/EventBind';
import ParentComponent from './Components/methodasprops';

function App() {
  return (

    <div className="App">
      <Stateless name='sujatha' />
      <Statefull name='react' />
      <Test />
      <Props data='Props data'>
        <p>This child props Components</p>
      </Props>
      <Message />
      <Counter />
      <EventBind />
      <ParentComponent />

    </div>
  );
}

export default App


