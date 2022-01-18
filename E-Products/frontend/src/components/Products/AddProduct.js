import React, { useState } from 'react';
import { createProduct } from '../../redux/Actions/Products/productaction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const history = useNavigate()
  const [productname, setProductname] = useState('');
  const [productnote, setProductnote] = useState('');
  const [price, setPrice] = useState('');
  

  //dispatch action
  const dispatch = useDispatch();
  const formSubmitHandler = e => {
    const data = {
      productname,
      productnote,
      price
    };
    e.preventDefault();
    dispatch(createProduct(data));
    history('/products');
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
            Click to add Product.
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
                    Create Product
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
                        <input
                          value={productname}
                          onChange={e => setProductname(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Author name' required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Product Note </label>
                        <input
                          value={productnote}
                          onChange={e => setProductnote(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputEmail1'
                          aria-describedby='emailHelp'
                          placeholder='Author name' required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='exampleInputPassword1'>Price</label>
                        <input
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          type='text'
                          className='form-control'
                          id='exampleInputPassword1'
                          placeholder='Book title' required
                        />
                      </div>
                      

                      <button type='submit' className='btn btn-warning m-auto'>
                        Create Product
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

export default AddProduct;
