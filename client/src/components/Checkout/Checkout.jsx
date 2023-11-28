import React from 'react'

import { useContext,useState ,useEffect} from 'react'
import { Context } from '../../utils/context'
import { useNavigate } from 'react-router-dom';

import "./Checkout.scss"
import axios from 'axios';
import { makepaymentrequest } from '../../utils/api';
import {loadStripe} from "@stripe/stripe-js"
const generateUniqueId = require('generate-unique-id');

function Checkout() {
    const{cartItems,cartsubtotalgst,cartshipping,threshhold,finalAmount,setFinalAmount,user,orderid,setOrderid}=useContext(Context);
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCostinter, setShippingCostinter] = useState(0);
    const navigate=useNavigate();
    // const orderid = require('order-id')('key');
    // const id = orderid.generate();
    console.log(cartItems);
    useEffect(() => {
      const id1 = generateUniqueId({
        length: 9,
        useLetters: false
      });
      setOrderid(id1);
      console.log(orderid);
    }, []);
    const handleAddressChange = (e) => {
      const address = e.target.value;
      setShippingAddress(address);
  
      // Calculate shipping cost based on the address
      const cost = calculateShippingCost(address);
      setShippingCostinter(cost);
      setFinalAmount(cost+cartsubtotalgst + cartshipping);
    };
    let cost = 0;
    const calculateShippingCost = (address) => {
      // Convert the address to lowercase for case-insensitive comparison
      const lowercaseAddress = address.toLowerCase();
    
      // Implement logic to calculate shipping cost based on the address
      // Check if the address contains the word 'india' and apply extra charges if found
      
    
      if (lowercaseAddress.includes('india')) {
        cost = 0; // Domestic shipping cost
      } else {
        cost = 1000; // Default international shipping cost
      }
    
      return cost;
    };
    const handleSubmit = async (e) => {
      //e.preventDefault();
      let a1=(cartsubtotalgst+cartshipping).toFixed(0);
      console.log(a1);
      try {
        // Create a data object in the desired format
        const postData = {
          data: {
            price: a1,
          }
        };
  
        // Include the authorization token in the headers
        const headers = {
          Authorization: 'Bearer ' + process.env.REACT_APP_STRIPE_APP_KEY
        };
  
        // Send a POST request to the server with headers
        const response = await axios.post('http://localhost:1337/api/preorders', postData, { headers });
  
        // Handle the response from the server (e.g., display a success message)
        console.log('Server Response:', response.data);
        //navigate("/paymentsuccess")
      } catch (error) {
        // Handle errors (e.g., display an error message)
        console.error('Error:', error);
      }
    };
    const stripepromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  const handlepayment=async()=>{
      try {
        await handleSubmit();
        const stripe=await stripepromise;
        const res=await makepaymentrequest.post("api/orders",{
        products:cartItems
      })
      await stripe.redirectToCheckout({
        sessionId:res.data.stripeSession.id
      })
      } catch (error) {
        console.log(error)
      }
  }
  
  
  return (
    <>
      <div className="products-containerr">
        {<div className="sec-headingg">Order Summary</div>}

        <div className="products">
          {cartItems?.map((item) => (
            <div key={item.id} className="product-card">
              {/* {console.log(dataa)} */}
              <div className="thumbnail">
                <img
                  src={
                    process.env.REACT_APP_DEV_URL +
                    item.attributes?.Image?.data[0]?.attributes?.url
                  }
                  onClick={() => navigate("/product/" + item.id)}
                  alt=""
                ></img>
              </div>
              <div className="prod-details">
                <span className="name">{item.attributes.Title}</span>
                <span className="name">{item.attributes.Description}</span>
                <span className="price">
                  &#8377;{" "}
                  {(
                    (item.attributes.Price *
                      (item.attributes.gst.data.attributes.Gstpercent + 100)) /
                    100
                  ).toFixed(0)}
                  <span
                    className="qty"
                    style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.7em" }}
                  >
                    ,Qty:{item.attributes.quantity}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!user && (<div style={{display:"flex",justifyContent:"center" ,marginBottom:"40px"}} onClick={()=>{navigate("/login")}}><button>Signup/Login to Continue</button></div>)}
      {user && (<div><div style={{display:"flex"}}>
      <div className="checkout-container">
  <div className="checkout-form">
    <h2>Shipping Information</h2>
    <form>
      <div>
        <label htmlFor="shipping-address" style={{ width: "100%" }}>
          Shipping Address:
          <span
            style={{ fontSize: "0.7em", color: "rgba(0,0,0,0.7)" }}
          >
            (Include till Country)
          </span>
        </label>
        <br />
        <textarea
          name=""
          cols="100"
          rows="3"
          id="shipping-address"
          value={shippingAddress}
          onChange={handleAddressChange}
          placeholder="Enter your shipping address"
          required
        ></textarea>
        <p>
          Shipping Charges: &#8377;{shippingCostinter}
          (Extra cost for International Deliveries)
        </p>
      </div>
    </form>
  </div>
</div>

<div className="order-details-container">
  <div className="OrderDetails">
    <div>
      <span className="labelStyle">Total Cost:</span>
      <span className="valueStyle">
        &#8377;{cartsubtotalgst.toFixed(0)}
      </span>
    </div>
    <div>
      <span className="labelStyle">Shipping Cost:</span>
      <span className="valueStyle">
        &#8377;
        {cartsubtotalgst.toFixed(0) > threshhold
          ? (cartshipping + shippingCostinter).toFixed(0)
          : shippingCostinter.toFixed(0)}
      </span>
    </div>
    <hr />
    <div>
      <span style={{ fontSize: "1.3em" }} className="labelStyle">
        Total Amount:
      </span>
      <span style={{ fontSize: "1.3em" }} className="valueStyle">
        &#8377;{(cartsubtotalgst + cartshipping+shippingCostinter).toFixed(0)}
        {/* &#8377;{finalAmount.toFixed(0)} */}
      </span>
    </div>
    
  </div>
</div>
</div>
{/* <div style={{display:"flex",justifyContent:"center" ,marginBottom:"40px"}}><button onClick={handleSubmit}>Submit Order and Proceed for Payment</button></div> */}
<div style={{display:"flex",justifyContent:"center" ,marginBottom:"40px"}}><button onClick={handlepayment}>Submit Order and Proceed for Payment</button></div></div>)}
    </>
  );
}

export default Checkout