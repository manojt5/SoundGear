// import "./Category.scss";
// import img1 from "../../../assets/category/cat-1.jpg"
// const Category = (categories) => {
//     console.log("manoj");
//     console.log(categories);
//     return <div className="shop-by-category">
//         <div className="categories">
//             {/* {categories.data.map((item)=>(
//                 <div  key={item.id} className="category">
//                 <img src={img1} alt=""/>
//             </div>
//             ))} */}
//             {/* <div className="category">
//                 <img src={img1} alt=""/>
//             </div> */}
//             {/* <div className="category">
//                 <img src={img1} alt=""/>
//             </div>
//             <div className="category">
//                 <img src={img1} alt=""/>
//             </div>
//             <div className="category">
//                 <img src={img1} alt=""/>
//             </div> */}

//         </div>
//     </div>;
// };

// export default Category;

import "./Category.scss";
import cat1 from "../../../assets/category/cat-1.jpg";
import {useNavigate} from "react-router-dom"

const Category = ({ categories }) => {
  const navigate=useNavigate();
  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories?.data?.map((item) => (
          <div key={item.id} className="category" onClick={()=>navigate(`/category/${item.id}`)}>
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                item.attributes?.Image?.data?.attributes?.url
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;