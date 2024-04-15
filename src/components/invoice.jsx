import React from "react";
import {Typography} from "@mui/material";
import {useLocation} from "react-router";
export default function Invoice(){
    const location=useLocation()
    const {total,totalPrice,carts}=location.state
    console.log(total)
    console.log(totalPrice)
    console.log(carts)
    const address=JSON.parse(localStorage.getItem("address") )|| []
    const pin=JSON.parse(localStorage.getItem("pin") )|| []
    console.log(address)
    console.log(pin)

        return(
        <>
            <Typography>Your Invoice</Typography>
        </>
    )
}