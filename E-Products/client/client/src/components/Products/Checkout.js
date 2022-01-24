import React, { useState } from 'react'
import '../../assests/CSS/Checkout.css'
import emailjs from 'emailjs-com';
import  PaymentInputsContainer  from '../Products/Payment';

const Checkout = () => {
    const buyproduct = JSON.parse(sessionStorage.getItem('buyproduct'))
    console.log("buy", buyproduct)
    
    const [checkoutInfo, setCheckoutInfo] = useState('')
    const [productname, setProductname] = useState(buyproduct.productname);
    const [price, setPrice] = useState(buyproduct.price);
    const [discount, setDiscount] = useState(buyproduct.discount);
    
     const formSubmitHandler = e => {
    const data = {
        productname,
        price,
        discount
    };
         e.preventDefault();
         emailjs.sendForm('service_9wl817o', 'template_xdydqxr', e.target, 'user_XEQe8W3cyQm0TlEnECvfW')
             .then((result) => {
                 console.log('res',result.text);
             }, (error) => {
                 console.log('result',error);
             });
         setCheckoutInfo(data)
  };
   

    return (
        <div className='contain'>
            <form onSubmit={formSubmitHandler}>
                <h2>CheckOut</h2>
                <div className="divider">
                    <div className='forms'>
                        <div className='field'>
                            <label>ProductName</label>
                            <input placeholder='ProductName' 
                                type="text"
                                name="product"
                                value={productname}
                                onChange={e => setProductname(e.target.value)}
                                disabled
                            />
                           
                        </div>

                        <div className='field'>
                            <label>Price</label>
                            <input placeholder='Price'
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                disabled
                            />
                           
                        </div>

                        <div className='field'>
                            <label>Offer Price</label>
                            <input placeholder='Offer Price'
                                type="number"
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                disabled
                            />
                            
                        </div>
                        <div>
                            <PaymentInputsContainer />
                        </div>
                        
                         <div className='field'>
                            <label>UserName</label>
                            <input placeholder='Name'
                                name="name"
                                type="text"
                                required
                            />
                            </div>
                        <div className='field'>
                            <label>Email Id(To receive mail)</label>
                            <input placeholder='Email'
                                name="email"
                                type="email" />
                            
                        </div>
                        
                    </div>
                    <button className='submit'>Submit</button>
                </div>
            </form >
          <pre>{JSON.stringify(checkoutInfo, undefined,2)}</pre>
        </div >
    )
}

export default Checkout