import React, { useEffect } from 'react';
import '../../assests/ind.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux/Actions/Users/useraction';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch();
  const history = useNavigate();
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, history]);


  const usersList = useSelector(state => state.usersList);
  console.log("userlist:", usersList);
  const { loading, users } = usersList;
  // console.log('users',users.recordset)

  return (
    <div className='container-fluid'>
      <h1 className='text-center m-5'>List of users {users && users.length}</h1>
      < hr className='text-white' />
      <div className='row text-center justify-content-center'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {users &&
              users.recordset.map(user => (
                <div className='col-lg-3' key={user.userId}>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>{user.userName}</h5>
                      <p className='ptext'style={{ color: "red" }}>{user.userEmail}</p>
                      <i className='far fa-address-card h2 text-info'></i>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>

    </div>
  );
};

export default Users;
