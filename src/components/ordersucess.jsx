
import { Box,Typography,Button,Paper } from '@mui/material';
import {useNavigate,useLocation} from "react-router-dom";
import React, { useRef } from 'react';
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import Rateus from './rateus';



export default function Order() {
  const location=useLocation()
  const {total,totalPrice,carts}=location.state
  console.log(total)
  console.log(totalPrice)
  console.log(carts)
  const address=JSON.parse(localStorage.getItem("address") )|| []
    const pins=JSON.parse(localStorage.getItem("pin") )|| []
    console.log(address)
    console.log(pins)
  const Navigate=useNavigate()
  const containerRef = useRef(null)
 
  
  const handleDownload = async () => {
    const container = containerRef.current;
    if (container) {
      try {
        // container.style.display = "none"
        await new Promise((resolve) => setTimeout(resolve, 2000))
        html2canvas(container).then((canvas) => {
          const imgLink = canvas.toDataURL();
          const link = document.createElement("a");
  
          link.href = imgLink;
          link.download = "invoice.png";
          link.click();
          setTimeout(()=>{
            notifySuccess();
          },4000)
          setTimeout(()=>{
            Navigate("/torating")
          },7000)
        });
      } catch (error) {
        console.error('Error creating PDF:', error);
      } finally {
        
        container.style.display = "none";
      }
    }
  };
  
  const notifySuccess = () =>
toast.success("Invoice sucessfully downloaded...", {
  position: "top-left",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: css({
    background: "#1ab394 !important"
  })
});
  
  
  return (
<>
<Box sx={{textTransform:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Box  sx={{textTransform:"none",display:"flex",alignItems:"center",flexDirection:"column"}} >
        <Box textAlign={"center"}component={"img"} sx={{width:{lg:800,xs:"100%"}}}src={"https://images.squarespace-cdn.com/content/v1/6209fc508f791e729abec7d0/18641903-a848-4a3a-a0a3-c9e2ddaa15c4/02-lottie-tick-01-instant-2.gif"}></Box>
        <Typography textAlign={"center"} sx={{fontSize:30,color:"green",mt:{lg:-10}}}>0rder placed Sucessfully</Typography>
        <Button variant='contained' sx={{mt:4,textTransform:"none"}} onClick={handleDownload}>Download Invoice</Button>
  </Box>
    <Paper elevation={4} sx={{width:"700px",height:"100vh",display:"block"}} ref={containerRef} >
         
            <Typography sx={{textAlign:"center",fontSize:20,fontWeight:700}}>Your Invoice</Typography>
            <hr/>
                      <Typography textAlign="left"  sx={{fontSize:20,fontWeight:700}}>Your Items</Typography>
              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
              
                  {
                    carts.map((item)=>{
                      return<>
                           <Paper elevation={4} sx={{display:"flex",alignItems:"center",justifyContent:"space-between",overflow:"auto",height:100,width:350,flexWrap:"wrap"}}>
                               <Box component={"img"} src={item.image} sx={{width:50,height:100}}></Box>
                               <Typography sx={{width:200}}>{item.title}</Typography>   
                           </Paper>
                      </>
                    })
                  }
                  <Box>
                    <Box>
                    <Typography>Qty:{carts.length}</Typography>
                  <Typography>Delivery Charges:{total}</Typography>
                  <Typography>Price:{totalPrice }</Typography>
                  <Typography>Total Price:{Math.round(totalPrice + total)}</Typography>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                    <Typography>Date: {new Date().toLocaleDateString()}</Typography>
                    </Box>
                  
               
                 
              </Box>
            </Box>
            <hr/>
            <Typography sx={{fontSize:20,fontWeight:700}}>Your Address</Typography>
            <Typography>Name:Milan Krushna Das Mohapatra</Typography>
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"100px"}}>
          
                  <Box>
                  {
                    address.map((item)=>{
                      return<>
                          <Typography>Landmark:{item.landmark}</Typography>
                          <Typography>Area:{item.area}</Typography>
                          <Typography>Block:{item.block}</Typography>
                          <Typography>Pin:{item.pin}</Typography>
                      </>
                    })
                  }
                  </Box>
                  <Box>
                  {
                    pins.map((item)=>{
                      return<>
                      <Typography>Area:{item.areaName}</Typography>
                          <Typography>State:{item.stateName}</Typography>
                          <Typography>City:{item.city}</Typography>
                          <Typography>District:{item.district}</Typography>
                          <Typography>{item.pincode}</Typography>
                      </>
                    })
                  }
                  </Box>
              </Box>
              <hr/>
              <Box sx={{height:90}}>
                  <Typography>
                  You can contact them by sending an email to neeraj.jain@flipkart.com or visit 
                  them at their registered address Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road,
                   3rd Block, Koramangala Industrial Layout, Bangalore KA IN 560034. FLIPKART INDIA PRIVATE LIMITED 
                   is a Private incorporated on 19-09-2011.
                  </Typography>
              </Box>
              <hr/>
              <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
              <Typography>Thank You For Shopping from flipkart... 😃</Typography>
              <Box component={"img"} src={"data:image/png;base64,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"} sx={{width:200,height:70}}></Box>
              </Box>

       

    </Paper>
    <ToastContainer/>
</Box>
  </>
  )
}
