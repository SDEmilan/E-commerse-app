
import React, { useEffect, useState } from "react"
import { useLocation,useParams } from "react-router";

import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DiscountIcon from '@mui/icons-material/Discount';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarRateIcon from '@mui/icons-material/StarRate';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Navbar from "./navbar";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from "react-toastify";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { auth }from "../firebase/firebaseconfig";

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CarouselSlider from "react-carousel-slider";
import "./Slider.css";
import InputLabel from '@mui/material/InputLabel';
export default function Oneproduct(){
    const Navigate=useNavigate()
    // const [data,setData]=useState([])
    
    const [hovered,setIsHovered]=useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState(null);
    const [carts,setCart]=useState([])  
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [search,setSearch]=useState("")
    const [filterdata,setFilterdata]=useState([])
 
  
      
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const location=useLocation()
    const {id,qty}=location.state
   console.log(qty)
    console.log(qty,"qty")
    console.log(id,"id")
  
        const [hoverimg ,sethoverimg]=useState(null)
        const[data,setData]=useState({}) 
        const[error,setError]=useState("")
        const [totalprice,setTotalprice]=useState(0)
        const price=data.price;
      
       
    const fetchsingaleproduct=async()=>{
        try{
            const data=await fetch(`https://fakestoreapi.com/products/${id}`)
            const finaldata=await data.json()
            

            console.log(finaldata
                )
            setData(finaldata)
          
            
        }catch(error){
            console.error("fetched error")
            setError("Fetched error")
        }
    }
    
    useEffect(()=>{
        const total=qty * data.price
        console.log(total)
        fetchsingaleproduct()
    },[])

    const calculateTotalPrice = () => {
        if (data.price && qty) {
            const totalPrice = Math.round(data.price * qty)
            setTotalprice(totalPrice)
        }
    }
    useEffect(() => {
        
       calculateTotalPrice()
        
    }, [qty,data.price])
    const images = [
        { id: 1, url: "https://th.bing.com/th/id/OIP.IhGijgoVTEs0_4rPuUXboQHaE8?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        { id: 4, url: "https://th.bing.com/th/id/OIP.xung4mlBfvUR3RKzjnRY2AHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        { id: 2, url: "data:image/jpeg;base64,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" },
        {id:3,url:"https://th.bing.com/th/id/OIP.bPBCgvp9N0SUbVYJnBg2IQHaEo?w=227&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}

    ];
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
    
      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };
    
      const gotoCart=()=>{
        Navigate("/gotocart",{state:carts})
      }
      const gotoPayment=()=>{
         notifyWarn1()
      }
      const handleSignOut = async () => {
        try {
          const data=await auth.signOut();
          console.log(data,"signout")
          notifySuccess()
          setTimeout(()=>{

            Navigate("/loginpage")
          },2000)
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
      const notifySuccess = () =>
      toast.success("You Sucessfully sign out...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // className: css({
        //   background: "#1ab394 !important"
        // })
      });
      const notifyWarn = () => {
        toast.warn("Item allready in cart !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // className: css({
          //   background: "#f8ac59 !important"
          // })
        })
        }
        const notifyWarn1 = () => {
            toast.warn("Something went wrong..try again after some time !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              // className: css({
              //   background: "#f8ac59 !important"
              // })
            })
            }
      const addtoCart = (item) => {
        if (carts.some(cartItem => cartItem.id === item.id)) {
          notifyWarn()
        } else {
          setCart([...carts, item]);
        }
      };
      const gotomain=()=>{
        Navigate("/mainpage")
      }
      const menuId = 'primary-search-account-menu';
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      );
    
      const mobileMenuId = 'primary-search-account-menu-mobile';
      const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>)
    return(
        <>
        <AppBar sx={{position:"fixed"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block',"&:hover":{cursor:"grab"} } }}
            onClick={gotomain}
          >
            Shopper App
          </Typography>
      
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={carts.length} color="error">
                <ShoppingCartIcon  onClick={()=>gotoCart(carts)}/>
              </Badge>
            </IconButton>
             <Button variant="contained" onClick={handleSignOut} sx={{width:100,backgroundColor:"gray",textTransform:"none",height:40,mt:0.5}}>Sign out</Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
   
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
        
       {data !== null?
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:3}}>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:3,mt:-335}}>
        <Box >
            {images.map((item)=>{
                return<>
                   <Box sx={{display:"flex",justifyContent:"space-between",gap:"10px",flexDirection:"column",mt:2.5,"&:hover":{border:"5px solid green"}}}>
                        <Box component={"img"} src={item.url} sx={{width:"110px",height:"110px"}}
                        onMouseEnter={()=>sethoverimg(item.url)}
                        onMouseLeave={()=>sethoverimg(null)}
                        ></Box>
                   </Box>
                   
                </>
            })}
        </Box>
        <Box>
                        <Box width={"500px"} height={"420px"} component={"img"} src={hoverimg || data.image}  sx={{mt:2}} ></Box>
                        <Box sx={{ml:{lg:2,xs:2},mt:4}}>
                    <Button 
                     onClick={() => addtoCart(data)}
                     variant="text" sx={{backgroundColor:"#FF9F00",color:"white",fontWeight:700,width:{lg:220,xs:80},height:{lg:60,xs:40},fontSize:{lg:18,xs:10},"&:hover":{
                      backgroundColor:"#FF9F00",
                     
                    }}} ><AddShoppingCartIcon/>Add To Cart</Button>
                 
                   <Button onClick={gotoPayment} variant="text" sx={{backgroundColor:"#FB641B",color:"white",fontWeight:700,width:{lg:220,xs:90},fontSize:{lg:18,xs:10},height:{lg:60,xs:40},ml:2,"&:hover":{
                      backgroundColor:"#FB641B",
                    }}}><FlashOnIcon/>View Simillar</Button>
                    
                    </Box>
        </Box>
        </Box>
      
        <Grid item lg={6} xs={12} md={3} sx={{p:{lg:7},ml:{lg:-6},border:"2px solid gray",boxShadow:"2px 5px 7px gray",width:"740px",mt:10}}>
     
     <Box sx={{display:"flex",}}>
     <Typography  component="div" sx={{marginTop:"20px",fontWeight:900,fontSize:{lg:30,xs:20}}}>
      {data.title}
