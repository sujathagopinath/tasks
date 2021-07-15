import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Crud from './crud';
import Update from './crud/update';
function App() {
  return (
    <div className="App">
      {/* <h2>CRUD operation</h2> */}
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Crud} />
        <Route exact path="/update/:id" component={Update} />
      </Switch>
    </div>
  );
}

export default App;
