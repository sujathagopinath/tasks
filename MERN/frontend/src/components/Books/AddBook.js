import React, { useState } from 'react';
import { createBook } from '../../redux/actions/books/bookActions';
import { useDispatch } from 'react-redux';

const AddBook = ({ history }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [createdby, setCreatedby] = useState('');

  //dispatch action
  const dispatch = useDispatch();
  const formSubmitHandler = e => {
    const data = {
      category,
      title,
      author,
      createdby,
    };
    e.preventDefault();
    dispatch(createBook(data));
    history.push('/books');
  };
  return (
    <div className='row container-height'>
      <div className='col-lg-6 col-md-6 m-auto'>
        <div className='container'>
          <button
            type='button'
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#exampleModal'>
            Click to add Book.
          </button>

          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Create Book
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>

                <div className='modal-body'>
                  <h1 className='text-center'>Add Book</h1>
                  <form onSubmit={formSubmitHandler}>
                    <fieldset>
                      <div className='form-group'>
                        <select
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          className='custom-select' required>
                          <option Value='Select A Book'>
                            Choose One
                          </option>
                          <option value='religion'>Religion</option>
                          <option value='life'>Life</option>
                          <option value='culture'>Culture</option>
                          <option value='Journal'>Journal</option>
                          <option value='programming'>Programming</option>
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
                          placeholder='Author name' required
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
                          placeholder='Book title' required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>User Name</label>
                        <input
                          value={createdby}
                          onChange={e => setCreatedby(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='User Name' required
                        />
                      </div>

                      <button type='submit' className='btn btn-warning m-auto'>
                        Create Book
                      </button>
                    </fieldset>
                  </form>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-danger'
                    data-dismiss='modal'>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
