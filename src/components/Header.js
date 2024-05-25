import { Logo_URL } from "../utils/constants";
import { useContext, useState } from "react"; 
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = () =>
{
    let btnName = "Login";

    const [btnNameReact,setBtnName] = useState("Login");
    const userData = useContext(UserContext);
    console.log(userData);
    const onlineStatus = useOnlineStatus();
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
                    <li className="px-4 font-bold">Cart</li>
                    <li>{userData.loggedInUser}</li>
                    <li><button className="login glyphicon glyphicon-log-out" onClick={() => {btnNameReact == "Login" ? setBtnName("Logout") : setBtnName("Login")}}>{btnNameReact}</button></li>
                </ul>
            </div>
        </div>
    );
};
export default Header;