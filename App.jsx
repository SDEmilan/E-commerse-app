
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Mainpage from './components/main';
import Oneproduct from './components/oneproduct';
import Signup from './components/signup';
import Siginpage from './components/login';
import Buynow from './components/buynow';
import Order from './components/ordersucess';
import Resetpassword from './components/resetpassword';
import Cartpage from './components/cart';
import Addaddress from "./components/address";
import Address from './components/addaddress';
import Razorpay from './components/razorpay';
import Invoice from './components/invoice';
import Rateus from './components/rateus';
import Fav from './components/favourite';
function App() {
  return (
    <>
    
<GoogleOAuthProvider clientId="3032629380-rjevd68liqu5t3cln84ggp24j5f5gtj8.apps.googleusercontent.com">

<BrowserRouter>
         <Routes>
              <Route path='/' element={<Signup/>}></Route>
              <Route path='/loginpage' element={<Siginpage/>}></Route>
              <Route path='/mainpage' element={<Mainpage/>}></Route>
              <Route path='/oneproduct/:id' element={<Oneproduct/>}></Route>
              <Route path='/buynow' element={<Buynow/>}></Route> 
              <Route path='/ordersucess' element={<Order/>}></Route>    
              <Route path='/resetpassword' element={<Resetpassword/>}></Route> 
              <Route path='/gotocart' element={<Cartpage/>}></Route> 
              <Route path='/gotoaddress' element={<Addaddress/>}></Route> 
              <Route path='/toaddress' element={<Address/>}></Route> 
              <Route path='/torazorpay' element={<Razorpay/>}></Route> 
              <Route path='/toinvoice' element={<Invoice/>}></Route> 
              <Route path='/torating' element={<Rateus/>}></Route> 
              <Route path='/tofav' element={<Fav/>}></Route> 
         </Routes>
     </BrowserRouter>
</GoogleOAuthProvider>
    
    </>
  );
}


export default App;

