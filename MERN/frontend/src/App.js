import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Books from './components/Books/Books';
import AddBook from './components/Books/AddBook';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import BookDetail from './components/Books/BookDetail';
import Users from './components/Users/Users';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/books' component={Books} />
        <PrivateRoute path='/addbook' component={AddBook} />
        <PrivateRoute path='/update' component={UpdateProfile} />
        <PrivateRoute path='/book' component={BookDetail} />
        <PrivateRoute path='/users' component={Users} />
      </BrowserRouter>
    </>
  );
};

export default App;
