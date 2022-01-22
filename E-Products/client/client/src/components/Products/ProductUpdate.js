import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../Redux/Actions/Products/productaction';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductUpdate = () => {
  const history = useNavigate()
  const product = JSON.parse(sessionStorage.getItem('product'))
  console.log("updateproduct", product)

  const [productname, setProductname] = useState(product.productname);
  const [productnote, setProductnote] = useState(product.productnote);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);

  const [productId] = useState(product.productId)

  const dispatch = useDispatch();
  //dispatch action
  const formSubmitHandler = e => {
    const data = {
      productname,
      productnote,
      price,
      discount
    };
    e.preventDefault();
      dispatch(updateProduct(productId, data));
      toast("Updated Products In Products Page!!");
    history('/products');
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
                <label htmlFor='exampleInputEmail1'>Product Name</label>
                <input
                  value={productname}
                  onChange={e => setProductname(e.target.value)}
                  type='text'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Product Name'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Product Note</label>
                <input
                  value={productnote}
                  onChange={e =>setProductnote(e.target.value)}
                  type='test'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Product Note'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Price</label>
                <input
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  type='number'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Price'
                />
                </div>
                <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Discount(Only Price Greater than 1000)</label>
                <input
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  type='number'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Discount'
                />
              </div>
              <button type='submit'className='btn btn-primary m-auto'>
                Update your Products
              </button>
              <ToastContainer/>
            </fieldset>
          </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
