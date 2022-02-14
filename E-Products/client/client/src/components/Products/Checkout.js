import React, { useState } from "react";
import "../../assests/CSS/Checkout.css";
import PaymentInputsContainer from "../Products/Payment";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../../Redux/Actions/Products/productaction";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import emailjs from "emailjs-com";

const Checkout = () => {
  const dispatch = useDispatch();
  const buyproduct = JSON.parse(sessionStorage.getItem("buyproduct"));
  console.log("buy", buyproduct);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("info", userInfo);

  const [userName] = useState(userInfo.userdata[0].userName);
  const [userEmail] = useState(userInfo.userdata[0].userEmail);
  const [checkoutInfo, setCheckoutInfo] = useState("");
  const [productId] = useState(buyproduct.productId);
  const [productname, setProductname] = useState(buyproduct.productname);
  const [price, setPrice] = useState(buyproduct.price);
  const [discount, setDiscount] = useState(buyproduct.discount);

  const formSubmitHandler = (e) => {
    const data = {
      productname,
      price,
      discount,
      productId,
    };
    dispatch(order(data));
    e.preventDefault();
    emailjs
      .sendForm(
        "service_mas4wmn",
        "template_4fzek53",
        e.target,
        "user_bQnfuO3R35Tjv0cwZ2biO"
      )
      .then(
        (result) => {
          console.log("res", result.text);
        },
        (error) => {
          console.log("result", error);
        }
      );
    setCheckoutInfo(data);
  };

  return (
    <div className="contain">
      <form onSubmit={formSubmitHandler}>
        <h2>CheckOut</h2>
        <div className="divider">
          <div className="forms">
            <div className="field">
              <label>ProductName</label>
              <input
                placeholder="productname"
                type="text"
                name="message"
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
                disabled
              />
            </div>

            <div className="field">
              <label>Price</label>
              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled
              />
            </div>

            <div className="field">
              <label>Offer Price</label>
              <input
                placeholder="Offer Price"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                disabled
              />
            </div>
            <div>
              <PaymentInputsContainer />
            </div>

            <div className="field">
              <label>UserName</label>
              <input
                placeholder="Name"
                name="name"
                type="text"
                value={userName}
                disabled
              />
            </div>
            <div className="field">
              <label>Email Id</label>
              <input
                placeholder="Email"
                name="email"
                type="email"
                value={userEmail}
                disabled
              />
            </div>
          </div>
          <button className="submit">Submit</button>
        </div>
        <a href="/allproducts">
          <KeyboardBackspaceIcon />
        </a>
      </form>
      <pre>{JSON.stringify(checkoutInfo, undefined, 2)}</pre>
    </div>
  );
};

export default Checkout;