</Typography>
<Divider sx={{ height: 20,margin:1,ml:2,mt:{lg:4,xs:3},fontSize:70,fontWeight:900,widtgh:"90px"}} orientation="vertical" />
     <Typography variant="subtitle1" component="div" sx={{marginTop:"18px",ml:{lg:2},mt:{lg:3.8,xs:2.7},fontWeight:900}}>
      Category:{data.category}</Typography>
     
 
     </Box>
     <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",}}>
      {data.description}
    </Typography>
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",ml:{lg:-23},mt:{lg:2}}}> <Typography sx={{color:"black"}}><Button variant='text' sx={{backgroundColor:"green",color:"white",height:20}}>4.6<StarRateIcon sx={{fontSize:15,ml:0.5,color:"white"}}/></Button><Typography component={"span"} sx={{ml:1}}>1,607 Ratings & 148 Reviews</Typography></Typography>
    <Box component={"img"} sx={{height:{lg:35,xs:25},width:{lg:150,xs:80},ml:2,mt:{lg:0,xs:-2.5}}}src={"https://www.adgully.com/img/800/68264_fl.png.jpg"}></Box>
    </Box>
   
    <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",fontSize:25,fontWeight:900}}>
     Price:<CurrencyRupeeIcon/> {data.price}
    </Typography>
     <Box sx={{display:'flex',}} >
     <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",fontSize:{lg:17,xs:15},fontWeight:200}}>
    + ₹99 Secured Packaging Fee
    </Typography>
    <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",ml:{lg:2,xs:1},mt:{lg:2.5},fontSize:{lg:18,xs:14},fontWeight:800}}>
     *In Stock: {data.stock}</Typography>
     </Box>
    <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",fontWeight:900}}>
    <DiscountIcon sx={{color:"green"}}/> if you purchace now Extra Off: ₹ {Math.round(data.price % 10 )}</Typography>
     <Typography variant="subtitle1" component="div" sx={{marginTop:"20px",fontWeight:900}}>
      Available Offers
    </Typography>
    <Typography variant="subtitle1" component="div" sx={{marginTop:"20px"}}>
     <DiscountIcon sx={{color:"green",}}/> <Typography component={'span'}>10% off on Axis Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and aboveT&C</Typography></Typography>
     <Typography variant="subtitle1" component="div" sx={{marginTop:"20px"}}>
     <DiscountIcon sx={{color:"green"}}/> <Typography component={'span'}>10% off on Axis Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and aboveT&C</Typography></Typography>
     <Typography variant="subtitle1" component="div" sx={{marginTop:"20px"}}>
     <DiscountIcon sx={{color:"green"}}/> <Typography component={'span'}>10% off on Axis Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and aboveT&C</Typography></Typography>  
     <Typography sx={{color:"green",fontSize:17,ml:{lg:2}}}> View 3 more offers</Typography> 

     <Box sx={{width:{lg:600},height:{lg:200},border:"1px solid gray",mt:{lg:2}}}>
     <FormControl>

