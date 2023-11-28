import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useContext } from "react";
import Checkout from "../Checkout/Checkout";
// import {loadStripe} from "@stripe/stripe-js"
import { makepaymentrequest } from "../../utils/api";

import { Navigate, useNavigate } from "react-router-dom";
import "./Cart.scss";
const Cart = ({ setshowcart }) => {
  const {cartsubtotal,setCartsubtotal,cartItems,cartsubtotalgst,cartshipping,setCartshipping}=useContext(Context)
  //const stripepromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  // const handlepayment=async()=>{
  //     try {
  //       const stripe=await stripepromise;
  //     const res=await makepaymentrequest.post("api/orders",{
  //       products:cartItems
  //     })
  //     await stripe.redirectToCheckout({
  //       sessionId:res.data.stripeSession.id
  //     })
  //     } catch (error) {
  //       console.log(error)
  //     }
  // }
  const navigate=useNavigate();
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span
            className="close-btn"
            onClick={() => {
              setshowcart(false);
            }}
          >
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {!cartItems?.length && <div className="empty-cart">
          <BsCartX />
          <span>No products in the cart</span>
          <button className="return-cta" onClick={()=>{navigate("/");setshowcart(false);}}>Return to shop</button>
        </div>}
        {!!cartItems?.length && <>
        <CartItem/>
        <div className="cart-footer">
        
            <div className="subtotal">
                <span>Sub Total:</span>
                {/* <span>&#8377;{cartshipping.toFixed(2)}</span> */}
                <span>&#8377;{cartsubtotalgst.toFixed(0)}</span>
            </div>
            <div className="subtotal">
                <span>Shipping Cost:</span>
                <span>&#8377;{cartshipping.toFixed(0)}</span>
                {/* <span>&#8377;{cartsubtotalgst.toFixed(0)}</span> */}
            </div>
            <div style={{fontSize:"0.8em"}} className="offer"> Free Shipping for Orders above &#8377;10,000</div>
            <div className="subtotal">
                <span>Total Cost:</span>
                <span>&#8377;{Number(cartsubtotalgst.toFixed(0))+Number(cartshipping.toFixed(0))}</span>
                
                {/* <span>&#8377;{cartsubtotalgst.toFixed(0)}</span> */}
            </div>

            <div className="button">
                <button className="checkout-cta" onClick={()=>{navigate("/checkout");setshowcart(false);}}>CheckOut</button>
            </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export default Cart;
