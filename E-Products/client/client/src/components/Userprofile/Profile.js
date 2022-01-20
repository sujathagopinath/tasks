import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../Redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading'
import home from '../../assests/home.jpg'
import Button from '@mui/material/Button';


const Profile = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  function updatefunc(product) {
    sessionStorage.setItem('product', JSON.stringify(product))
    console.log("updatefunc", product)
    history('/updateproduct');
  }

  //Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  const { user,loading } = userProfile;
  console.log("user:", user);
  
  const image = {
  width: "50px",
  height: "50px",
  borderRadius: "20%",
  margin: "5px auto",
  border: "#f1f1f1 1px solid"

  }

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
              <th scope='col'>CustId</th>
              <th scope='col'>Image</th>
              <th scope='col'>Update</th>
              
            </tr>
          </thead>
          <tbody>
            {users.recordset.map(product => {
              return (
                <tr className='table-dark' key={product.productId}>
                  <th scope='row'>{product.productname}</th>
                  <td>{product.productnote}</td>
                  <td>{product.price}</td>
                      <td>{product.discount}</td>
                  <td>{product.userId}</td>
                  <td><img src={home} alt="Product pic" style={image} /></td>
                  <td><Button onClick={() => updatefunc(product)} variant="contained">Update</Button></td>
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
              <div className='card m-auto ' style={{ height: '40px' }}>
                <h3 className='card-title'>Products of Users </h3>
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
