import './App.css';
import { Header, Footer } from './Components/Layout';
import { AccessDenied, Home, Login, NotFound, ProductDetails, Register, ShoppingCart } from './Pages';
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from './APIs/shoppingCartAPI';
import { setShoppingCart } from './Storage/Redux/shoppingCartSlice';
import { userModel } from './Interfaces';
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from './Storage/Redux/authSlice';


function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery("9d6a4d87-b61c-4452-8873-29c1d274367e");

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if(localToken) {
      const { fullName, id, email, role } : userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, [])


  useEffect(() => {
    if (!isLoading){
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [data]);


  return (
    <>
    <Header />
      <div className='pb-5'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ProductDetails/:productItemId" element={<ProductDetails />}></Route>
          <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path='/accessDenied' element={<AccessDenied />}></Route>
        </Routes>
      </div>
    <Footer />
    </>
  )
}

export default App
