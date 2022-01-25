import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addCart} from '../../Redux/Actions/Products/productaction'
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteProduct } from '../../Redux/Actions/Products/productaction';
import { Button } from '@mui/material';
const Cart = () => {
  const dispatch = useDispatch();
  const cartproduct = JSON.parse(sessionStorage.getItem('cartproduct'))
  console.log("buy", cartproduct)
  

  const [price] = useState(cartproduct.price)
  const [productname] = useState(cartproduct.productname);
  const [discount] = useState(cartproduct.discount);
  const [quantity, setQuantity] = useState(cartproduct.quantity);
  
  const data = {
    productname,
    discount,
    quantity,
     price
  };
  dispatch(addCart(data));

      const incrementCount = () => {
          setQuantity(quantity + 1);
      }
    
      let decrementCount = () => setQuantity(quantity - 1);
    
      if (quantity <= 0) {
         decrementCount = () => setQuantity(1);
     }
    
      const renderTable = () => {
          if (cartproduct) {
              return (
                  <table className='table table-hover'>
                      <thead>
                          <tr>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Discount</th>
                              
                              <th scope='col'>Quantity </th>
                      <th scope='col'>Price </th>
                      <th scope='col'>Total</th>
                              <th scope='col'>Remove Item </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                      <th scope='row'>{productname}</th>
                      <td>{ discount}</td>
                              
                              <td> <AddIcon onClick={incrementCount} />
                                  {quantity}
                                  <RemoveIcon onClick={decrementCount}/>
                              </td>
                      <td>{price}</td>
                      <td>{quantity*discount}</td>
                      <td>
                        {/* <Button variant='outlined' onClick={() => removeItem(productId)}>
                          Remove
                        </Button> */}
                      </td>
                    </tr>
                      </tbody>
                  </table>
              );
      } else {
        return (
          <>
            <h1>Cart is Empty</h1>
          </>
        );
      }
    };

    return (
      <div className='container'>
        <div className='row'>
          <div className='col mt-5'>
          
                <div className='card m-auto ' style={{ height: '40px' }}>
                  <h3 className='card-title'>Cart Items </h3>
                </div>
         
          </div>
            </div>
         

        <div className='row'>
                <div className='col'>{renderTable()}</div>
            </div>
      
          </div>
    )

  
}

export default Cart;