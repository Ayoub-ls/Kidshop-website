
 import { ToastContainer } from 'react-toastify';
 import Header from './components/Header';
 import Navbar from './components/Navbar'
 import { Routes, Route } from "react-router-dom";
 import Home from './pages/Home';
 // import Card from './pages/Card';
 import ProductPage from './pages/ProductPage';
 import PlaceOrder from './pages/PlaceOrder';
 import Login from './pages/Login';
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
console.log(STRAPI_URL);


function App() {

  return (
    <div className='h-fit pb-20 min-h-screen'>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<div><Header page={'Home'}/><Home/><Navbar/></div>}/>
          {/*
          <Route path='cart/' element={<div><Header page={'Card'}/><Card/><Navbar/></div>}/>
          */}
          <Route path='product/:id/' element={<ProductPage/>}/>
          <Route path='place-order/' element={<div><Header page={'Place Order'}/><PlaceOrder/><Navbar/></div>}/>
          <Route path='login/' element={<div><Header page={'Login'}/><Login/><Navbar/></div>}/>
        </Routes>
    </div>
  )
}

export default App
