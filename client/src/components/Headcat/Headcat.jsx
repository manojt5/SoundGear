import "./Headcat.scss"
import React from "react";
import { useNavigate } from "react-router-dom";

const Headcat = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className="shop-by-categoryy">
      <div className="categoriess">
        {categories?.data?.map((item) => (
          <div key={item.id} className="categoryy" onClick={() => navigate(`/category/${item.id}`)}>
            <img
              src={process.env.REACT_APP_DEV_URL + item.attributes?.Image?.data?.attributes?.url}
              alt={item.attributes.name}
            />
            {/* <h3>{"item.attributes.title"}</h3>
            <p>{"hello"}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headcat;
