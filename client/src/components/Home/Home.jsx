import "./Home.scss";
import "./Banner/Banner"
import Banner from "./Banner/Banner";
import Category from "../Home/Category/Category";
import Products from "../Products/Products";
import { useEffect ,useState,useContext} from "react";
import { fetchdatafromapi ,getSignedInUser} from "../../utils/api";
import { Context } from "../../utils/context";
import axios from "axios";
const Home = () => {
    const{categories,setCategories,products,setProducts,user,setUser,cartItems,setCartItems,likeditems,setLikeditems,threshhold,setThreshhold,template,setTemplate,contact,setContact,setKeys}=useContext(Context);
//     useEffect(() => {
//         getproducts();
//         getcategories();
//         getSignedInUser().then(userEmail => {
//         if (userEmail) {
//             console.log("Signed-in user:", userEmail);
//             setUser(userEmail);
//             // Use the userEmail for your application logic
//         } else {
//             console.log("No signed-in user");
//         }
//         setCartItems(fetchUserCart(user));
//     });
//    ;
//     }, []);
//     var f;
    
//     const fetchUserCart = async (email) => {
//         try {
//           const response = await axios.get(`http://localhost:8081/getUserCart/${email}`);
//           return response.data.cartItems;
//         } catch (error) {
//           console.error("Error fetching user's cart data:", error);
//           return [];
//         }
//       };
useEffect(() => {
    //window.location.reload();
    gettemplates();
    getproducts();
    getcategories();
    getcontact();
    //updateGSTPrice();
    getminship();
    getSignedInUser().then((userEmail) => {
        if (userEmail) {
          console.log("Signed-in user:", userEmail);
          setUser(userEmail);
    
          // Fetch and set user's cart items
          fetchUserCart(userEmail).then((userCartItems) => {
            if (userCartItems) {
              setCartItems(userCartItems);
            }
          });
    
          // Fetch and set user's liked items
          fetchLikedItems(userEmail).then((userLikedItems) => {
            if (userLikedItems) {
                //console.log(userLikedItems)
                setLikeditems(userLikedItems);
            }
          });
        } else {
          console.log("No signed-in user");
        }
      });
    //setLikedItems(fetchLikedItems(user));
  }, []);
  var f;

  const fetchUserCart = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/getUserCart/${email}`
      );
      return response.data.cartItems;
    } catch (error) {
      console.error("Error fetching user's cart data:", error);
      return [];
    }
  };
  const fetchLikedItems = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8081/getLikedItems/${email}`);
      //console.log(response.data.likedItems)
      return response.data.likedItems;
      
    } catch (error) {
      console.error("Error fetching liked items:", error);
      return [];
    }
  };

    const getcategories=async()=>{
        f=await fetchdatafromapi("/api/categories?populate=*").then(res=>{
            //console.log(res);
            setCategories(res);
        });
    };
    const gettemplates=async()=>{
      try{
        f=await fetchdatafromapi("/api/templatings?populate=*").then(res=>{
          //console.log(res);
          setTemplate(res);
          
      });
      }
      catch{
        console.log("there is error");
      }
  };
  
  const getcontact=async()=>{
    try{
      f=await fetchdatafromapi("/api/contact-footers?populate=*").then(res=>{
        console.log(res);
        setContact(res);
    });
    }
    catch{
      console.log("there is error");
    }
};
    const getminship=async()=>{
      try{
        f=await fetchdatafromapi("/api/minshipcosts?populate=*").then(res=>{
          //console.log(res.data[0].attributes.Amountthreshhold);
          setThreshhold(res.data[0].attributes.Amountthreshhold);
          // setCategories(res);
      });
      }
      catch{
        console.log("there is error");
      }
  };
    const getproducts=()=>{
        
        fetchdatafromapi("/api/products?populate=*").then(res=>{
            //console.log(res);
            setProducts(res);
        });
    };
    const updateGSTPrice = () => {
        
      };
      
    
    
    
    
    return (
    <div>
    <Banner/>
    <div className="main-content">
        <div className="layout">
            {/* {console.log("manoj")} */}
            {/* {console.log(products)}; */}
        <Category categories={categories}/>
        <Products products={products} headingText={"Popular Products"}/>
        
        </div>
    </div>
    </div>
    );
    
};

export default Home;
