import './App.css';
import './i18n/config';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/user/login';
import ForgotPassword from './components/user/forgot-password'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
      </BrowserRouter>
    </>
  )
}

export default App;