import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchorders } from "../../Redux/Actions/Products/productaction";
import Loading from "../Loading/Loading";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchorders());
  }, [dispatch]);

  const Orderlist = useSelector((state) => state.Orderlist);
  const { orders, loading } = Orderlist;
  console.log("orderlist", Orderlist);
  console.log("orders", orders);

  const renderTable = () => {
    if (orders) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">Item</th>
            </tr>
          </thead>
          <tbody>
            {orders.recordset.map((order) => {
              return (
                <tr className="table-dark" key={order.orderId}>
                  <th scope="row">{order.orderId}</th>
                  <th scope="row">{order.usersId}</th>
                  <th scope="row">{order.productsId}</th>
                  <th scope="row">{order.item}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5">
          {loading ? (
            <Loading />
          ) : (
            <div className="card m-auto " style={{ height: "40px" }}>
              <h3 className="card-title">User Orders </h3>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">{renderTable()}</div>
      </div>
    </div>
  );
};

export default Order;
