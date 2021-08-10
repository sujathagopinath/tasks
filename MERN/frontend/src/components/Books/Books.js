import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';
// import App from './Pagination'

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

$(function () {
  $('.table').DataTable({
    order: [0, 'desc']
  });
});

const Books = ({ history }) => {
  //Fetch books
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  const bookslist = useSelector(state => state.booksList);
  const { books, loading } = bookslist;
  // End of fetch books

  //Redirect

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo === null) history.push('/login');
  }, [userInfo, history]);


  //Delete book handler
  const handlerDeleteBook = id => {
    dispatch(deleteBook(id));
    history.push('/books');
  };
  return (
    <div>
      {loading && <Loading />}
      {books !== undefined && books.length === 0 ? (
        'No'
      ) : (
        <div className='row'>
          <div className='col'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Author</th>
                  <th scope='col'>Book Name</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>User Name</th>
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
      )
      }
      {/* <App></App> */}
    </div >
  );
};

export default Books;
