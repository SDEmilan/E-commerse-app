import { Typography,Box,Divider,Button, Paper } from "@mui/material"
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
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
import { ToastContainer, toast } from "react-toastify";
import CarouselSlider from "react-carousel-slider";
import "./Slider.css";
import InputLabel from '@mui/material/InputLabel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import { auth }from "../firebase/firebaseconfig";
import Footer from "./foter";
import img from "../assets/flip.img.png"

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Mainpage(){
    const Navigate=useNavigate()
    const [data,setData]=useState([])
    const [isClicked, setIsClicked] = useState(false);
    const [hovered,setIsHovered]=useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState(null);

   
    const [category, setCategory] = useState("");
    const [open, setOpen] = useState(false);
    const [search,setSearch]=useState("")
    const [filterdata,setFilterdata]=useState([])
    const [carts,setCart]=useState([])
    const [fav,setFav]=useState([])
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(filterdata.map(() => false));
  
    const handleChange = (event) => {
      const selectedCategory = event.target.value;
      setCategory(selectedCategory)
    
      if (selectedCategory === 'All') {
        setFilterdata(data);
      } else {
        const filteredData = data.filter(item => {
          if (selectedCategory.includes('-')) {
            const [min, max] = selectedCategory.split('-').map(Number);
            return item.price >= min && item.price <= max;
          } else {
            return item.category === selectedCategory;
          }
        });
        setFilterdata(filteredData);
      }
    };
    
  useEffect(() => {
    
    setTimeout(() => {
      setFilterdata(data);
      setLoading(false);
    }, 1000); 
  }, []);
    useEffect(()=>{
      setTimeout(()=>{
        setFilterdata(data)
      },1000)
      Load()
    },[data])
    const valueChange=(e)=>{
      const searchtext=e.target.value
      setSearch(searchtext)
      switch(search) {
        case "search":
          setFilterdata( data. filter((item)=>item.description && item.title. toLowerCase().includes(search. toLowerCase())))
        default:
          setFilterdata( data. filter((item)=>item.description && item.title.toLowerCase().includes(search.toLowerCase())))
        break;
        }
    }
      
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let img = [
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/3376/560/image/7760adba4cdde874.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/90cdb794821102c8.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/3376/560/image/374a88846acf16b2.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/e3e5625077962405.jpg?q=50",
      },
      {
        imgSrc:
          "https://rukminim1.flixcart.com/flap/1688/280/image/9684c5bba6b14e7f.jpg?q=50",
      },
    ];
 
    let manner = {
      autoSliding: { interval: "3s" },
      circular: true,
    };
    const toggleFavorite = (index,item) => {
      setFavorites((prevFavorites) => {
        if (fav.some(favItem => favItem.id === item.id)) {
          notifyWarn()
        } else {
          setFav([...fav, item]);
          notifySuccess1()
        }
        const newFavorites = [...prevFavorites];
        newFavorites[index] = !newFavorites[index];
        return newFavorites;
       
      });
    };

    let accEleSetting = { dots: true };

    let buttonSetting = {
      placeOn: "middle-inside",
      style: {
        left: {
          height: "100px",
          width: "60px",
          color: "black",
          margin: "0",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
        right: {
          height: "100px",
          width: "60px",
          color: "balck",
          margin: "0",
          fontSize: "30px",
          background: "white",
          opacity: "1",
        },
      },
    };

   
  
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
      </Menu>
    );
           const fetchproduct=async()=>{
                   try{
                    const data=await fetch("https://fakestoreapi.com/products")
                    console.log(data,"0000000000000000000000")
                   const finalData=await data.json()
                   console.log(finalData,"0")
                   setData(finalData)
                   const initialQty = {};
                   finalData.forEach((item) => {
                    initialQty[item.id] = 1;
                  });
                  // setQty(initialQty);
                   }catch(error){
                     console.error("fetched error,Error")
                   }finally{
                    console.log("fethced sucessfull")
                   }
           }
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
        const notifySuccess1 = () =>
        toast.success("Item add in wishlist...!", {
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
        const notifySuccess2 = () =>
        toast.success("Item add in Cart...!", {
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
        const notifyError = () => {
          toast.error("Item allready in cart !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // className: css({
            //   background: "#ed5565 !important"
            // })
          });
        };
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
          useEffect(()=>{
            fetchproduct()
          },[])
          const btnShow=(index)=>{
              setIsHovered(index)
                   
        }
        const btnHide=(index)=>{
            
             setIsHovered(null)
              
        }
        const gotoOneproduct=(id)=>{
            Navigate(`/oneproduct/${id}`, { state: { id} })
          //  setCart([...carts,item])

        }
        const addtoCart = (item) => {
          if (carts.some(cartItem => cartItem.id === item.id)) {
            notifyWarn()
          } else {
            setCart([...carts, item]);
            notifySuccess2()
          }
        };

        const Load=()=>{
          return <Typography sx={{alignItems:"center"}}> Loading....</Typography>
        }
    
        
        const gotoCart=()=>{
          Navigate("/gotocart",{state:carts})
        }
        const gotoFav=()=>{
          Navigate("/tofav",{state:fav})
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
       


    return(
        <>
         <Box sx={{ flexGrow: 1 }}>
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
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Shopper App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={valueChange}
              value={search}
            />
          </Search>
          <FormControl sx={{ m: 1, width: 320 ,backgroundColor:"#7AB0E5",borderRadius:1}} 
             >
        <InputLabel id="demo-controlled-open-select-label" sx={{mt:-1,color:"#D9EDBF",fontWeight:400}}>Search By Category or Price...</InputLabel>
        <Select
            
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
            height:39,
            color:"white"
        }}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          label="Age"
          onChange={handleChange}
         
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value={"women's clothing"}>Womens Wear</MenuItem>
          <MenuItem value={"men's clothing"}>Mens Wear</MenuItem>
          <MenuItem value={"electronics"}>Electronics</MenuItem>
          <MenuItem value={"jewelery"}>Jewellery</MenuItem>
          <MenuItem value={"10 - 100"}>₹ 10 - ₹ 100</MenuItem>
          <MenuItem value={"100-500"}>₹ 100 - ₹ 500</MenuItem>
          <MenuItem value={"500-1000"}> ₹ 500 - ₹ 1000</MenuItem>
        </Select>
      </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={fav.length} color="error">
                <FavoriteIcon   onClick={()=>gotoFav(fav)}/>
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={carts.length} color="error">
                <ShoppingCartIcon  onClick={()=>gotoCart(carts)}/>
              </Badge>
            </IconButton>
             <Button variant="contained" onClick={handleSignOut} sx={{width:100,backgroundColor:"#F1C40F",textTransform:"none",height:40,mt:0.5}}>Sign out</Button>
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
      {renderMobileMenu}
      {renderMenu}
    </Box>
  
         <Divider sx={{width:"100%",mt:4}}></Divider>
         <div className="offers_container">
        <div className="offer_slider">
          <CarouselSlider
            slideItems={img}
            manner={manner}
            accEle={accEleSetting}
            buttonSetting={buttonSetting}
            sliderBoxStyle={{
              width: "100%",
              height: "390px",
              background: "#FDA403",
              // margin: "0 0 0 10px",
              marginTop:"35px" 
            }}
            itemsStyle={{ padding: "0px", margin: "20px 0px 20px 0px" }}
          />
        </div>
    
      </div>
         <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:2,mt:2,height:"100v0h"}}>
          
  {loading ?(
       <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:2,ml:90}}>
            <Typography>Loading...</Typography>
            <CircularProgress/>
        </Box>
  ):  filterdata.length > 0 ? (
    <>
   {filterdata.map((item, index) => {
     return (
       <>
         <Paper elevation={6} sx={{ width: "320px", height: "400px", border: "2px solid gray" }}>
            {/* <FavoriteIcon sx={{color:"red",fontSize:25,ml:33,mt:3}} onClick={addTowishlist}/> */}
            <IconButton onClick={() => toggleFavorite(index)}>
           {favorites[index] ? (
             <FavoriteIcon sx={{ color: 'green', fontSize: 25, ml: 33, mt: 3 }} />
           ) : (
             <FavoriteIcon sx={{ color: 'red', fontSize: 25, ml: 33, mt: 3 }} />
           )}
         </IconButton>
           <Box sx={{ p: 2, display: "flex", alignItems: "center", flexDirection: "column" }} onMouseLeave={() => btnHide(index)} onMouseEnter={() => btnShow(index)}>
             <Link to={`/oneproduct:${item.id}`}>
               <Box component={"img"} src={item.image} width="200px" height="200px" sx={{ mt:-3,borderRadius: "10px", "&:hover": { width: "200.5px", height: "200.5px", boxShadow: "0px 0px 4px 0px" } }}></Box>
             </Link>
             <Box sx={{ height: "110px" }}>
               <Typography sx={{ width: "200px", overflow: "auto", textAlign: "center" }}>{item.title}</Typography>
               <Typography sx={{ textAlign: "center",fontWeight:700 }}>Price: ₹{item.price}</Typography>
             </Box>
             <Box sx={{ mt: -4, display: "flex", alignItems: "center", justifyContent:"space-around", gap: 1 }}>
               <Button
                 variant="contained"
                 onClick={() => addtoCart(item)}
                 sx={{
                   textTransform: "none",
                   backgroundColor: "black",
                   color: "white",
                   width: 130
                 }}
               >
                 Add To Cart
               </Button>
               <Button
                 variant="contained"
                 onClick={() => gotoOneproduct(item.id)}
                 sx={{
                   textTransform: "none",
                   backgroundColor: "black",
                   color: "white",
                   width: 130
                 }}
               >
                 Try Now
               </Button>
             </Box>
           </Box>
         </Paper>
       </>
     );
   })}
 </>
) 
       : (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",ml:70}}>
         <Box component={"img"} sx={{width:400,height:400}} src={"data:image/png;base64,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"}></Box>
         <Typography sx={{color:"red",fontSize:15,fontWeight:700}}>Sorry, no product found. Please try something else.</Typography>
    </Box>
           )}

        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:2,width:"100%",height:"350px"}}>
          <Box component={"img"} sx={{height:300,width:300}} src={"https://mnamin24.github.io/gifer-gif-animated-banner-template/images/300x600.gif"}></Box>
          <Box component={"img"} src={"https://blog.dikazo.com/wp-content/uploads/2021/10/Discount-mobile-app.gif"} height={300} width={"100%"}></Box>
        </Box>

         </Box>
         <Footer/>
         <ToastContainer/>
            
        </>
    )
}