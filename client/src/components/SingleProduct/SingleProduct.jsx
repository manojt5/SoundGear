import "./SingleProduct.scss";
import useFetch from "../../hooks/useFetch"
import { useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useEffect } from "react";
import {AiFillHeart} from "react-icons/ai"
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaCartPlus,
} from "react-icons/fa";
import prod from "../../assets/products/earbuds-prod-1.webp";
const SingleProduct = () => {
  
  
    const [quantity,setQuantity]=useState(1);
    const {id}=useParams();
    const {handleaddtocart,handleaddtolike}=useContext(Context)
    // console.log(id);
    const {data}=useFetch(`/api/products?populate=*&[filters][id]=${id}`)
    if(!data) return;
    const product =data?.data[0]?.attributes
    //console.log(product.gst.data.attributes.gstpercent);
    var gstperc=product.gst.data.attributes.Gstpercent;
    var total_price=(product.Price*(100+gstperc))/100;
    if (data?.data[0]?.attributes) {
      data.data[0].attributes.Gstprice = total_price;
    }
    const increment=()=>{
        setQuantity(prevState=>prevState+1)
    }
    const decrement=()=>{
        setQuantity((prevState)=>{
            if(prevState===1) return 1;
            return prevState-1
        })
    }
    function shareViaWhatsApp() {
      const text = encodeURIComponent(`Check out this link: {<a href="${window.location.href}">${window.location.href}</a>}`);
      const whatsappURL = `whatsapp://send?text=${text}`;
      window.open(whatsappURL);
    }
    console.log(product)
    return (
      <div className="single-product-main-content">
        <div className="layout">
          <div className="single-product-page">
            <div className="left">
              <img
                src={
                  process.env.REACT_APP_DEV_URL +
                  product?.Image?.data[0]?.attributes?.url
                }
                alt=""
              ></img>
            </div>
            <div className="right">
              <span className="name">{product?.Title}</span>
              <span className="price">&#8377;{(data.data[0].attributes.Gstprice).toFixed(0)}<span className="gsttag"> (Including all taxes)</span></span>
              {/* <span className="gsttag">(with GST:&#8377;{data.data[0].attributes.gstprice})</span> */}
              {/* <span>(with GST:&#8377;{total_price})</span> */}
              <span className="desc">{product?.Description}</span>
              {/* <span className="likebutton" onClick={()=>{
                                handleaddtolike(data.data[0]);
                                
                            }}>
                                
                                Like the product?Add the product to liked items
                            </span> */}
              <span
                className={`likebutton ${
                  data.data[0].attributes.liked ? "liked" : ""
                }`}
                onClick={() => {
                  handleaddtolike(data.data[0]);
                //   data.data[0].attributes.liked=!data.data[0].attributes.liked;
                }}
              >
                {data.data[0].attributes.liked
                  ? "You liked this product!"
                  : "Like the product? Add the product to liked items"}
                  {<AiFillHeart/>}
              </span>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  <span onClick={decrement}>-</span>
                  <span>{quantity}</span>
                  <span onClick={increment}>+</span>
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => {
                    handleaddtocart(data.data[0], quantity);
                    setQuantity(1);
                  }}
                >
                  <FaCartPlus size={20} />
                  ADD TO CART
                </button>
              </div>

              <span className="divider"></span>
              <div className="info-item">
                <span className="text-bold">
                  Category:
                  <span> {product?.categories.data[0].attributes.Title}</span>
                </span>
                <span className="text-bold">
                  Share:
                  <span className="social-icons">
                    <FaFacebook size={16} onClick={shareViaWhatsApp}/>
                    <FaTwitter size={16} />
                    <FaInstagram size={16} />
                    <FaLinkedin size={16} />
                    <FaYoutube size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <RelatedProducts
            productid={id}
            categoryid={product.categories.data[0].id}
          />
        </div>
      </div>
    );
};
export default SingleProduct;
