import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/Actions/Users/useraction';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
     const history = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

//   useEffect(() => {
//     dispatch(fetchBooks());
//   }, [dispatch]);

//   const handlerDeleteBook = id => {
//     dispatch(deleteBook(id));
//     history.push('/books');
//   };

//   function updatefunc(book) {
//     sessionStorage.setItem('book', JSON.stringify(book))
//     console.log("updatefunc", book)
//     history.push('/book');
//   }
  //Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  const { loading, user } = userProfile;
  console.log("user:", user);

  const Products = userProfile.user && userProfile.user.Products;
  console.log('prod',Products)
  const renderTable = () => {
    if (user) {
      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Product Id</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Product Note</th>
              <th scope='col'>Price</th>
              <th scope='col'>Discount </th>
              <th scope='col'>User Name</th>
              <th scope='col'>Delete</th>
              <th scope='col'>Update</th>
            </tr>
          </thead>
          <tbody>
            {user.map(product => {
              return (
                <tr className='table-dark' key={product.productId}>
                  <th scope='row'>{product.productname}</th>
                  <td>{product.productnote}</td>
                  <td>{product.price}</td>
                  <td>{product.signupUser.userName}</td>
                  {/* <td> <i
                    onClick={() => handlerDeleteBook(book._id)}
                    className='fas fa-trash '
                    style={{ color: 'red', cursor: 'progress' }}></i></td>
                  <td>
                    <button onClick={() => updatefunc(book)}>
                      <i
                        className='far fa-edit'
                        style={{
                          color: 'red',
                          cursor: 'progress',
                        }}></i>
                    </button>

                    {/* </Link> */}
                  {/* </td> */} 
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
            ""
          ) : (
            <div className='card m-auto ' style={{ width: '50%' }}>
              <div className='card-body'>
                <h5 className='card-title'>{user && user.email}</h5>
                <p className='card-text'>{user && user.name}</p>
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
