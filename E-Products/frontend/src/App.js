import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
// import PrivateRoute from './utils/PrivateRoute';
import Profile from './components/Userprofile/Profile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>   
  )
}

export default App;