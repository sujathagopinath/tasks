import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Actions/Products/productaction";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/Config";
import Loading from "../Loading/Loading";
import Button from "@mui/material/Button";

const Products = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const Productslist = useSelector((state) => state.Productslist);
  const { products, loading } = Productslist;

  function buyprod(buyproduct) {
    sessionStorage.setItem("buyproduct", JSON.stringify(buyproduct));
    console.log("buyprod", buyproduct);
    history("/checkout");
  }

  function cartproduct(cartproduct) {
    sessionStorage.setItem("cartproduct", JSON.stringify(cartproduct));
    console.log("cartprod", cartproduct);
    history("/cart");
  }

  return (
    <div className="container-fluid">
      {loading && <Loading />}
      {products !== undefined && products.length === null ? (
        "No Product has been added yet"
      ) : (
        <div className="container-fluid">
          <input
            className="form-control"
            placeholder="Search Product Name"
            type="text"
            value={search}
            onChange={handleInputSearch}
          />
          <h1 className="text-center m-2">Take Your Items</h1>
          <div className="row text-center justify-content-center">
            {loading ? (
              <Loading />
            ) : (
              <>
                {products &&
                  products.recordset
                    .filter((product) =>
                      product.productname
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((product) => (
                      <div className="col-lg-3" key={product.productId}>
                        <div className="card">
                          <img
                            src={`${backendUrl}/static/${product.productimage}`}
                            alt="Product pic"
                            className="image"
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {product.productname}
                            </h5>
                            <p className="ptext">{product.productnote}</p>
                            <p className="ptext">
                              <small className="small">Price: </small>
                              {product.price}
                            </p>

                            <p className="ptext">
                              <small className="small">Discount: </small>
                              {product.discount}
                            </p>

                            <Button
                              onClick={() => buyprod(product)}
                              style={{ backgroundColor: "darkgray" }}
                            >
                              Buy
                            </Button>

                            <Button
                              onClick={() => cartproduct(product)}
                              style={{ backgroundColor: "darkgray" }}
                            >
                              Add Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
