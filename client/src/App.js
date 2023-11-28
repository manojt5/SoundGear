import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import AppContext from "./utils/context";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Headcat from "./components/Headcat/Headcat";
import { useState, useEffect } from "react";
import { fetchdatafromapi } from "./utils/api";
import About from "./components/About/About";
import Likedprod from "./components/Likedprod/Likedprod";
import Login from "./components/Login/Login";
import { useLocation } from "react-router-dom";
import Signup from "./components/Login/Signup"
import Checkout from "./components/Checkout/Checkout";
import Complaint from "./components/Compliant/Complaint";
import Success from "./components/Compliant/Success";
import PaymentSuccess from "./components/PaymentSuccess";
import ReactGA from 'react-ga4';
import { useContext } from "react";
import { Context } from "./utils/context";
function App() {
  const [cat, setCat] = useState(); // Initialize cat state as an empty array
  const [key,setKey]=useState();
  //const {keys,setKeys}=useContext(Context);
  // const navigate = useNavigate();
  //const location=useLocation();
  //const hideHeaderFooter = location.pathname === "/login";
  
  const [initialLoad, setInitialLoad] = useState(true);
  const getCategories = async () => {
    try {
      const res = await fetchdatafromapi("/api/categories?populate=*");
      setCat(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getKeys = async () => {
    try {
      const res1 = await fetchdatafromapi("/api/keys?populate=*");
      setKey(res1);
      console.log(res1.data[0].attributes.Google_Analytics);
      ReactGA.initialize(res1.data[0].attributes.Google_Analytics);
      ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getKeys();
  }, []);
  

  // useEffect(() => {
  //   if (initialLoad) {
  //     navigate("/signup");
  //     setInitialLoad(false);
  //   }
  // }, [navigate, initialLoad]);
  //const hideHeaderFooter = location.pathname === "/login";
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Header />
                <Home />
                <Newsletter />
                <Footer />
                
              </>
            }
          />
          <Route
            path={"/category/:id"}
            element={
              <>
                <Header />
                <Category />
                <Newsletter />
                <Footer />
              </>
            }
          />
          <Route
            path={"paymentsuccess"}
            element={
              <>
                <Header />
                <PaymentSuccess />
                <Newsletter />
                <Footer />
              </>
            }
          />
          <Route
            path={"/product/:id"}
            element={
              <>
                <Header />
                <SingleProduct />
                <Newsletter />
                <Footer />
                
              </>
            }
          />
          <Route
            path={"/checkout"}
            element={
              <>
                <Header />
                <Checkout/>
                <Newsletter />
                <Footer />
                
              </>
            }
          />
          <Route
            path={"/compliant"}
            element={
              <>
                <Header/>
                <Complaint/>
                <Newsletter />
                <Footer />
              </>
            }
          />
          <Route
            path={"/success"}
            element={
              <>
                <Header/>
                <Success/>
                <Newsletter />
                <Footer />
              </>
            }
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route
            path={"/catgory"}
            element={
              <>
                <Header />
                <Headcat categories={cat} />
                <Newsletter />
                <Footer />
                
              </>
            }
          />
          <Route
            path={"/about"}
            element={
              <>
                <Header />
                <About />
                <Newsletter />
                <Footer />
                
              </>
            }
          />
          <Route
            path={"/lp"}
            element={
              <>
                <Header />
                <Likedprod />
                <Newsletter />
                <Footer />
                
              </>
            }
          />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
