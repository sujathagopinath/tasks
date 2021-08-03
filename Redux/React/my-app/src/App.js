import logo from './logo.svg';
import './App.css';
import Cakecontainer from './components/cakecontainer';
import { Provider } from 'react-redux'
import store from './redux/store';
import Hookscontainer from './components/Hookscontainer';
import Icecontainer from './components/icecontainer';
import NewCakeContainer from './components/newcakeContainer';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Hookscontainer />
        <Cakecontainer />
        <Icecontainer />
        <NewCakeContainer />

      </div>
    </Provider>
  );
}

export default App;
