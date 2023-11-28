import { useEffect,useState,useContext } from "react";
import {useNavigate,useLocation} from "react-router-dom"

import {TbSearch} from "react-icons/tb"
import {CgShoppingCart} from "react-icons/cg"
import {AiOutlineHeart} from "react-icons/ai"

import Search from "./Search/Search"

import { Context } from "../../utils/context"; 

import "./Header.scss";
import Cart from "../Cart/Cart";

const Header = () => {
    const [scrolled,setscrolled]=useState(false)
    const [showcart,setshowcart]=useState(false)
    const [showsearch,setshowsearch]=useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const navigate=useNavigate();
    const location = useLocation();
    const {cartcount,setCartcount,likeditems,user,setUser,template}=useContext(Context)
    const handlescroll=()=>{
        const f=window.scrollY;
        if(f>200){
            setscrolled(true);
        }
        else{
            setscrolled(false);
        }
    }
    const handleLogout = () => {
        if (user) {
          // Call the server to update is_signed_in and then log the user out
          fetch('http://localhost:8081/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user }), // Send the user's email
          })
            .then(() => {
              setUser(null); // Set user state to null
            })
            .catch(error => {
              console.error('Error logging out:', error);
            });
            navigate("/login")
        }
    }
    useEffect(() => {
      window.addEventListener("scroll",handlescroll);
      console.log(template.data[0].attributes.BannerDesc);
    }, [])
    // useEffect(() => {
    //     if (initialLoad) {
    //       navigate("/signup");
    //       setInitialLoad(false);
    //     }
    //   }, [navigate, initialLoad]);
    return <><header className={`main-header ${scrolled?`sticky-header`:""}`}>
        <div className="header-content">
        <ul className="left">
            <li className={location.pathname === "/" ? "active" : ""} onClick={()=>navigate("/")}>Home</li>
            <li className={location.pathname === "/about" ? "active" : ""} onClick={()=>navigate("/about")}>About</li>
            <li className={location.pathname === "/catgory" ? "active" : ""} onClick={()=>navigate("/catgory")}>Categories</li>
        </ul>
        <div className="center" onClick={()=>navigate("/")}>{template.data[0].attributes.title}</div>
            <div className="right">
                {user && (
                    <span>
                        Welcome, {user.slice(0, -10)}<span className="logout" onClick={handleLogout}> Logout</span>
                    </span>
                )}
                {!user && <span className="login" onClick={() => { navigate("/login") }}>Login/Signup</span>}
                <span className="login" onClick={() => { navigate("/compliant") }}>Contact Us</span>
                <TbSearch onClick={() => { setshowsearch(true) }} />
                <span className={location.pathname === "/lp" ? "activ cart-icon" : "cart-icon"} onClick={() => { navigate("/lp") }}><AiOutlineHeart />{!!likeditems.length && <span>{likeditems.length}</span>}</span>
                {/* <AiOutlineHeart className={location.pathname === "/lp" ? "active cart-icon" : "cart-icon"} onClick={()=>navigate("/lp")}/><span>{cartcount}</span> */}
                <span className="cart-icon " onClick={() => { setshowcart(true) }}><CgShoppingCart />{!!cartcount && <span>{cartcount}</span>}</span>
            </div>
        </div>
    </header>
    {showsearch && <Search setshowsearch={setshowsearch}/>}
    {showcart && <Cart setshowcart={setshowcart}/>}
    </>
};

export default Header;
