import './App.css';
import { Header, Footer } from './Components/Layout';
import { Home, NotFound, ProductDetails } from './Pages';
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from './APIs/shoppingCartAPI';
import { setShoppingCart } from './Storage/Redux/shoppingCartSlice';


function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery("9d6a4d87-b61c-4452-8873-29c1d274367e");

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
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    <Footer />
    </>
  )
}

export default App
