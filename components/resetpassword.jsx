import React from "react";
import {Typography,Box,Button,TextField,Paper} from "@mui/material";
import { Link } from "react-router-dom";
import { ErrorMessage,Formik,Field,Form } from "formik";
import * as Yup from "yup"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";

export default function Resetpassword(){
  const notifySuccess = () =>
toast.success("a password reset link send to your email...!", {
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
    var validationSchema = Yup.object().shape({
        
        email: Yup.string()
            .required("email required")
            .email("invalid email")
            .matches(/@gmail.com/, "must end with @gmail.com"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        sendPasswordResetEmail(auth, values.email)
            .then(() => {
                notifySuccess()
                resetForm();
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    return(
        <>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Paper elevation={7} sx={{mt:30,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:2,width:500,height:300}}>
             <Typography sx={{fontSize:20,fontWeight:700}}>Reset Password</Typography>
             <Formik
               initialValues={
                {
                  email:""
                }
           }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
             >
                  {
                  (props)=>(
                     <Form>
                     <Field  as={TextField} sx={{width:400}} label="Enter email"
                      error={props.errors.email && props.touched.email}
                      name="email"
                     >
                     </Field>
                    <Typography sx={{color:"red"}}><ErrorMessage name="email"></ErrorMessage></Typography>
                     <Button variant="contained" onClick={props.handleSubmit} disabled={!props.isValid} sx={{ml:20,mt:3}}>Reset</Button>

                </Form>
                  )
                  }
             </Formik>
             <Typography>If you Accidentaly clicked..<Link to="/loginpage" style={{textDecoration:"none"}}>go to login</Link></Typography>

           </Paper>
           <ToastContainer/>
          </Box>
             
        </>
    )
}