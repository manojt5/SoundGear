import "./Likedprod.scss";
import prod from "../../assets/products/earbuds-prod-1.webp"
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import {FaFacebook,FaCartPlus} from "react-icons/fa"
import {RiDislikeLine} from "react-icons/ri"
const Likedprod = () => {
    const {likeditems,handleaddtocart,handleremovelike}=useContext(Context);
    const navigate=useNavigate();
    console.log(likeditems)
    return (
      <>
        {!!likeditems.length && (
          <div className="sec-heading">PRODUCTS YOU LIKED</div>
        )}
        <div className="products">
          {!!likeditems.length &&
            likeditems.map((item) => (
              //   <div className="likecont" onClick={()=>{navigate("/product/"+item.id)}}>
              //   <div className="imgcont">
              //     <img src={process.env.REACT_APP_DEV_URL+item?.attributes?.img?.data[0]?.attributes?.url} alt={item.attributes.title} />
              //   </div>
              //   <div className="conten">
              //     <span className="product-name">{item.attributes.title}</span>
              //     <p className="product-description">{item.attributes.desc}</p>
              //   </div>
              //   <div className="cart-button">
              //     <button onClick={() => {
              //             handleaddtocart(item,1);
              //             navigate("/about")
              //           }}>Add to Cart</button>
              //   </div>
              // </div>
              <div key={item.id} className="product-card">
                {/* {console.log(dataa)} */}
                <div className="thumbnail">
                  <img
                    src={
                      process.env.REACT_APP_DEV_URL +
                      item.attributes?.Image?.data[0]?.attributes?.url
                    }
                    alt=""
                    onClick={() => navigate("/product/" + item.id)}
                  ></img>
                  {/* { console.log(item.attributes.img.data[0])} */}
                </div>
                <div className="prod-details">
                  <span>
                    <span className="name">{item.attributes.Title}</span>
                    <span className="price">
                      &#8377; {(item.attributes.Price*(100+item.attributes.gst.data.attributes.Gstpercent)/100).toFixed(0)}
                    </span>
                  </span>
                  <span>
                    <span title="Remove from Liked Products"
                      onClick={() => {
                        handleremovelike(item);
                      }}
                    >
                      <RiDislikeLine size={25}/>
                    </span>
                    <span title="Add to Cart"
                      onClick={() => {
                        handleaddtocart(item, 1);
                      }}
                    >
                      <FaCartPlus size={25}/>
                    </span>
                  </span>
                </div>
              </div>
            ))}
        </div>
        {!likeditems.length && <div className="noitem">No items to show</div>}
        <br/><br/>
      </>
    );
};

export default Likedprod;