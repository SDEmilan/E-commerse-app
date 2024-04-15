import React, { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";

const Razorpay = () => {
  const [Razorpay, isLoaded] = useRazorpay();
  const location = useLocation();
  const Navigate=useNavigate()
  const { total, totalPrice,carts } = location.state;
  console.log(total)
  console.log(totalPrice)
  console.log(carts)
  const notifySuccess = () =>
toast.success("Order placed Sucessfully...", {
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

  useEffect(() => {
    if (isLoaded) {
      const options = {
        key: "rzp_test_HJG5Rtuy8Xh2NB",
        amount: (total + totalPrice) * 100,
        name: "Milan Shop",
        description: "some description",
        image: "https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s900-c-k-c0x00ffffff-no-rj",
        handler: function (response) {
          console.log(response.razorpay_payment_id);
          notifySuccess()
         setTimeout(()=>{
          Navigate("/ordersucess",{state:{total,totalPrice,carts}})
         },1000)
        },
        prefill: {
          name: "Gaurav",
          contact: "9999999999",
          email: "demo@demo.com",
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "#F37254",
          hide_topbar: false,
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
      
    }
  }, [isLoaded, Razorpay, total, totalPrice]);

  return (
    <>
    <ToastContainer/>
    </>
  );
};

export default Razorpay;
