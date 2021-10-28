import React, { useEffect } from 'react';
import './Profile.css';
import pic from '../../assets/img/bookpic.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/users/userActions';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { deleteBook, fetchBooks } from '../../redux/actions/books/bookActions';

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  //Check if user is login otherwise redirect
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo === null) history.push('/login');
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handlerDeleteBook = id => {
    dispatch(deleteBook(id));
    history.push('/books');
  };
  //Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  const { loading, user } = userProfile;

  console.log("user:", user);

  const books = userProfile.user && userProfile.user.books;

  const renderTable = () => {
    if (books) {
      return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Author</th>
              <th scope='col'>Book Name</th>
              <th scope='col'>Category</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Delete</th>
              <th scope='col'>Update</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => {
              return (
                <tr className='table-dark' key={book._id}>
                  <th scope='row'>{book.author}</th>
                  <td>{book.title}</td>
                  <td>{book.category}</td>
                  <td>{book.createdby}</td>
                  <td> <i
                    onClick={() => handlerDeleteBook(book._id)}
                    className='fas fa-trash '
                    style={{ color: 'red', cursor: 'progress' }}></i></td>
                  <td>
                    <Link to={`/book/${book && book._id}`}>
                      <i
                        className='far fa-edit'
                        style={{
                          color: 'yellow',
                          cursor: 'progress',
                        }}></i>
                    </Link>
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
            <Loading />
          ) : (
            <div className='card m-auto ' style={{ width: '50%' }}>
              <img src={pic} className='card-img-top' alt='...' />
              <div className='card-body'>
                <h5 className='card-title'>{user && user.email}</h5>
                <p className='card-text'>{user && user.name}</p>
                <p className='card-text'>{user && user.role}</p>
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