<RadioGroup
aria-labelledby="demo-radio-buttons-group-label"
defaultValue="female"
name="radio-buttons-group"
sx={{padding:{lg:3},backgroundColor:"#F5FAFF",width:{lg:"125%"},height:{lg:150}}}
>
<Box sx={{display:"flex"}}>
<FormControlLabel value="female" control={<Radio />} label="Buy With Out Exchange" />
<Typography sx={{ml:{lg:15},mt:{lg:1}}}>₹79,900</Typography>

</Box>
<Divider/>

<Box sx={{display:"flex",}}>
<FormControlLabel value="male" control={<Radio />} label="Buy With Exchange" />
<Typography  sx={{ml:{lg:15},mt:{lg:1}}}>Upto ₹35,900</Typography>

</Box>

<Typography>Get extra ₹3,000 off on exchange of select models</Typography>
<Typography sx={{mt:2,color:"red"}}> Enter pincode to check if exchange is available</Typography>
</RadioGroup>
</FormControl>
</Box>   

<Box sx={{mt:{lg:4}}}>
<Grid container>
<Grid item lg={6} xs={12}>
<Box sx={{display:"flex",justifyContent:"center"}}>
<Typography sx={{color:"#AAAAAC",mt:{lg:2},ml:{lg:20,xs:0}}}>Delivery</Typography>

<Box>
<Box
component="form"
sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,ml:{lg:10,xs:7} }}
>

< LocationOnIcon sx={{color:"#2F74F1"}}/>

<TextField
id="standard-multiline-flexible"
label="Enter delivery address"
multiline
maxRows={4}
variant="standard"
color="success" 
/>
<Typography sx={{color:"#2F74F1"}}>Check</Typography>



</Box>
<Typography sx={{ml:{lg:12,xs:7} }}>Delivery by30 Nov, Thursday|<Typography sx={{ color:"green"}}component={"span"}>Free₹40?</Typography></Typography>

<Typography  sx={{ml:{lg:12,xs:12} }}>if ordered before 7:08 PM</Typography>
<Typography sx={{color:"green", ml:{lg:11,xs:18}}}>View Details</Typography>
</Box>

</Box>
</Grid>




</Grid>

<Grid container sx={{mt:{lg:0,xs:3}}}>
<Grid item lg={6} xs={12}>
<Box sx={{display:"flex",justifyContent:"space-around",mt:{lg:3},color:"#AAAAAC"}}> <Typography>Highlights</Typography>
<Box sx={{ml:{lg:7},color:"black"}}>
<Typography component={"ul"}>
<Typography component={"li"}>128 GB ROM


</Typography>
<Typography component={"li"}>15.49 cm (6.1 inch) Super Retina XDR Display</Typography>
<Typography component={"li"}>48MP + 12MP | 12MP Front Camera</Typography>
<Typography component={"li"}>A16 Bionic Chip, 6 Core Processor Processor</Typography>
</Typography>
</Box></Box>
</Grid>
<Grid item lg={6} xs={12} sx={{mt:{lg:0,xs:3}}}>
<Box sx={{display:"flex",justifyContent:"space-around",mt:{lg:3},color:"#AAAAAC"}}> <Typography>Payment Options</Typography>
<Box sx={{ml:{lg:7},color:"black",width:500}}>
<Typography component={"ul"}>
<Typography component={"li"}>
No cost EMI starting from ₹13,317/month

</Typography>
<Typography component={"li"}>Cash on Delivery</Typography>
<Typography component={"li"}>Net banking & Credit/ Debit/ ATM card</Typography>
<Typography sx={{color:"green"}}>View Details</Typography>
</Typography>
</Box></Box>
</Grid>
</Grid>

</Box> 
<Grid container>
<Grid item lg={6} sx={{mt:2}}>

<Box component={"img"} sx={{width:{lg:300,xs:"100%"},ml:{lg:-3,xs:0}}}src={"https://storiesflistgv2.blob.core.windows.net/stories/2019/07/SuperCoins_Main_Banner_.jpg"}></Box>

