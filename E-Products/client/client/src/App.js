import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignUp from './components/Signup/signup';
import SignIn from './components/Signin/signin';
import Profile from './components/Userprofile/Profile';
import ListUsers from './components/Userprofile/ListUsers';
import UpdateProfile from './components/Updateuser/UpdateProfile'
import AddProduct from './components/Products/AddProduct'

function App() {
  return (
     <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route  path="signup" element={<SignUp />} />
           <Route  path="signin" element={<SignIn />} />
          <Route path='/products' element=
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
  );
}

export default App;
