import "./CartItem.scss";
import img1 from "../../../assets/products/earbuds-prod-1.webp";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../../utils/context";
const CartItem = () => {
  const {cartItems,handleaddtocart,handleremovetocart,handlecartproductquantity}=useContext(Context)
  console.log(cartItems);
  return (
    <div className="cart-products">
      {cartItems.map((item)=>(
        <div className="cart-product" key={item.id}>
        <div className="image-container">
          <img src={process.env.REACT_APP_DEV_URL+item?.attributes?.Image?.data[0]?.attributes?.url} alt=""></img>       
        </div>
        <div className="prod-details">
          {/* <span className="name">{item.attributes.title}</span> */}
          <span className="name">{item.attributes.Title}</span>
          <MdClose className="close-btn" onClick={() => handleremovetocart(item)} />
          <div className="quantity-buttons">
            <span onClick={()=>handlecartproductquantity('dec',item)}>-</span>
            <span>{item.attributes.quantity}</span>
            <span onClick={()=>handlecartproductquantity('inc',item)}>+</span>
          </div>
          <div className="text">
            {/* <span>3</span><span>x</span><span>&#8377;{item.attributes.title}</span> */}
            <span>{item.attributes.quantity}</span><span>x</span><span>&#8377;{(item.attributes.Price*(item.attributes.gst.data.attributes.Gstpercent+100)/100).toFixed(0)}</span>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default CartItem;
