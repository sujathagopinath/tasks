import React, { useState } from 'react';
// import '../../assests/ind.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/Actions/Users/useraction';
import ErrorMessage from '../Displaytext/Errormessage';
import SuccessMessage from '../Displaytext/Successmessage';

const UpdateProfile = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  console.log("info",userInfo);

  const [userName, setname] = useState(userInfo ? userInfo.userName : '');
  const [userEmail, setemail] = useState(userInfo ? userInfo.userEmail : '');
  const [userPassword, setpassword] = useState('');
  
  
  console.log("login",userLogin);

  const updatedUser = useSelector(state => state.updatedUser);
const { userdata, loading, success, error } = updatedUser;
  console.log('userdat', userInfo.userdata)
  console.log('userdatas',userInfo.userId)

    const dispatch = useDispatch();

  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(updateUser(userName, userEmail, userPassword));
  };

  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          {userdata && !loading && success && (
            <SuccessMessage msg='Updated successfully. Logout and login with your new credentials' />
          )}
          {!userdata && !loading && error && (<ErrorMessage error="Invalid user Id" />)}
          <h1 className='text-center'>Update</h1>

          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>UserName</label>
                <input
                  value={userName}
                  onChange={e => setname(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter Name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  value={userEmail}
                  onChange={e => setemail(e.target.value)}
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  value={userPassword}
                  onChange={e => setpassword(e.target.value)}
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              <button type='submit' className='btn btn-primary m-auto'>
                Update your profile
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
