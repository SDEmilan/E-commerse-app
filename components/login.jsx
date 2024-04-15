import { Typography,Box, TextField ,Button} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import "react-toastify/dist/ReactToastify.css";

const Root = styled('div')(({ theme }) => ({
  width: '80%',
 
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
    
  },
}));

export default function Signup(){
    const Navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  var validationSchema = Yup.object().shape({
   
    email: Yup.string()
        .required("*email required")
        .email("*invalid email")
        .matches(/@gmail.com/, "*must end with @gmail.com"),
    password: Yup.string()
        .required("*password required")
        .min(8, "*min 8 character")
        .matches(/[A-Z]/, "* one capital letter required")
        .matches(/[ ^@&*^]/, "* one special character required @&*^"),

   
    
                    
                   

});
const notifySuccess = () =>
toast.success("Login Sucess...", {
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
const notifyError = () => {
  toast.error("Email id & password not match !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: css({
      background: "#ed5565 !important"
    })
  });
};
const notifyWarn = () => {
  toast.warn("Wow a minor warning!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
   })
  }
    const handlesubmit=async(values)=>{

      
        try{
          const userDetails=await signInWithEmailAndPassword(auth,values.email,values.password)
          if(userDetails){
            notifySuccess()
            setTimeout(()=>{
             Navigate("/mainpage")
            },1000)
          }else{
            notifyError()
           Navigate("/loginpage")
          } 
       }catch(error){
         notifyError()    
       }
    }
    const onsucess=(credentialResponse )=> {
      console.log("jhgfds")
      console.log(credentialResponse);
       if(credentialResponse){
        notifySuccess()
            setTimeout(()=>{
              Navigate("/mainpage")
            },4000)
       }else{
       notifyError()
        setTimeout(()=>{
         Navigate("/loginpage")
       },4000)
       }
    }
    const onerror= (credentialResponse) => {
      console.log('Login Failed');
    }
    const login = useGoogleLogin({
      onSuccess: codeResponse =>{
        if(codeResponse){
          notifySuccess()
              setTimeout(()=>{
                Navigate("/mainpage")
              },4000)
         }else{
          notifyError()
          setTimeout(()=>{
           Navigate("/loginpage")
         },4000)
         }
      }
    });
    
 
    return(
        <>
              
               <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",height:"100vh",
                // backgroundImage: `url('https://wallpapercave.com/wp/wp2763957.gif')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor:"#5F5D9C",
                zIndex:0.1
            }}>
                 <Typography sx={{fontSize:25,m:1,position:"absolute",top:10,left:50,color:"white"}}>Log in Page</Typography>
                  <Box component={"img"} sx={{width:"700px",height:"600px",}} src="https://www.sapphirewebsolutions.com/wp-content/uploads/2019/09/Web-Development-Trends.jpg"></Box>
                  <Box sx={{width:"500px",height:"600px",m:2,}}>
                      <Formik
                         initialValues={
                              {
                                
                                email:"",
                               
                                password:"",
                                
                              }
                         }
                        validationSchema={validationSchema}
                        onSubmit={handlesubmit}

                      >
                        {
                        (props)=>(
                            <Form  >
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:0.5,mt:15}}>
                           
                            <Box sx={{display:"flex",flexDirection:"column",height:95}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>Email</Typography>
                               <Field as={TextField} name="email" sx={{width:"400px",height:"60px"}} 
                                error={props.errors.email && props.touched.email}></Field>
                             <Typography sx={{color:"red"}}>  <ErrorMessage name="email"></ErrorMessage></Typography>
                            </Box>
                           
                            <Box sx={{display:"flex",flexDirection:"column",height:95}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>Password</Typography>
                               <Field as={TextField}  name="password" sx={{width:"400px",height:"60px"}} 
                                error={props.errors.password && props.touched.password}
                                   type={showPassword ? 'text' : 'password'}
                                   InputProps={{ 
                                       endAdornment: (
                                         <InputAdornment position="end" >
                                          
                                             {showPassword ? <Visibility   onClick={handleClickShowPassword} sx={{ "& : hover": { "cursor": "grab" } }}/> : <VisibilityOff  onClick={handleClickShowPassword} sx={{ "& : hover": { "cursor": "grab" } }}/>}
                                           
                                         </InputAdornment>
                                       )
                                     }}
                                  
                               ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="password"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:23}}>
                             <Link to={"/resetpassword"} style={{textDecoration:"none"}}> <Typography sx={{"&:hover":{cursor:"grab"},fontSize:15,fontWeight:700,color:"#1C1678"}}>ForgotPassword ?</Typography></Link>
                              <Typography sx={{"&:hover":{cursor:"grab"},fontSize:15,fontWeight:700,color:"#1C1678"}}>Rate us ?</Typography>
                            </Box>
                           
                            <Button variant="contained" sx={{width:"400px",mt:1,textTransform:"none"}} size="large" onClick={props.handleSubmit}
                                    disabled={!props.isValid 
                                    }> Log in</Button>
                            <Root >
                           <Divider  >
                          <Typography sx={{textAlign:"center",fontSize:13,fontWeight:700}}>OR</Typography>
                          </Divider >
                           </Root>  
                           
                            <GoogleLogin
                                               text="Log in with Google"  
                                                size="large"
                                                width={"400px"}
                            onSuccess={onsucess}
                            onError={onerror}/>
 

                          {/* <Button onClick={() => login()} sx={{backgroundColor:"white",color:"black",width:400}} variant="contained">Sign in with Google </Button> */}
                           </Box>
                           <Box>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:1,mt:2}}>
                              <Typography textAlign={"center"}>If you Dont have  An Account ? </Typography>
                              <Link to={"/"} style={{textDecoration:"none",color:"green",fontSize:17,mt:-1,fontWeight:700}}> Signup here .</Link>
                              </Box>
                            </Box>
                       
                         </Form>
                        )
                              
                        }
           
                      </Formik>
                  </Box>
               </Box>
               <ToastContainer/>
        </>
    )
}