</Grid>
<Grid item lg={6} sx={{mt:6,ml:{lg:0}}}>
<Typography > In every Purchase you got bumper amount of discount <Typography sx={{textAlign:'center',color:"green"}}>10% extra in with axis bank card</Typography></Typography>
</Grid>
</Grid>
<Grid container>
<Grid item lg={3} sx={{mt:2}}>

<Typography sx={{color:"grey"}}>Description</Typography>
</Grid>
<Grid item lg={9} sx={{mt:3,ml:{lg:0}}}>
<Typography > The T2 Pro 5G smartphone features a 3D curved AMOLED screen providing a bright display with a peak brightness of 1300 nits. Improve your performance with the MediaTek Dimensity 7200 processor. Powered with a 64 MP main camera with OIS and a night camera with Aura Light, keep clicking stunning pictures all day and night. This smartphone is slim, lightweight and boasts a premium design with AG glass back cover. Available in 8 GB+8 GB RAM, and ROM fused together with an optimised algorithm, you can easily use around 27 apps simultaneously. Powered by a 4600 mAH large battery, you can quickly boost your phone’s charge with the 66 W Flash Charge.</Typography>
</Grid>
</Grid>
<Box sx={{mt:{lg:4}}}>
<Grid container>
<Grid item lg={12}><Typography sx={{fontSize:25,border:"2px solid gray",fontWeight:900,mt:{lg:0,xs:3},ml:{lg:0,xs:4}}}>Product Description</Typography></Grid>
<Grid item lg={4}>
<Box component={"img"} sx={{width:200,ml:{lg:-3,xs:7},p:{lg:2}}}src={"https://rukminim2.flixcart.com/image/200/200/cms-rpd-img/af0f9e1e23c042ce9d8f27b02bb996d3_18a8cacbaad_HighlyDurable.jpeg?q=90"}></Box>
</Grid>
<Grid item lg={8} sx={{p:{lg:3},mt:{lg:-2,xs:2}}}>
<Typography sx={{fontSize:{lg:20,fontWeight:700}}}>
3D Curved AMOLED Display</Typography>
<Typography sx={{mt:{lg:2}}}>T2 Pro 5G features a 3D curved AMOLED screen with 120 Hz refresh rate. T2 Pro 5G can cover 100% cinema-grade DCI-P3 Color Gamut, providing full and bright color display, comparable to professional cinema-grade image quality. A maximum local peak brightness of 1300 nits. This allows for clear visibility even in direct sunlight.</Typography>
</Grid>
</Grid>


</Box>
<Box sx={{mt:{lg:4}}}>
<Grid container>


<Grid item lg={8} sx={{p:{lg:3},mt:{lg:-2,xs:2}}}>
<Typography sx={{fontSize:{lg:20,fontWeight:700}}}>
Extreme Performance with MTK D7200</Typography>
<Typography sx={{mt:{lg:2}}}>The all-new MediaTek Dimensity 7200 is a powerful 4 nm chipset. Built on the flagship-grade TSMC 2nd generation 4 nm process, aiming for a score of 7,20,000+ to deliver superior energy efficient performance.</Typography>
</Grid>
<Grid item lg={4}>
<Box component={"img"} sx={{width:200,ml:{lg:3,xs:8},p:{lg:2}}}src={"https://rukminim2.flixcart.com/image/200/200/cms-rpd-img/2a68bc53a5b740068a62b8140a19770e_18a8cada497_1.jpeg?q=90"}></Box>
</Grid>
</Grid>
<Grid container sx={{mt:{lg:0,xs:3}}}>
<Grid item lg={12} xs={12}>
<TableContainer component={Paper}>
<Table sx={{ minWidth:{lg:550,xs:"100%"} }} aria-label="caption table">

<TableHead>
<TableRow>
<TableCell sx={{fontSize:{lg:30},fontWeight:{lg:900},height:{lg:50}}} colSpan={5}>Specification</TableCell>

</TableRow>
</TableHead>
<TableBody>

<TableRow>
<TableCell component="th" scope="row">
In The Box
</TableCell>
<TableCell align="left" sx={{ml:{lg:-65}}}>Handset, USB C Charge Cable (1m), Documentation</TableCell>








</TableRow>
<TableRow>
<TableCell component="th" scope="row">
Model Number
</TableCell>
<TableCell align="left">MTP43HN/A</TableCell>



</TableRow>

<TableRow>
<TableCell component="th" scope="row">
Model Name
</TableCell>
<TableCell align="left">iPhone 15</TableCell>





