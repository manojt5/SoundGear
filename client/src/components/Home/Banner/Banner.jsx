import "./Banner.scss";
import banimg from "../../../assets/banner-img.png"
import bann from "../../../assets/products/earbuds-prod-1.webp"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../utils/context";
const Banner = () => {
  const navigate=useNavigate();
  const {template}=useContext(Context);
  //console.log(process.env.REACT_APP_DEV_URL +template?.data[0]?.attributes?.BannerImg?.data?.attributes?.url)
  //console.log(template?.data[0]?.attributes?.BannerImg?.data?.attributes?.url)
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
            <h1>{template.data[0].attributes.BanTitle}</h1>
            <p>{template.data[0].attributes.BannerDesc}</p>
            <div className="ctas">
                <div className="banner-cta" onClick={()=>{navigate("/About")}}>read more</div>
                <div className="banner-cta v2" onClick={()=>{navigate("/catgory")}}>shop now</div>
            </div>
        </div>
        <img className="banner-img" src={process.env.REACT_APP_DEV_URL +template?.data[0]?.attributes?.BannerImg?.data?.attributes?.url}/>
        
      </div>
    </div>
  );
};

export default Banner;
