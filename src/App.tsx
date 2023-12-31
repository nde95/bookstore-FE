import "./App.css";
import { Header, Footer } from "./Components/Layout";
import {
  AccessDenied,
  AllOrders,
  Home,
  Login,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetailsPage,
  Payment,
  ProductDetails,
  Register,
  ShoppingCart,
} from "./Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "./APIs/shoppingCartAPI";
import { setShoppingCart } from "./Storage/Redux/shoppingCartSlice";
import { userModel } from "./Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "./Storage/Redux/authSlice";
import { RootState } from "./Storage/Redux/store";
import { AllProductsList, ProductUpsert } from "./Components/Page/Products";

function App() {
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.authStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/ProductDetails/:productItemId"
            element={<ProductDetails />}
          ></Route>
          <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myorders" element={<MyOrders />}></Route>
          <Route path="/order/allorders" element={<AllOrders />}></Route>
          <Route
            path="/products/productupsert/:id"
            element={<ProductUpsert />}
          ></Route>
          <Route
            path="/products/productupsert"
            element={<ProductUpsert />}
          ></Route>
          <Route
            path="/products/productlist"
            element={<AllProductsList />}
          ></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetailsPage />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
