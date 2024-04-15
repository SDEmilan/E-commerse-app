import React, { useState } from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import {  useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function Cartpage() {
    const Navigate=useNavigate()
  const location = useLocation();
  const cart = location.state;
  const [cartItems, setCartItems] = useState(cart.map(item => ({ ...item, qty: 1, total: item.price })));
  

  const increaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1, total: item.total + item.price } : item
    ));
  };

  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1, total: item.total - item.price } : item
    ));
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.total, 0);
  const totalqty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const removeFromcart=((id)=>{
  const updateData=cartItems.filter((item)=>item.id!==id)
   setCartItems(updateData)
  })
  const gotoAddress=()=>{
    Navigate("/gotoaddress",{state:cartItems})
  }

  return (
    <>
      <Typography sx={{ fontSize: 30, fontWeight: 700, textAlign: "center" }}>Cart Page</Typography>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {cartItems.map((item) => (
          <Paper key={item.id} elevation={4} sx={{ width: 300, height: 350, display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", gap: 2 }} >
            <Box component="img" src={item.image} sx={{ height: 170, width: 170 }} />
            <Typography sx={{fontSize:15,fontWeight:700,mt:1}}>Price:{Math.round(item.total)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Button variant="contained" onClick={() => increaseQty(item.id)}>+</Button>
              <Typography sx={{fontSize:15,fontWeight:700,mt:1}}>Qty:{item.qty}</Typography>
              <Button variant="contained" onClick={() => decreaseQty(item.id)}>-</Button>
            </Box>
            <Button variant="contained" sx={{backgroundColor:"red",width:150}} onClick={()=>removeFromcart(item.id)}> Remove</Button>
          </Paper>
        ))}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column",gap:2 }}>
          <Typography  sx={{fontSize: 30, fontWeight: 700, textAlign: "center"}}>Total:{Math.round(totalPrice)}</Typography>
          <Typography  sx={{fontSize: 30, fontWeight: 700, textAlign: "center"}}>Total:{Math.round(totalqty)}</Typography>
          <Button onClick={gotoAddress} variant="contained" sx={{textTransform:"none"}}>Check Out</Button>
      </Box>
    </>
  );
}
