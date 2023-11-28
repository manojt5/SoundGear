import "./Footer.scss";
import React from "react";
import payment from "../../assets/payments.png"
import { FaLocationArrow, FaMobileAlt, FaEnvelope ,FaFacebook,FaInstagram } from "react-icons/fa"
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const {template,categories,contact}=useContext(Context);
    const navigate=useNavigate();
    //console.log(contact?.data[0]?.attributes?.Address)
    return (
      <div className="footer">
        <div className="footer-content">
          <div className="col">
            <div className="title">About</div>
            <div className="text">
              {template?.data[0]?.attributes?.FooterAbout}
            </div>
          </div>
          <div className="col">
            <div className="title">Contact</div>
            <div className="text">
              <div className="c-item">
                <FaLocationArrow />
                <div className="text">
                  <a
                    href={`https://www.google.com/maps/search/?q=${contact?.data[0]?.attributes?.Address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    {contact?.data[0]?.attributes?.Address}
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaMobileAlt />
                <div className="text">
                  {contact?.data[0]?.attributes?.MobileNumber}
                </div>
              </div>
              <div className="c-item">
                <FaEnvelope />
                <div className="text">
                  <a
                    href={`mailto:${contact?.data[0]?.attributes?.EmailID}`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    {contact?.data[0]?.attributes?.EmailID}
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaFacebook />
                <div className="text">
                  <a
                    href={`${contact?.data[0]?.attributes?.SocialURL}`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    Facebook{" "}
                  </a>
                </div>
              </div>
              <div className="c-item">
                <FaInstagram />
                <div className="text">
                  <a
                    href={`${contact?.data[0]?.attributes?.SocialURL2}`}
                    target="blank"
                    style={{ color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
                  >
                    Instagram{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="title">Categories</div>

            {/* <span className="text" onClick={()=>{navigate("/category/1")}}>Headphones</span>
                    <span className="text" onClick={()=>{navigate("/category/3")}}>SmartWatches</span>
                    <span className="text" onClick={()=>{navigate("/category/2")}}>Bluetooth Speakers</span>
                    <span className="text" onClick={()=>{navigate("/category/4")}}>Wireless Earbuds</span>
                    <span className="text">Home Theatre</span>
                    <span className="text">Projectors</span> */}
            {categories?.data?.map((item) => (
              <span
                key={item.id}
                className="category text"
                onClick={() => navigate(`/category/${item.id}`)}
              >
                {item.attributes.Title}
              </span>
            ))}
          </div>
          <div className="col">
            <div className="title">Pages</div>
            <span
              className="text"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </span>
            <span
              className="text"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </span>
            <span className="text">Privacy Policy</span>
            <span className="text">Returns</span>
            <span className="text">Terms & Conditions</span>
            <span
              className="text"
              onClick={() => {
                navigate("/compliant");
              }}
            >
              Contact Us
            </span>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="bottom-bar-content">
            <div className="text">
              {template?.data[0]?.attributes?.FooterCopyright}
            </div>
            {/* <img src={payment}></img> */}
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                template?.data[0]?.attributes?.FooterPaymentImg?.data
                  ?.attributes?.url
              }
            ></img>
          </div>
        </div>
      </div>
    );
};

export default Footer;
