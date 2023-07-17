import './App.css';
import { Header, Footer } from './Components/Layout';
import { Home, NotFound } from './Pages';
import { Routes, Route } from "react-router-dom"

function App() {


  return (
    <>
    <Header />
      <div className='pb-5'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    <Footer />
    </>
  )
}

export default App