</TableRow>

<TableRow>
<TableCell component="th" scope="row">
Color
</TableCell>
<TableCell align="left">Blue</TableCell>



</TableRow>
<TableRow>
<TableCell component="th" scope="row">
Browse Type
</TableCell>
<TableCell align="left">Smartphones</TableCell>






</TableRow>
<TableRow>
<TableCell component="th" scope="row">
SIM Type
</TableCell>
<TableCell align="left">Dual Sim(Nano + eSIM)</TableCell>




</TableRow>
<TableRow>
<TableCell sx={{fontSize:{lg:20},fontWeight:{lg:900},color:"green",height:{lg:50}}} colSpan={5}>View more</TableCell>

</TableRow>





</TableBody>
</Table>
</TableContainer>

</Grid>
</Grid>



</Box>

<Paper sx={{width:"100%",height:{lg:300},mt:{lg:2,xs:4}}} elevation={5}>
<Box sx={{display:"flex",justifyContent:"space-around",p:{lg:2} ,mt:{lg:0,xs:2}}}>
<Typography sx={{fontSize:{lg:25,fontWeight:800}}}>Ratings & Reviews</Typography>
<Button variant='outlined'sx={{color:'black',boxShadow:"2px 4px gray",border:"1px solid gray"}} >Rate Products</Button>
</Box>
<Grid container sx={{mt:{lg:5,xs:5}}}>

<Grid item lg={3}xs={12}>
<Typography sx={{color:'black',fontSize:{lg:30},fontWeight:800}} textAlign={"center"}>
4.9 <Typography component={"span"}>< StarRateIcon /></Typography>
</Typography>
<Typography textAlign={"center"}>11,632 Ratings & 
</Typography>
<Typography  textAlign={"center"}>150 Reviews</Typography>
</Grid>

<Grid item lg={4} xs={12} sx={{mt:{lg:0,xs:4}}}>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Typography sx={{color:'black',fontSize:{lg:15},fontWeight:800}} >5★</Typography>
<progress value={95} max={100}></progress>
<Typography>3,780</Typography>
</Box>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Typography sx={{color:'black',fontSize:{lg:15},fontWeight:800}} >4★</Typography>
<progress value={70} max={100}></progress>
<Typography>2,780</Typography>
</Box>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Typography sx={{color:'black',fontSize:{lg:15},fontWeight:800}} >3★</Typography>
<progress value={40} max={100}></progress>
<Typography>2,780</Typography>
</Box>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Typography sx={{color:'black',fontSize:{lg:15},fontWeight:800}} >2★</Typography>
<progress value={27} max={100}></progress>
<Typography>1,280</Typography>
</Box>
<Box sx={{display:"flex",justifyContent:"space-around"}}>
<Typography sx={{color:'black',fontSize:{lg:15},fontWeight:800}} >1★</Typography>
<progress value={10} max={100}></progress>
<Typography>1,080</Typography>
</Box>

</Grid>

<Divider orientation="vertical" variant="middle" sx={{height:120,ml:{lg:2}}} />
<Grid item lg={4} xs={12} sx={{mt:{lg:0,xs:-13}}}>
<Box sx={{display:"flex",justifyContent:"space-between",p:{lg:3}}}>
<Box >
<CircularProgress variant="determinate" value={75} sx={{width:{lg:150}}}/>
<Typography position='absolute' sx={{mt:{lg:-4,xs:-4},fontSize:{lg:15},ml:{lg:0.5,xs:0.5}}}>{75}%</Typography>
<Typography>Display</Typography>
</Box>
<Box sx={{ml:2}}>
<CircularProgress variant="determinate" value={75} sx={{width:{lg:150}}}/>
<Typography position='absolute' sx={{mt:{lg:-4,xs:-4},fontSize:{lg:15},ml:{lg:0.5,xs:0.5}}}>{65}%</Typography>
<Typography>Battery</Typography>
</Box>
<Box sx={{ml:3}}>
<CircularProgress variant="determinate" value={85} sx={{width:{lg:150}}}/>
<Typography position='absolute' sx={{mt:{lg:-4,xs:-4},fontSize:{lg:15},ml:{lg:0.5,xs:0.5}}}>{95}%</Typography>
<Typography>Camera</Typography>
</Box>


</Box>


</Grid>


</Grid>

</Paper>




</Grid>



    </Box>
       
       :<><Typography>{error}</Typography></>}
       <ToastContainer/>
        </>
    )
}