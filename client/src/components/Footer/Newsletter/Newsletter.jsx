import "./Newsletter.scss";
import React from "react";
import { useState } from "react";
import axios from "axios";
import {FaFacebook,FaInstagram,FaLinkedin,FaTwitter} from "react-icons/fa"
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Create a data object with the email
          const postData = {data:{
            EmailID: email,
          }
          };
          const headers = {
            Authorization: 'Bearer ' + process.env.REACT_APP_STRIPE_APP_KEY
          };
    
    
          // Make a POST request to your Strapi API endpoint
          const response = await axios.post('http://localhost:1337/api/newsletter-emails', postData,{headers});
    
          // Handle the response as needed
          console.log('Server Response:', response.data);
          
          // Clear the email input after submission
          setEmail('');
          setSubscribed(true);
          setTimeout(() => {
            setSubscribed(false);
          }, 3000);
          //alert("Subscribed Succesfully")
        } catch (error) {
          // Handle errors (e.g., display an error message)
          console.error('Error:', error);
          alert("Enter Correct EmailID")
        }
      };
    return (
      <div className="newsletter-section">
        <div className="newsletter-content">
          <span className="small-text">NEWSLETTER</span>
          <span className="big-text">
            Subscribe for updates on New Amazing Products
          </span>
          <div className="form">
            <input type="email" placeholder="Email-Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={handleSubmit}>Subscribe</button>
          </div>
          {subscribed && <span className="success-message" style={{ color: "green" }}>Subscribed Successfully</span>}
          <div>Will be used according to our privacy policy</div>
          <div className="social-icons">
            <div className="icon">
              <a
                href="https://www.facebook.com/login/"
                target="blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FaFacebook size={14} />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://twitter.com/"
                target="blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FaTwitter size={14} />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://www.linkedin.com/in/siva-sai-manoj-t-585a66247"
                target="blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FaLinkedin size={14} />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://www.instagram.com/"
                target="blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                <FaInstagram size={14} />
              </a>
            </div>
            
          </div>
        </div>
      </div>
    );
};

export default Newsletter;
