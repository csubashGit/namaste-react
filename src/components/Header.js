import { Logo_URL } from "../utils/constants";
import { useContext, useState } from "react"; 
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import appStore from "../utils/appStore";


const Header = () =>
{
    let btnName = "Login";

    const [btnNameReact,setBtnName] = useState("Login");
    const userData = useContext(UserContext);
    const onlineStatus = useOnlineStatus();
    const cartItems = useSelector((store) => store.cart.items);

    console.log(cartItems);

    return (
        <div className="flex justify-between bg-orange-200">
            <div className="logo-container">
            <img className="w-32" src={Logo_URL}></img>
            </div>
            <div className="nav-items">
                <ul className="flex items-center list-none p-2 space-x-4">
                    <li style={{alignSelf:"center"}}>Online Status : {onlineStatus == true ? "✅": "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li className="px-4 font-bold"><Link to="/cart">Cart - ({cartItems.length})</Link></li>
                    <li>{userData.loggedInUser}</li>
                    <li><button className="login glyphicon glyphicon-log-out" onClick={() => {btnNameReact == "Login" ? setBtnName("Logout") : setBtnName("Login")}}>{btnNameReact}</button></li>
                </ul>
            </div>
        </div>
    );
};
export default Header;