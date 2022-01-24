import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './components/Userprofile/Profile'
import ListUsers from './components/Userprofile/ListUsers'
import UpdateProfile from './components/Updateuser/UpdateProfile';
import AddProduct from './components/Products/AddProduct';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route  path="/signup" element={<Register />} />
          <Route  path="signin" element={<Login />} />
          <Route path='/getuserdata' element=
            {<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path='/allusers' element=
            {<PrivateRoute>  <ListUsers /> </PrivateRoute>} />
          <Route path='/update' element=
            {<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
          <Route path='/create' element=
            {<PrivateRoute> <AddProduct /> </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>   
  )
}

export default App;