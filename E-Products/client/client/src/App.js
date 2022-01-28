import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import role from "./Constants/Roles";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/signup";
import SignIn from "./components/Signin/signin";
import Profile from "./components/Userprofile/Profile";
import ListUsers from "./components/Userprofile/ListUsers";
import UpdateProfile from "./components/Updateuser/UpdateProfile";
import AddProduct from "./components/Products/AddProduct";
import ProductUpdate from "./components/Products/ProductUpdate";
import Products from "./components/Products/Products";
import Checkout from "./components/Products/Checkout";
import Forbidden from "./Constants/Forbidden";
import Cart from "./components/Products/cart";
import Carts from "./components/Products/carts";
import Order from "./components/Products/Order";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forbidden" element={<Forbidden />} />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                {" "}
                <Profile role={role.admin} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/allusers"
            element={
              <PrivateRoute>
                {" "}
                <ListUsers role={role.admin} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                {" "}
                <AddProduct role={role.admin} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <PrivateRoute>
                {" "}
                <ProductUpdate role={role.admin} />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/allorders"
            element={
              <PrivateRoute>
                {" "}
                <Order role={role.admin} />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/update"
            element={
              <PrivateRoute>
                {" "}
                <UpdateProfile role={role.user} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/allproducts"
            element={
              <PrivateRoute>
                {" "}
                <Products role={role.user} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                {" "}
                <Cart role={role.user} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/carts"
            element={
              <PrivateRoute>
                {" "}
                <Carts role={role.user} />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                {" "}
                <Checkout role={role.user} />{" "}
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
