import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addCart } from "../../Redux/Actions/Products/productaction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { deleteItem } from "../../Redux/Actions/Products/productaction";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const cartproduct = JSON.parse(sessionStorage.getItem("cartproduct"));
  console.log("cart", cartproduct);

  const [productId] = useState(cartproduct.productId);
  const [productname] = useState(cartproduct.productname);
  const [discount] = useState(cartproduct.discount);
  const [quantity, setQuantity] = useState(cartproduct.quantity);

  const removeItem = (productId) => {
    dispatch(deleteItem(productId));
    toast(`Product got deleted with Id  ${productId} reload the page!!`);
    history("/carts");
  };

  const data = {
    productname,
    discount,
    quantity,
  };
  dispatch(addCart(data));

  const incrementCount = () => {
    setQuantity(quantity + 1);
  };
  let decrementCount = () => setQuantity(quantity - 1);
  if (quantity <= 0) {
    decrementCount = () => setQuantity(1);
  }
  const renderTable = () => {
    if (cartproduct) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Product Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Discount</th>
              <th scope="col">Quantity </th>
              <th scope="col">Total</th>
              <th scope="col">Remove Item </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{productId}</th>
              <th scope="row">{productname}</th>
              <td>{discount}</td>
              <td>
                {" "}
                <AddIcon onClick={incrementCount} />
                {quantity}
                <RemoveIcon onClick={decrementCount} />
              </td>

              <td>{quantity * discount}</td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => removeItem(productId)}
                >
                  Remove
                </Button>
                <ToastContainer />
              </td>
            </tr>
          </tbody>
          <a href="/allproducts">
            <KeyboardBackspaceIcon />
          </a>
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
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          <div className="card m-auto " style={{ height: "40px" }}>
            <h3 className="card-title">Cart Items </h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">{renderTable()}</div>
      </div>
    </div>
  );
};

export default Cart;
