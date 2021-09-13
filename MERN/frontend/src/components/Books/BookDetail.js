import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = ({ history }) => {
  const book = JSON.parse(sessionStorage.getItem('book'))
  console.log("updatebook", book)

  const [category, setCategory] = useState(book.category);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [createdby, setCreatedby] = useState(book.createdby);
  const [id] = useState(book._id)

  const dispatch = useDispatch();
  //dispatch action
  const formSubmitHandler = e => {
    const data = {
      category,
      title,
      author,
      createdby,
    };
    e.preventDefault();
    dispatch(updateBook(id, data));
    history.push('/profile');
  };
  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <>
            <h1 className='text-center'>Update</h1>
            <form onSubmit={formSubmitHandler}>
              <fieldset>
                <div className='form-group'>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='custom-select'>
                    <option Value='programming'>programming</option>
                    <option value='religion'>Religion</option>
                    <option value='life'>life</option>
                    <option value='culture'>culture</option>
                    <option Value='journal'>Journal</option>
                  </select>
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Author </label>
                  <input
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    type='text'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Author name'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>title</label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='Book title'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleInputPassword1'>UserName</label>
                  <input
                    value={createdby}
                    onChange={e => setCreatedby(e.target.value)}
                    type='text'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='User Name'
                  />
                </div>

                <button type='submit' className='btn btn-dark m-auto'>
                  Update Book
                </button>
              </fieldset>
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

























// const [id] = useState(JSON.parse(sessionStorage.getItem('book'))._id)
