import { Logo_URL } from "../utils/constants";
import { useState } from "react"; 
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Header = () =>
{
    let btnName = "Login";

    const [btnNameReact,setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();
    return (
        <div className="header">
            <div className="nav-items">
                <ul>
                    <li><img src={Logo_URL}className="logo"></img></li>
                    <li style={{alignSelf:"center"}}>Online Status : {onlineStatus == true ? "✅": "🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li><Link>Cart</Link></li>
                    <li><button className="login glyphicon glyphicon-log-out" onClick={() => {btnNameReact == "Login" ? setBtnName("Logout") : setBtnName("Login")}}>{btnNameReact}</button></li>
                </ul>
            </div>
        </div>
    );
};
export default Header;