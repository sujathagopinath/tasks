import React, { useEffect } from "react";
import "../../assests/CSS/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Redux/Actions/Users/useraction";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { backendUrl } from "../../utils/Config";
import Button from "@mui/material/Button";
import { deleteProduct } from "../../Redux/Actions/Products/productaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = (props) => {
  console.log("pro", props);

  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, history]);

  function updatefunc(product) {
    sessionStorage.setItem("product", JSON.stringify(product));
    history("/updateproduct");
  }

  const handlerDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    toast(`Product got deleted with Id  ${productId} reload the page!!`);
    history("/products");
  };

  //Get user Profile
  const userProfile = useSelector((state) => state.userProfile);
  const { user, loading } = userProfile;
  console.log("user:", user);

  const users = userProfile.user;
  return (
    <div className="container-fluid">
      <div>
        {loading && <Loading />}
        {users !== undefined && users.length === 0 ? (
          "No Product has been added yet"
        ) : (
          <div className="row">
            <div className="col">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Product Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Note</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.recordset.map((product) => {
                      return (
                        <tr className="table-dark" key={product.productId}>
                          <td>
                            <img
                              src={`${backendUrl}/static/${product.productimage}`}
                              alt="Product pic"
                              className="image"
                            />
                          </td>
                          <td>{product.productname}</td>
                          <td>{product.productnote}</td>
                          <td>{product.price}</td>
                          <td>{product.discount}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handlerDeleteProduct(product.productId)
                              }
                              variant="contained"
                            >
                              Delete
                            </Button>
                            <ToastContainer />
                            <br />
                            <Button
                              onClick={() => updatefunc(product)}
                              variant="contained"
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
