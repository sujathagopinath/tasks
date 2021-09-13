import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';

const Books = () => {
  //Fetch books
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const bookslist = useSelector(state => state.booksList);
  const { books, loading } = bookslist;
  console.log("bookslist", bookslist);
  console.log("Books", (books));
  // End of fetch books

  // const userLogin = useSelector(state => state.userLogin);
  // const { userInfo } = userLogin;
  // useEffect(() => {
  //   if (userInfo === null) history.push('/login');
  // }, [userInfo, history]);


  return (
    <div>
      {loading && <Loading />}
      {books !== undefined && books.length === 0 ? (
        'No Book has been added yet'
      ) : (
        <div className='row'>
          <div className='col'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Author</th>
                  <th scope='col'>Book Name</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>NickName</th>
                </tr>
              </thead>

              <tbody>
                {books &&
                  books.map(book => {
                    return (
                      <tr className='table-dark' key={book._id}>
                        <td>{book.author}</td>
                        <td>{book.title}</td>
                        <td>{book.category}</td>
                        <td>{book.createdby}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
