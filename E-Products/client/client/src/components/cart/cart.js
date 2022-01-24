import React,{useState} from 'react';
import home from '../../assests/home.jpg';
import '../../assests/CSS/Profile.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Cart = () => {
    const cartproduct = JSON.parse(sessionStorage.getItem('cartproduct'))
    console.log("buy", cartproduct)

    
    const [productname] = useState(cartproduct.productname);
    const [price] = useState(cartproduct.price);
    const [quantity, setQuantity] = useState(cartproduct.quantity);

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
                            <th scope='col'>Price</th>
                            <th scope='col'>Quantity </th>
                            <th scope='col'>Total </th>
                            <th scope='col'>Item </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>{productname}</th>
                            <td>{price}</td>
                            <td> <AddIcon onClick={incrementCount} />
                                {quantity}
                                <RemoveIcon onClick={decrementCount}/>
                            </td>
                            <td>{price*quantity}</td>
                            <td><img src={home} alt="Product pic" className='image' /></td>
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