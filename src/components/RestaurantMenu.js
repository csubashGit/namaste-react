import { useEffect, useState } from "react"
import { MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, swiggy_menu_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL,ITEM_IMG_CDN_URL } from "../utils/constants";
const RestaurantMenu = () => {
    useEffect(() => {
        fetchMenu();
    },[])
    const [resInfo,setResInfo] = useState(null);
    const {resId} = useParams();
    const [menuInfo,setMenuInfo] = useState([]);
    const [filteredVegMenu,setFilteredVegMenu] = useState([]);
    const fetchMenu  = async () => {
        // const response = await fetch(
        //     swiggy_menu_api_URL + resId
        // );
        //const json  = await response.json();

        let jsonResponse = await
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(swiggy_menu_api_URL+resId)}`)
        .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        const json  = JSON.parse(jsonResponse?.contents)
        //set Restaurant data from API
        const restaurantData = json?.data.cards?.map(x=>x.card)?.find(x=>x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
        setResInfo(restaurantData);
        const menuData = json?.data.cards?.find(x=>x.groupedCard)?.groupedCard?.
                        cardGroupMap?.REGULAR?.cards.map(x=>x.card?.card)?.
                        filter( x=> x['@type']=== MENU_ITEM_TYPE_KEY)?.
                        map(x=>x.itemCards).flat().map(x=>x.card?.info) || [];
        setMenuInfo(menuData);
        setFilteredVegMenu(menuData);
        console.log(menuData);
    }
    return resInfo === null ? (<Shimmer />) : (
        <div className="restaurant-menu">
            <div className="restaurant-summary">
                <img
                className="restaurant-img"
                src={IMG_CDN_URL + resInfo?.cloudinaryImageId}
                alt={resInfo?.name}
                />
                <div className="restaurant-summary-details">
                    <p className="restaurant-title">{resInfo?.name}</p>
                    <p> {resInfo.areaName},{resInfo?.city}</p>
                    <p className="restaurant-tags">{resInfo?.cuisines?.join(", ")}</p>
                    <div className="restaurant-details">
                        <div className="restaurant-rating" style={
                        (resInfo?.avgRating) < 4
                        ? { backgroundColor: "var(--light-red)" }
                        : (resInfo?.avgRating) === "--"
                        ? { backgroundColor: "white", color: "black" }
                        : { color: "black" }
                    }>
                    <i className="fa-solid fa-star"></i>
                    <span>{resInfo?.avgRating}</span>
                    </div>
                    <div className="restaurant-rating-slash">|</div>
                    <div>{resInfo?.sla?.slaString}</div>
                    <div className="restaurant-rating-slash">|</div>
                    <div>{resInfo?.costForTwoMessage}</div>
                </div>
        
            </div>
                
        </div>
        <div className="isVegDiv">
        <input 
            type="checkbox"
            id="checkBoxForVeg"
            name="isVeg"
            value="isVeg" 
            onClick={() => {
                var checkBoxElement = document.getElementById("checkBoxForVeg");
                var vegFood = checkBoxElement.checked == false ? menuInfo : menuInfo.filter(x => x.isVeg && x.isVeg === 1);
                setFilteredVegMenu(vegFood);
            }}/>
            <h4>If you prefer Vegetarian food click on checkbox</h4>
        </div> 
        <div className="restautant-menu-items">
            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                <div className="menu-title-wrap">
                    <h3 className="menu-title">Recommended</h3>
                    <p className="menu-count">
                    {filteredVegMenu.length} ITEMS
                    </p>
                </div>
                <div className="menu-items-list">
                    {filteredVegMenu.map((item) => (
                    <div className="menu-item" key={item?.id + item?.category}>
                        <div className="menu-item-details">
                        <h3 className="item-title">{item?.name}</h3>
                        <p className="item-cost">
                            {item?.price > 0
                            ? new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                }).format(item?.price / 100)
                            : " "}
                        </p>
                        <p className="item-desc">{item?.description}</p>
                        </div>
                        <div className="menu-img-wrapper">
                        {item?.imageId && (
                            <img
                            className="menu-item-img"
                            src={ITEM_IMG_CDN_URL + item?.imageId}
                            alt={item?.name}
                            />
                        )}
                        <button className="add-btn">ADD +</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}
export default RestaurantMenu