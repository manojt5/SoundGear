import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchdatafromapi } from "./api";
export const Context=createContext();
const AppContext=({children})=>{
    const [categories,setCategories]=useState();
    const [products,setProducts]=useState();
    const [cartItems,setCartItems]=useState([]);
    const [cartcount,setCartcount]=useState(0);
    const [cartsubtotal,setCartsubtotal]=useState(0);
    const [cartsubtotalgst,setCartsubtotalgst]=useState(0);
    const [cartshipping,setCartshipping]=useState(0);
    const [likeditems,setLikeditems]=useState([]);
    const [user,setUser]=useState();
    const [threshhold,setThreshhold]=useState(10000000000);
    const [contact,setContact]=useState();
    const [finalAmount,setFinalAmount]=useState(0);
    const [orderid,setOrderid]=useState();
    const [keys,getKeys]=useState({
      "data": [
          {
              "id": 1,
              "attributes": {
                  "Google_Analytics": "G-01Z72QTNWC",
                  "Stripe_Key": null,
                  "createdAt": "2023-09-04T10:38:50.093Z",
                  "updatedAt": "2023-09-04T10:38:51.235Z",
                  "publishedAt": "2023-09-04T10:38:51.216Z"
              }
          }
      ],
      "meta": {
          "pagination": {
              "page": 1,
              "pageSize": 25,
              "pageCount": 1,
              "total": 1
          }
      }
  });
    const [template,setTemplate]=useState({
      "data": [
          {
              "id": 1,
              "attributes": {
                  "title": "SoundGear",
                  "BanTitle": "Sales",
                  "BannerDesc": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam tempora alias impedit nisi dolorem eius facere molestiae saepe eveniet rem?",
                  "createdAt": "2023-09-04T04:26:41.200Z",
                  "updatedAt": "2023-09-04T04:58:13.886Z",
                  "publishedAt": "2023-09-04T04:26:42.296Z",
                  "FooterAbout": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam a asperiores iusto nostrum odit aut ullam reprehenderit neque ea sed!",
                  "BannerImg": {
                      "data": {
                          "id": 24,
                          "attributes": {
                              "name": "banner-img.png",
                              "alternativeText": "Banner-img",
                              "caption": null,
                              "width": 765,
                              "height": 945,
                              "formats": {
                                  "small": {
                                      "ext": ".png",
                                      "url": "/uploads/small_banner_img_6258efb7c1.png",
                                      "hash": "small_banner_img_6258efb7c1",
                                      "mime": "image/png",
                                      "name": "small_banner-img.png",
                                      "path": null,
                                      "size": 207.52,
                                      "width": 405,
                                      "height": 500
                                  },
                                  "medium": {
                                      "ext": ".png",
                                      "url": "/uploads/medium_banner_img_6258efb7c1.png",
                                      "hash": "medium_banner_img_6258efb7c1",
                                      "mime": "image/png",
                                      "name": "medium_banner-img.png",
                                      "path": null,
                                      "size": 452.14,
                                      "width": 607,
                                      "height": 750
                                  },
                                  "thumbnail": {
                                      "ext": ".png",
                                      "url": "/uploads/thumbnail_banner_img_6258efb7c1.png",
                                      "hash": "thumbnail_banner_img_6258efb7c1",
                                      "mime": "image/png",
                                      "name": "thumbnail_banner-img.png",
                                      "path": null,
                                      "size": 28.53,
                                      "width": 126,
                                      "height": 156
                                  }
                              },
                              "hash": "banner_img_6258efb7c1",
                              "ext": ".png",
                              "mime": "image/png",
                              "size": 96.95,
                              "url": "/uploads/banner_img_6258efb7c1.png",
                              "previewUrl": null,
                              "provider": "local",
                              "provider_metadata": null,
                              "createdAt": "2023-09-04T04:24:40.339Z",
                              "updatedAt": "2023-09-04T04:26:33.569Z"
                          }
                      }
                  }
              }
          }
      ],
      "meta": {
          "pagination": {
              "page": 1,
              "pageSize": 25,
              "pageCount": 1,
              "total": 1
          }
      }
  });
    const location=useLocation();
    useEffect(() => {
      window.scrollTo(0,0)
    }, [location])
    
    useEffect(() => {
        let count=0;
        cartItems.map((item)=>{
            count+=item.attributes.quantity;
        })
        setCartcount(count);
        getminship();
      let subtotal=0;
      let subtotalgst=0;
      let subtotalcartshipping=0;
      cartItems.map(item=>subtotal+=item.attributes.Price*item.attributes.quantity)
      setCartsubtotal(subtotal);
      cartItems.map(item=>subtotalgst+=(item.attributes.Price*(item.attributes.gst.data.attributes.Gstpercent+100)/100)*item.attributes.quantity)
      setCartsubtotalgst(subtotalgst);
      cartItems.map(item=>subtotalcartshipping+=item.attributes.Shippingprice*item.attributes.quantity)
      setCartshipping(subtotalcartshipping);
      
      if(subtotalgst>threshhold){
        setCartshipping(0);
      }
      console.log("threshold"+threshhold);
    }, [cartItems])
    // const handleaddtocart=(product,quantity)=>{
    //     let items=[...cartItems]
    //     let index=items?.findIndex((p)=> p.id === product?.id)
    //     if(index !==-1){
    //         items[index].attributes.quantity+=quantity
    //     }   
    //     else{
    //         product.attributes.quantity=quantity;
    //         items=[...items,product];
    //     }
    //     setCartItems(items);
    //     axios.post("http://localhost:8081/updateInCart", {
    //       email: user,
    //       cartItems: items // Pass the updated items array to the server
    //     })
    //     .then(res => {
    //       // Handle success if needed
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //     };
    const getminship=async()=>{
      var f;
      try{
        f=await fetchdatafromapi("/api/minshipcosts?populate=*").then(res=>{
          console.log(res.data[0].attributes.Amountthreshhold);
          setThreshhold(res.data[0].attributes.Amountthreshhold);
          // setCategories(res);
      });
      }
      catch{
        console.log("there is error");
      }
  };
    const handleaddtocart = (product, quantity) => {
      let items = [...cartItems];
      let index = items?.findIndex((p) => p.id === product?.id);
      if (index !== -1) {
        items[index].attributes.quantity += quantity;
      } else {
        product.attributes.quantity = quantity;
        items = [...items, product];
      }
      setCartItems(items);
      axios
        .post("http://localhost:8081/updateInCart", {
          email: user,
          cartItems: items, // Pass the updated items array to the server
        })
        .then((res) => {
          // Handle success if needed
        })
        .catch((err) => {
          console.log(err);
        });
    };
      const handleaddtolike = (product) => {
        let items = [...likeditems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (index !== -1) {
          product.attributes.liked = false;
          //items[index].attributes.quantity+=quantity
          items = items.filter((p) => p.id !== product.id);
        } else {
          //product.attributes.liked=true;
          product.attributes.liked = true;
          items = [...items, product];
        }
        //alert("Added to liked products");
        setLikeditems(items);
        // console.log(items);
        // console.log(product.attributes.title+product.attributes.liked);
        console.log(likeditems);
        axios
          .post("http://localhost:8081/updateLikedItems", {
            email: user,
            likedItems: items,
          })
          .then((res) => {
            // Handle success if needed
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const handleremovetocart=(product,quantity)=>{
        let items=[...cartItems];
        items=items.filter((p)=>p.id!==product.id)
        setCartItems(items);
        axios
        .post("http://localhost:8081/updateInCart", {
          email: user,
          cartItems: items, // Pass the updated items array to the server
        })
        .then((res) => {
          // Handle success if needed
        })
        .catch((err) => {
          console.log(err);
        });
      };
      const handleremovelike=(product)=>{
        let items=[...likeditems]
        items=items.filter((p)=>p.id!==product.id)
        setLikeditems(items);
        // console.log(items);
        // console.log(product.attributes.title+product.attributes.liked);
        console.log(likeditems)
        axios
          .post("http://localhost:8081/updateLikedItems", {
            email: user,
            likedItems: items,
          })
          .then((res) => {
            // Handle success if needed
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const handlecartproductquantity=(type,product)=>{
        let items=[...cartItems];
        let index=items?.findIndex((p)=> p.id === product?.id)
        if(type==='inc'){
            items[index].attributes.quantity+=1;
        }
        else if(type==='dec'){
            if(items[index].attributes.quantity===1) return;
            items[index].attributes.quantity-=1;

        }
        setCartItems(items);
        axios
        .post("http://localhost:8081/updateInCart", {
          email: user,
          cartItems: items, // Pass the updated items array to the server
        })
        .then((res) => {
          // Handle success if needed
        })
        .catch((err) => {
          console.log(err);
        });
      };
    
    return(
        <Context.Provider value={{
            categories,setCategories,products,setProducts,cartItems,setCartItems,cartcount,setCartcount,cartsubtotal,setCartsubtotal,handleaddtocart,handleremovetocart,handlecartproductquantity,handleaddtolike,likeditems,setLikeditems,handleremovelike,setUser,user,cartsubtotalgst,setCartsubtotalgst,cartshipping,setCartshipping,threshhold,setThreshhold,template,setTemplate,contact,setContact,getKeys,keys,setFinalAmount,finalAmount,setOrderid,orderid
        }}>
            {children}
        </Context.Provider>
        )
}

export default AppContext;
