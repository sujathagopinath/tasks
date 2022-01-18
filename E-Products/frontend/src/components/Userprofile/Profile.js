import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/Actions/Users/useraction';
import './Profile.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading'

const Profile = () => {
    const dispatch = useDispatch();
     const history = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  //Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  console.log('up',userProfile)
  const { loading, user } = userProfile;
  console.log("user:", user);
  // console.log("email",userProfile.user.recordset.userEmail)
  

  // const users = userProfile.user && userProfile.user.products;
  const users = userProfile.user 
  const renderTable = () => {
    if (users) {
      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Product Name</th>
              <th scope='col'>Product Note</th>
              <th scope='col'>Price</th>
              <th scope='col'>Discount </th>
              <th scope='col'>Delete</th>
              <th scope='col'>Update</th>
            </tr>
          </thead>
          <tbody>
            {users.recordset.map(product => {
              return (
                <tr className='table-dark' key={product.custId}>
                  <th scope='row'>{product.productname}</th>
                  <td>{product.productnote}</td>
                  <td>{product.price}</td>
                  <td>{product.Discount}</td>
                   <td> <i
                    // onClick={() => handlerDeleteBook(book._id)}
                    className='fas fa-trash '
                    style={{ color: 'red', cursor: 'progress' }}>
                  </i>
                  </td>
                  <td>
                    <button>
                      {/*  onClick={() => updatefunc(book)}> */}
                      <i
                        className='fas fa-edit'
                        style={{
                          color: 'red',
                          cursor: 'progress',
                        }}></i>
                    </button>

                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return (
        <>
          <h1>You don't have any profile yet</h1>
        </>
      );
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col mt-5'>
          {loading && !user ? (
            <Loading/>
          ) : (
            <div className='card m-auto ' style={{ width: '50%' }}>
                <div className='card-body'>
                  {/* {users.recordset.map(product => {
              return (
                <tr className='table-dark' key={product.userId}>
                  <td>{product.userName}</td>
                  <td>{product.userEmail}</td>  
                </tr>
              );
                  })}
                   <Link to='/update' className='btn btn-primary'>
                  Update your profile
                </Link> */}
                {/* <h5 className='card-title'>{userProfile.user.userEmail}</h5> */}
                <p className='card-text'>{user && user.userName}</p>
                 <Link to='/update' className='btn btn-primary'>
                  Update your profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='row'>
        <div className='col'>{renderTable()}</div>
      </div>
    </div>
  );
};

export default Profile;
