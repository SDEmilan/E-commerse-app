import { Typography,Paper,Box,Button,TextField, } from "@mui/material";
import React from "react";
import Pincode from "react-pincode";
import { useState } from "react";
import Input from '@mui/material/Input';
import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from "yup";
import {Navigate, useLocation} from "react-router"
import {Checkbox} from '@mui/material';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ariaLabel = { 'aria-label': 'description' };


export default function Addaddress(){
  const Navigate=useNavigate()
    const [pincodeData, setPincodeData] = useState('');
    const location=useLocation()
    const cartData=location.state
    console.log(cartData)
    var validationSchema = Yup.object().shape({
        landmark: Yup.string()
            .required(" landmark required")
            
        ,
        area: Yup.string()
            .required("area required"),
        

    
        pin: Yup.string()
            .required(" pin no required"),
        block:Yup.string()
        .required("block required")    
         
      
                        
                       
    
    });
    const notifySuccess = () =>
    toast.success("Address aded sucessfully...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: css({
        background: "#1ab394 !important"
      })
    });
    const handlesubmit = (values) => {
        console.log(values)
        const localData = JSON.parse(localStorage.getItem("address")) || [];
        const finalData = [...localData, values];
        localStorage.setItem("address", JSON.stringify(finalData));
        notifySuccess()
        const localpin = JSON.parse(localStorage.getItem("pin")) || [];
        const pincode = [...localpin, pincodeData];
        localStorage.setItem("pin", JSON.stringify(pincode));
        setTimeout(()=>{
          Navigate("/toaddress",{state:cartData})
        },2000)
        console.log(pincode)
       
    };

    
    return(
        <>

             <Box >
                <Paper elevation={7} sx={{width:"100%",height:"100vh" ,display:"flex",alignItems:"center",justifyContent:"space-around",flexDirection:"column"}}>
                
                
 
                <Box >
                <Typography sx={{textAlign:"center",fontSize:20,fontWeight:700}}>Add Pin </Typography>
                <Pincode
        pincodeInput={{width:400,height:"40px",marginBottom:"10px"}}
      
      cityInput={{width:'400px',height:"40px",marginBottom: '10px'}}
      areaInput={{width:'400px',height:"40px",marginBottom: '10px'}}
      stateInput={{width:'400px',height:"40px",marginBottom: '10px'}}
      districtInput={{width:'400px',height:"40px",marginBottom: '10px'}}
    
        invalidError="Please check pincode"
        lengthError="check length"
        getData={(data) => setPincodeData(data)}
      />
                </Box>
                <Typography sx={{fontSize:20,fontWeight:700}}>or</Typography>  
                <Box>
                    <Typography sx={{textAlign:"center",fontSize:20,fontWeight:700}}>Add address maually</Typography>
                    
                       
                        
                       
                    <Formik
                         initialValues={
                              {
                                landmark:"",
                                area:"",
                                pin:"",
                                block:""
                              
                              }
                         }
                            validationSchema={validationSchema}
                         onSubmit={handlesubmit}

                      >
                        {
                        (props)=>(
                            <Form  >
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:0.5}}>
                            <Box sx={{display:"flex",flexDirection:"column",height:60,}}>
                               
                               <Field as={TextField} label="* Your landmark" variant="standard" size="small" name="landmark" sx={{width:"400px",height:"40px"}} 
                                  
                                 error={props.errors.landmark && props.touched.landmark}
                               ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="landmark"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",height:60}}>
                               
                               <Field as={TextField} variant="standard" label="* Your Area" name="area" size="small" sx={{width:"400px",height:"40px"}} 
                                error={props.errors.area && props.touched.area}></Field>
                             <Typography sx={{color:"red"}}>  <ErrorMessage name="area"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",height:60}}>
                               
                               <Field as={TextField} variant="standard" label="* Your Block"  size="small" name="block" sx={{width:"400px",height:"40px"}}
                                error={props.errors.block && props.touched.block} ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="block"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",height:60}}>
                               
                               <Field as={TextField} variant="standard" label="* Your Pin" size="small" name="pin" sx={{width:"400px",height:"40px"}}
                                error={props.errors.pin && props.touched.pin} ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="pin"></ErrorMessage></Typography>
                            </Box>
                            
                          
                            <Button  variant="contained" sx={{width:"400px",textTransform:"none"}} disabled={!props.isValid}   onClick={props.handleSubmit}
                                    > Add Address</Button>

                       
                          
                           </Box>
                       
                         </Form>
                        )
                              
                        }
           
                      </Formik>
                       
                        </Box>
                        {/* <Box>
                       <Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700}}>Your Items</Typography>
                         <Paper sx={{overflow:"auto",display:"flex",alignItems:"center",justifyContent:"space-between",width:550,height:300,flexDirection:"column"}}>
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
                   </Box> */}
  
                </Paper>
             </Box>
             <ToastContainer/>
        </>
    )
}