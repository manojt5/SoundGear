import "./Products.scss";
import Product from "../Products/Product/Product";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../utils/context";
const Products = ({ products, innerPage, headingText }) => {
  console.log(products);

  // if (products) {
  //   console.log("manoj");
  // }
  const navigate=useNavigate();
  const {setProducts}=useContext(Context);
  // const updatedProducts = products?.data?.map(product => {
  //   const price = product.attributes?.price ?? 0;
  //   const newGSTPrice = price + 2;
  //   return {
  //     ...product,
  //     attributes: {
  //       ...product.attributes,
  //       gstprice: newGSTPrice
  //     }
  //   };
  // });
  // setProducts(updatedProducts);
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products?.data?.map((item) => (
          //  <Product key={item.id} id={item.id} dataa={item.atttributes}/>
          <div key={item.id} className="product-card" onClick={()=>navigate("/product/"+item.id)}>
            {/* {console.log(dataa)} */}
            <div className="thumbnail">
              <img
                src={
                  process.env.REACT_APP_DEV_URL +
                  item.attributes?.Image?.data[0]?.attributes?.url
                }
                alt=""
              ></img>
             {/* { console.log(item.attributes.img.data[0])} */}
            </div>
            <div className="prod-details">
              <span className="name">{item.attributes.Title}</span>
              {/* <span className="price"><s>&#8377; {item.attributes.price}</s></span> */}
              <span className="price">&#8377; {(item.attributes.Price*(item.attributes.gst.data.attributes.Gstpercent+100)/100).toFixed(0)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
