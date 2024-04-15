import { Box, Button, FormControl, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa6";
import { CheckBox } from '@mui/icons-material';
import { FaCcAmazonPay } from "react-icons/fa6";


export default function Buynow() {
    const { productId } = useParams();
    const [data,setData] = useState({});
    const [total,setTotal] = useState(99)
    const navigate = useNavigate();
    console.log(productId)
    const location=useLocation()
    const carts=location.state
    console.log(carts,"total")
    

    const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const totalPrice = carts.reduce((acc, item) => acc + item.total, 0);

  
  

//   useEffect (() =>{
//   fetch(`https://fakestoreapi.com/products/${productId}`)
//  .then(res => res.json())
//  .then(data => {
//     console.log(data,"0")
//     setData(data);
//     setTotal(
//       data.price + 99
//      )
    
//   console.log(data)
//  })
//  .catch(err => {
//   console.log(err,"error in fetching")
//  })


//    },[productId])
  
 
   
  // console.log(product.description);const
 function orderClick(){
  navigate("/torazorpay",{state:{total,totalPrice,carts}})
 }

  
  return (
<>

<Box>

       {
       <>
         <Paper elevation={7} sx={{width:{lg:"50%"},height:{lg:"100vh"},ml:{lg:50}}}>
         <Box sx={{ flexGrow: 1 }}>
    
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Payments
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <SearchIcon sx={{ml:{lg:-14}}} />
                <ShoppingCartIcon sx={{ml:4}}/>
                <Typography sx={{mt:-2.5,backgroundColor:"red",borderRadius:"10px",width:"20px"}}>{carts.length}</Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
            <Paper sx={{overflow:"auto",height:200}}>
                 {carts.map((item)=>{

                  return<>
                       <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
                       <Box component={"img"} src={item.image} sx={{height:50,width:100}}></Box>
                       <Typography sx={{width:250,ml:-10}}> 
                        {item.title}
                       </Typography>
                       <Typography sx={{width:20}}>
                        {item.qty}
                       </Typography>
                       <Typography sx={{fontWeight:700}}>
                       ₹ {item.price}
                       </Typography>
                       </Box>
                  </>
                 })}
            </Paper>
          
           <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",gap:0.5}}>
           <Paper elevation={2} sx={{height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",p:{lg:2},mt:-3}}>
            <Box sx={{height:10}}>
              <Typography component={"span"} sx={{mt:3}}>State Bank Of India Credit Card<Typography component={'span'} sx={{color:"blue",fontSize:25}}> <RiVisaFill /></Typography></Typography>
              <Typography textAlign={"center"} sx={{mt:-1}}>437*********674</Typography>
            </Box>
            <Box>
            <FormControl sx={{ml:-3}}>
               <RadioGroup
                >
                <FormControlLabel value="female" control={<Radio />}  label="" name='milan' />
                </RadioGroup>
            </FormControl>
            </Box>

            </Box>
          </Paper>
          <Paper elevation={2} sx={{mt:0,height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Box >
              <Typography component={"span"} >Hdfc bank  Credit Card<Typography component={'span'} sx={{color:"black",fontSize:25}}> <FaCcMastercard /></Typography></Typography>
              <Typography textAlign={"center"} >437******69078</Typography>
            </Box>
            <Box>
            <FormControl sx={{ml:-8,mt:1}}>
            <RadioGroup
            >
      <FormControlLabel value="female" control={<Radio />} label="" name='milan' /> 
    </RadioGroup>
  </FormControl>
            </Box>

            </Box>
          </Paper>
          <Paper elevation={2} sx={{height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",p:{lg:2}}}>
            <Box >
              <Typography component={"span"} sx={{mt:-3}}>Credit/Debit/Atm card</Typography>
              
            </Box>
            <Box>
            <FormControl>
    
    <RadioGroup
   
     
   
    >
      <FormControlLabel value="female" control={<Radio />} label="" name='milan' />
      
    </RadioGroup>
  </FormControl>
            </Box>

            </Box>
          </Paper>
          <Paper elevation={2} sx={{mt:0,height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",p:{lg:2}}}>
            <Box >
              <Typography component={"span"} sx={{mt:-3}}>NetBanking</Typography>
              
            </Box>
            <Box>
            <FormControl>
    
    <RadioGroup
   
     
   
    >
      <FormControlLabel value="female" control={<Radio />} label="" name='milan'/>
      
    </RadioGroup>
  </FormControl>
            </Box>

            </Box>
          </Paper>

          <Paper elevation={2} sx={{height:60,width:"100%"}} >
            <Typography sx={{p:2}}> UPI</Typography>
          <Box sx={{display:"flex",justifyContent:"space-around",mt:-5.5}}>
           <Box sx={{ml:50}}>
            <select>
           <option>UPI Platform</option>
           <option>Amazon pay </option>
           <option>Paytm</option>
           <option>Google pay</option>
            </select>
            </Box>
            <FaCcAmazonPay style={{fontSize:30}}/>
            <Radio sx={{}}></Radio>
           </Box>
          </Paper>
          <Paper elevation={2} sx={{height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",p:2}}>
              <Typography >Price</Typography>
              <Typography>₹ {Math.round(totalPrice)}</Typography>
            </Box>
          </Paper>
          <Paper elevation={2} sx={{height:60,width:"100%"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",p:2}}>
              <Typography >Delivery Charges</Typography>
              <Typography>+  ₹{ total}</Typography>
            </Box>
          </Paper>
          <Paper elevation={2} sx={{height:40,display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}} >
          <Typography sx={{fontSize:20,fontWeight:700}}>Total Amount:{Math.round(totalPrice + total)}</Typography>
            <Button variant='contained' sx={{backgroundColor:"#FB641B"}} onClick={orderClick}>Order Placed</Button>
          </Paper>
            </Box>
         </Paper>

        </>
       }
         


    
</Box>

</>
  )
}
