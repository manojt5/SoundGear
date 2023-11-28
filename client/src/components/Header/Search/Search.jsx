import "./Search.scss";
import { MdClose } from "react-icons/md";
import { useState ,useContext} from "react";
import img1 from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../utils/context";
import useFetch from "../../../hooks/useFetch"
const Search = ({ setshowsearch }) => {
  const [query,setQuery]=useState("");
  //const{}=useContext(Context)
  const navigate=useNavigate();
  const changn=(e)=>{
    setQuery(e.target.value);
  }
  let {data}=useFetch(`/api/products?populate=*&filters[Title][$contains]=${query}`);
  if(!query.length){
    data=null;
  }
  return (
    <div className="search-modal">
      <div className="form-field">
        <input type="text" autoFocus placeholder="Search for Products" value={query} onChange={changn}></input>
        <MdClose
          className="close-btn"
          onClick={() => {
            setshowsearch(false);
          }}
        />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {data?.data?.map(item=>(
            <div key={item.id} className="search-result-item" onClick={()=>{
              //navigate("/");
              navigate(`/product/${item.id}`);
              setshowsearch(false)
              }}>
            <div className="image-container">
              <img src={process.env.REACT_APP_DEV_URL+item?.attributes?.Image?.data[0]?.attributes?.url} alt=""></img>
            </div>
            <div className="prod-details">
              <span className="name">{item.attributes.Title}</span>
              <span className="desc">{item.attributes.Description}</span>
              
            </div>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Search;
