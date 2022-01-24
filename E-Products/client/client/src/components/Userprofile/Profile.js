import React, { useEffect } from 'react';
import '../../assests/CSS/Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../Redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading'
import home from '../../assests/home.jpg'
import Button from '@mui/material/Button';
import { deleteProduct } from '../../Redux/Actions/Products/productaction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = (props) => {
  console.log('pro', props)
  
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  function updatefunc(product) {
    sessionStorage.setItem('product', JSON.stringify(product))
    console.log("updatefunc", product)
    history('/updateproduct');
  }

  
  const handlerDeleteProduct = productId => {
    dispatch(deleteProduct(productId));
    toast(`Product got deleted with Id  ${productId} reload the page!!`)
    history('/products');
  };

  //Get user Profile
  const userProfile = useSelector(state => state.userProfile);
  const { user, loading } = userProfile;
  console.log("user:", user);
  
  

  const users = userProfile.user
     return (
    <div className = 'container-fluid' >
      <h1 className='text-center m-2'> Product of users</h1>
      <div className='row text-center justify-content-center'>
         {loading ? (
           <Loading/>
         ) : (
            <> 
             {users && users.recordset.map(product  => (
                 <div className='col-lg-3' key={product.productId}>
                 <div className='card'>
                   <img src={home} alt="Product pic" className='image' />
                   <div className='card-body'>
                     <h5 className='card-title'>{product.productname}</h5>

                     <p className='ptext'>
                       {product.productnote}
                     </p>

                     <p className='ptext'>
                       <small className='small'>Price: </small>
                       {product.price}
                     </p>

                     <p className='ptext'>
                       <small className='small'>Discount: </small>
                       {product.discount}
                     </p>

                     <Button onClick={() => handlerDeleteProduct(product.productId)}
                       variant="contained">Delete</Button>
                     <ToastContainer />
                     <br/>
                       <Button onClick={() => updatefunc(product)} variant="contained">
                         Update
                      </Button>
                    
                   </div>
                 </div>
               </div>
             ))}
             </>
           )}
         </div>
       </div>  
  )
}

export default Profile;
