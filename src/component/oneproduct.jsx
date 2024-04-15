import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Oneproduct = () => {
    const images = [
        { id: 1, url: "https://th.bing.com/th/id/OIP.xung4mlBfvUR3RKzjnRY2AHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        { id: 4, url: "https://th.bing.com/th/id/OIP.xung4mlBfvUR3RKzjnRY2AHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        { id: 2, url: "https://th.bing.com/th/id/OIP.xung4mlBfvUR3RKzjnRY2AHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        {id:3,url:"https://th.bing.com/th/id/OIP.bPBCgvp9N0SUbVYJnBg2IQHaEo?w=227&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}

    ];
    
    const location = useLocation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [hoveredImg, setHoveredImg] = useState(null);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`https://lilyvaly.com/Backend/app/single-product/${id}`);
            const data = await res.json();
             console.log(data.data[0])
            setProduct(data.data[0]);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                {images.map((img, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", mt: 2 }}>
                        <img
                            src={img.url}
                            alt={product ? product.name : ""}
                            onMouseEnter={() => setHoveredImg(img.url)}
                            onMouseLeave={() => setHoveredImg(null)}
                            width="100px"
                            height="100px"
                        />
                    </Box>
                ))}
            </Grid>
            <Grid item xs={6}>
                <img src={hoveredImg || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAGQAlAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/2gAIAQEAAAAA+sAECggAAANswAIHSzmAsCcPexzAAOXuvm56UKDrOzxeT3cuqlB1uo4dZgMrvWmceD6LeUmWOed7tqaXrjd87njkXerenSx0xzgkC1qkyAFKgf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAKAgIQAxAAAAAAAAAigAA566ZAAAMaN5AhU576ZI1AIFSooAAAP//EAC8QAAEEAAMECQQDAAAAAAAAAAEAAgMREjFRISIyQQQQEyAwQlJxkQUjQIEzUHL/2gAIAQEAAT8A/rQLK7Mrs3IivwA4YwOeaLntJAaPlYpCBuj5Umyh47nBrS45BGZoncNu5GC5OLiGkZJmIu2qTi8cxGZrmA0j0R7pp34x9xgZkgCGYfTSZzT3NLztCdLEzjka33NIOaRYNhAg5EHvUqVKlSpRjNNAx5H5XrUeRK6PHLG020GyTxL6j0KfpeDAGCtSoWSsiYwsFhoHEmxSNlke4ABwAFG8lSpUqVd+PMocS5u9kzgcmcIT2tvgTAKypP8AA2lCM8yuzGpWBmhQAB2DkhxZKQW87LOFQU7o0pErpRvb5UX8bP8AITiU1EtJrNCPVBl3RRYR1lyMlITbwTZyRbX2hO7mGoTLtGLEzRfaObQhHA0UImgeyuPINCwRnyD4Qij9IQaBkKCc+iBqo2EF5PMqQbv76yEY7RiPIqnjygrG4ZxlCVnpcP0g+M+YftUOTq9it/1KjtLjsTQKWwKxzKc/OihhJaTyCMg0TnEjvUqCoKhosLdAsLdAsLdAqGioIdZRP43/xAAeEQEAAgICAwEAAAAAAAAAAAABAhEAMBAhICIxgf/aAAgBAgEBPwDbYapklKPnfNmkhEcIREdEoKvtl8X3Xj+5WVlcEQNv/8QAGxEAAQUBAQAAAAAAAAAAAAAAARESMEBBAAL/2gAIAQMBAT8Ar+U2Rx5xgBAyJaH/2Q=="} alt={product ? product.name : ""} style={{ width: "500px", height: "470px" }} />
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: "flex", alignItems: "left", gap: 2, flexDirection: "column" }}>
                    <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                    {product ? product.name : ""}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography>4.9 *</Typography>
                        <Typography>(188 ratings | 345 reviews )</Typography>
                        <Typography>In stock</Typography>
                    </Box>
                    <Box>
                        <Typography>₹{product ? product.category_code : ""}</Typography>
                    </Box>
                    <hr/>
                    <Box>
                        <Button variant="outlined" sx={{ border: "1px solid red", borderRadius: 10 }}> 30 ml<KeyboardArrowDownIcon sx={{ ml: 20 }} /></Button>
                    </Box>
                    <hr/>
                    <Box sx={{ height: 50, width: "400px", display: "flex", alignItems: "center", gap: 4, border: "1px solid gray" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Typography>-</Typography>
                            <Typography>1</Typography>
                            <Typography>+</Typography>
                        </Box>
                        <Button variant="contained" sx={{ backgroundColor: "black", color: "white", width: "150px" }}>Add to Cart</Button>
                        <Button><FavoriteBorderIcon /></Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <LocalShippingIcon />
                        <Typography>free world wide shoping Order above 100$</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <LocalShippingIcon />
                        <Typography>Delivery in 3 days gurantee</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Oneproduct;
