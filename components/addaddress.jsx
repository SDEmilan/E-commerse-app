import {Typography,Box,Paper,Button} from "@mui/material";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router";
import {Navigate, useLocation} from "react-router"
import {Checkbox} from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Address(){
    const [selectedValue, setSelectedValue] = useState('');
    const [pin,setPin]=useState([])
    // const [address,setAddress]=useState([])
    const location=useLocation()
    const cartData=location.state
    const Navigate=useNavigate()
      const address=JSON.parse(localStorage.getItem("address")) || []
      // setAddress(addres)
      // console.log(address.map((item)=>item))
      const pins=JSON.parse(localStorage.getItem("pin")) || []
      // setPin(pins)
      // console.log(pins)
      const handleChange = (event) => {
        console.log(event.target.value)
        // setSelectedValue(event.target.value);
        // console.log(selectedValue)
      };
      const gotoaddAddress=()=>{
        alert("clicked")
        Navigate("/gotoaddress")
      }
      const totalPrice = cartData.reduce((acc, item) => acc + item.total, 0);
      const gotoPayment=()=>{
        Navigate("/buynow",{state:cartData})
      }
    return(
        <>
          <Typography sx={{fontSize:30,fontWeight:700,textAlign:"center"}}>Your Address</Typography>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,flexDirection:"column",mt:5}}>
        
        <Paper sx={{width:600,height:200,overflow:"auto"}}>
        <Typography  sx={{fontSize:20,fontWeight:700,textAlign:"center"}}>Manual Address</Typography>
        {address.map((item)=>{
           return<>
                  
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                  <Radio
                  //  checked={selectedValue === 'a'}
                   onChange={handleChange}
                   value={address}
                  name="radio-buttons"
                   inputProps={{ 'aria-label': 'A' }}
                   sx={{mt:-9}}
/>
                   <Box sx={{width:200}}>
                      
                      <Typography sx={{fontWeight:700}}>Landmark:{item.landmark}</Typography>
                      <Typography>Near Area:{item.area}</Typography>
                      <Typography>Block:{item.block}</Typography>
                      <Typography>pin:{item.pin}</Typography>
                   </Box>
                   <Button sx={{backgroundColor:"red",textTransform:"none",color:"white",mt:-7}}> Remove<DeleteForeverIcon/></Button>
                  </Box>
                 
           </>
       })}

        </Paper>
        <Paper sx={{width:600,height:200,overflow:"auto"}}>
        <Typography  sx={{fontSize:20,fontWeight:700,textAlign:"center"}}>Pin Address</Typography>
        {pins.map((item)=>{
           return<>
                               <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                  <Radio
                  //  checked={false}
                   onChange={handleChange}
                   value={pins}
                   name="radio-buttons"
                   inputProps={{ 'aria-label': 'A' }}
                   sx={{mt:-11}}
/>
                  
           
             

                   <Box sx={{width:200}}>
                     
                      <Typography>Area Name:{item.areaName}</Typography>
                      <Typography>City:{item.city}</Typography>
                      <Typography>Districe:{item.district}</Typography>
                      <Typography>pin:{item.pincode}</Typography>
                      <Typography>State:{item.stateName}</Typography>

                   </Box>
               <Button sx={{backgroundColor:"red",textTransform:"none",color:"white"}}> Remove<DeleteForeverIcon/></Button>
               </Box>
           </>
       })}
        </Paper>
        <Button variant="contained" sx={{backgroundColor:"black",color:"white",textTransform:"none"}} onClick={gotoaddAddress}>Addnew address</Button>
     </Box>
     <Box>
                  <Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700}}>Your Items</Typography>
                    <Paper sx={{overflow:"auto",display:"flex",alignItems:"center",justifyContent:"space-between",width:650,height:300,flexDirection:"column"}}>
                         {cartData.map((item)=>{
                           return<>
                                <Paper elevation={6} sx={{display:"flex",alignItems:"center",justifyContent:"space-between",height:100,gap:10, width:"100%",mt:0.5}}>
                                <Box component={"img"} sx={{width:100,height:100}} src={item.image}></Box>
                              <Box>
                              <Typography>Qty:{item.qty}</Typography>
                              <Typography>Price:{Math.round(item.price)}</Typography>
                              <Typography>Total:{Math.round(item.total)}</Typography>

                               </Box> 
                               <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                               <Checkbox {...label} defaultunChecked />
                                   <Typography>add to wish list</Typography>
                               </Box>
                                </Paper>
                           </>
                         })}
                    </Paper>
                   <Box sx={{display:"flex",alaignItems:"center",justifyContent:"space-around",mt:2}}>
                   <Typography  sx={{fontSize: 30, fontWeight: 700, textAlign: "center"}}>Total Price: {Math.round(totalPrice)}</Typography>
                   <Button variant="contained" sx={{textTransform:"none"}} onClick={gotoPayment}>Go To Payment</Button>
                   </Box>
              </Box>
          </Box>
        </>
    )
}