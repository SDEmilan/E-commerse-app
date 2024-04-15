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
import { auth } from "../firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getDatabase,set,ref } from "firebase/database";
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
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
    name: Yup.string()
        .required(" name required")
        .min(6, " minimum 6 chracter")
        .matches(/[A-Z]/, " one capital letter required")
    ,
    email: Yup.string()
        .required("email required")
        .email("invalid email")
        .matches(/@gmail.com/, "must end with @gmail.com"),
    password: Yup.string()
        .required("password required")
        .min(8, "min 8 character")
        .matches(/[A-Z]/, " one capital letter required")
        .matches(/[ ^@&*^]/, " one special character required @&*^"),

    mob: Yup.string()
        .required(" Mob no required")
        // .matches(/^ +91/, "*must start with +91")
        .min(10, " minimum 10 number")
        .max(13, " max 12 number"),
    confirmpassword:Yup.string()
                    .required()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    
                   

});
const notifySuccess = () =>
toast.success("Sign up Sucess...", {
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
  toast.error("Email allready Exist ! Try new", {
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
         const userDetails=await createUserWithEmailAndPassword(auth,values.email,values.password)
         if(userDetails){
          // alert("User Register Sucessfully...")
          notifySuccess()
           setTimeout(()=>{
            Navigate("/loginpage")
           },2000)
         }else{
          notifyWarn()
          setTimeout(()=>{
            Navigate("/")
           },1000)
         } 
      }catch(error){
        // alert(error.message)  
        notifyError()   
      }

    }
    const onsucess=(credentialResponse )=> {
      console.log("jhgfds")
      console.log(credentialResponse);
       if(credentialResponse){
        // alert("sign up sucess...")
        notifySuccess()
            setTimeout(()=>{
              Navigate("/loginpage")
            },3000)
       }else{
      //  alert("Sign up failed try again...")
       notifyError()
       setTimeout(()=>{
        Navigate("/")
      },4000)
    }
    }
    const onerror= (credentialResponse) => {
      console.log('Login Failed');
    }
    
 
    return(
        <>
            
              
               <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",height:"100vh",
                backgroundSize: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor:"#5F5D9C",
                zIndex:0.1
            }}>
                 <Typography sx={{fontSize:25,m:1,position:"absolute",top:10,left:50,color:"white"}}>Sign up Page</Typography>
                  <Box component={"img"} sx={{width:"700px",height:"600px",}} src="https://www.sapphirewebsolutions.com/wp-content/uploads/2019/09/Web-Development-Trends.jpg"></Box>
                  <Box sx={{width:"500px",height:"600px",m:2,mt:-0.5}}>
                      <Formik
                         initialValues={
                              {
                                name:"",
                                email:"",
                                mob:"",
                                password:"",
                                confirmpassword:""
                              }
                         }
                            validationSchema={validationSchema}
                         onSubmit={handlesubmit}

                      >
                        {
                        (props)=>(
                            <Form  >
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",gap:0.5}}>
                            <Box sx={{display:"flex",flexDirection:"column",height:95,}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>User Name</Typography>
                               <Field as={TextField} name="name" sx={{width:"400px",height:"60px"}} 
                                  
                                 error={props.errors.name && props.touched.name}
                               ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="name"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",height:95}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>Email</Typography>
                               <Field as={TextField} name="email" sx={{width:"400px",height:"60px"}} 
                                error={props.errors.email && props.touched.email}></Field>
                             <Typography sx={{color:"red"}}>  <ErrorMessage name="email"></ErrorMessage></Typography>
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"column",height:95}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>Mob</Typography>
                               <Field as={TextField} name="mob" sx={{width:"400px",height:"60px"}}
                                error={props.errors.mob && props.touched.mob} ></Field>
                              <Typography sx={{color:"red"}}> <ErrorMessage name="mob"></ErrorMessage></Typography>
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
                            <Box sx={{display:"flex",flexDirection:"column",height:95}}>
                               <Typography sx={{fontSize:15,fontWeight:700}}>Confirm Password</Typography>
                               <Field as={TextField} name="confirmpassword" sx={{width:"400px",height:"60px"}} 
                                error={props.errors.confirmpassword && props.touched.confirmpassword}></Field>
                               <Typography sx={{color:"red"}}><ErrorMessage name="confirmpassword"></ErrorMessage></Typography>
                            </Box>
                            <Button variant="contained" sx={{width:"400px",textTransform:"none"}} size="large"   onClick={props.handleSubmit}
                                    disabled={!props.isValid 
                                    }> Register</Button>

                       
                           <Root >
                           <Divider  >
                          <Typography sx={{textAlign:"center",fontSize:13,fontWeight:700}}>OR</Typography>
                          </Divider >
                           </Root>
                          {/* </Box> */}
                            <GoogleLogin
                                                
                                                size="large"
                                                width={"400px"}
                                                height={"50px"}
                                               
                            onSuccess={onsucess}
                            onError={onerror}/>
                            <Box>
                              <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:1,mt:2}}>
                              <Typography textAlign={"center"}>If you have Allredy An Account ?</Typography>
                              <Link to={"/loginpage"} style={{textDecoration:"none",color:"green",fontSize:17,mt:-1,fontWeight:700}}> Login here .</Link>
                              </Box>
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