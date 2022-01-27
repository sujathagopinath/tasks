import React, { useState } from 'react';
import '../../assests/CSS/AddProduct.css'
import { useForm } from "react-hook-form"; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../Redux/Actions/Products/productaction';



const AddProduct = () => {
   
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log('reg', register)

  const history = useNavigate()
  const [productname, setProductname] = useState('');
  const [productnote, setProductnote] = useState('');
  const [price, setPrice] = useState('');
  
  const dispatch = useDispatch();
  const onSubmit = () => {
    const data = {
      productname,
      productnote,
      price
    };
    dispatch(createProduct(data));
      history('/products');
  };
 
  return (
    <div className='container'>
        <div className='product-form'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="inputProductname">Product Name</label>
        <input type="text"
          {...register('text', {
            required: 'Product Name is required'
          })}
          value={productname}
          onChange={e => setProductname(e.target.value)}
        />

        {errors.text && <p className="error">{errors.text.message}</p>}
        
        <label htmlFor="inputProductnote">Product Note</label>
        <input type="email"
          {...register('email', {
            required: 'Product Note is required'
          })}
          value={productnote}
          onChange={e => setProductnote(e.target.value)}
        />
        
        {errors.email && <p className="error">{errors.email.message}</p>}
        
        <label htmlFor="inputPrice">Price</label>
        <input type="number"
          {...register('number', {
            required: 'Price is required'
          })}
              value={ price}
          onChange={e => setPrice(e.target.value)}
        />

          {errors.number && <p className="error">{errors.number.message}</p>}
          <div>
            <button type="submit">Create Product</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
