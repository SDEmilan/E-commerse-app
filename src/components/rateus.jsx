
import {Paper,Box,Typography} from "@mui/material";
import { useState } from "react";
import Rating from '@mui/material/Rating';
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import {useNavigate }from "react-router-dom"

export default function Rateus(){
    const [value, setValue] = useState(1);
    const Navigate=useNavigate()
const notifySuccess = () =>
toast.success("Thanks for your response", {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: css({
    background: "#1ab394 !important"
  })
});
       
    return(
        <>
           <Paper elevation={7} sx={{display:"flex",alignItems:"center",justifyContent:"center",mt:30,width:400,height:300,ml:70}}>
           <Box
      sx={{
        '& > legend': { mt: 2 },
        
      }}
    >
      <Typography component="legend" sx={{fontSize:20,fontWeight:700}}>Rate us your Experience...?</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        
            notifySuccess()
         
          setTimeout(()=>{
            Navigate("/mainpage")
          },4000)

        }}
        sx={{fontSize:30,ml:5}}
      />
      
          </Box>
           </Paper>
           <ToastContainer/>
        </>
    )
}