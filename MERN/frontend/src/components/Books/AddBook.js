import React, { useState, useEffect } from 'react';
import { createBook } from '../../redux/actions/books/bookActions';
import { useDispatch, useSelector } from 'react-redux';
import book from './Books';


const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

const AddBook = ({ history }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [createdby, setCreatedby] = useState('');

  //Get the user id from store

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, email } = userLogin;
  // console.log(userInfo._id, userInfo, email);

  useEffect(() => {
    if (userInfo === null) history.push('/login');
  }, [userInfo, history]);

  //dispatch action
  const dispatch = useDispatch();

  const formSubmitHandler = e => {
    const data = {
      category,
      title,
      author,
      image,
      createdby,
      createdBy: userInfo && userInfo._id,
    };
    e.preventDefault();
    dispatch(createBook(data));
    history.push('/books');
  };
  console.log(category);
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
                          className='custom-select'>
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

                      <div className='form-group mb-3'>
                        <label htmlFor='image'>Select an Image</label>
                        <input value={image} type='file'
                          onChange={e => setImage(e.target.value)}
                          className='form-control'
                          id='image' placeholder='Choose an image' />
                      </div>

                      {/* <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>UserId</label>
                        <input
                          value={userInfo._id}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='User id' disabled
                        />
                      </div> */}




                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>User Name</label>
                        <input
                          value={createdby}
                          onChange={e => setCreatedby(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='User Name'
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
