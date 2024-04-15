
import { Typography,Grid,Button,Box } from "@mui/material";
import React from "react";
import { useState,useEffect } from "react";
import {Rating} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom";


export default function Mainpage(){
    const [product,setProduct]=useState([])
    const [value, setValue] = useState(4);
    const imagePath = "https://lilyvaly.com/Backend/public/image/product/";

    const fetchdata=async()=>{
        try{
            const res=await fetch("https://lilyvaly.com/Backend/app/all-product?category=ALL&page=0&price")
            const data=await res.json()
            console.log(data,"0")
            setProduct(data.data)

        }catch(Error){
            console.log(Error)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])

    const handleMouseEnter = (index) => {
        setProduct((prevProduct) => {
            return prevProduct.map((item, i) => {
                if (i === index) {
                    return { ...item, isHovered: true };
                } else {
                    return item;
                }
            });
        });
    }

    const handleMouseLeave = (index) => {
        setProduct((prevProduct) => {
            return prevProduct.map((item, i) => {
                if (i === index) {
                    return { ...item, isHovered: false };
                } else {
                    return item;
                }
            });
        });
    }
   
    

    return(
        <>
           
            <Grid container>
                {product.map((item,index)=>{
                    return(
                        <Grid item md={3} xs={12} sm={2} sx={{p: {lg:2}}}>
                        <Link to={{ pathname: `/oneproduct/${item.slug}`, state: {item} }}>
                            <img  onMouseEnter={()=>handleMouseEnter(index)}
                                onMouseLeave={()=>handleMouseLeave(index)} src={imagePath + item.productimage} style={{width:300,height:400,"&:hover":{border:"1px solid black"}}}></img>
                        </Link>
                        {item.isHovered && (
                            <Button variant="contained" sx={{width:250,textTransform:"none",backgroundColor:"white",color:"black",mt:"-200px",ml:"30px"}}>Add To Cart</Button>
                        )}
                        <Box >
                            <Box sx={{display:"flex",alignItems:"center",gap:15}}>
                                <Typography sx={{fontSize:15,fontWeight:700,color:"black"}}>{item.name}</Typography>
                                <FavoriteBorderIcon />
                            </Box>
                            <Box sx={{display:"flex",alignItems:"center",gap:15}}>
                                <Typography>₹{item.actualprice}</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    
                                />
                            </Box>
                        </Box>
                    </Grid>
                    
                    );
                })}
            </Grid>
        </>
    )
}
