import { useEffect, useState } from "react"
import { MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, swiggy_menu_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL,ITEM_IMG_CDN_URL } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = () => {
    useEffect(() => {
        fetchMenu();
    },[])
    const [resInfo,setResInfo] = useState(null);
    const {resId} = useParams();
    const [menuInfo,setMenuInfo] = useState([]);
    const [filteredVegMenu,setFilteredVegMenu] = useState([]);
    const [categories,setCategories] = useState([]);
    const [showIndex,setShowIndex] = useState(0);
    function updateActiveIndex (newIndex){
        if(showIndex == newIndex){
            setShowIndex(null);
        }
        else{
            setShowIndex(newIndex);
        }

    }
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

        const categoriesData = json?.data.cards?.find(x=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) => c.card?.card?.['@type'] === MENU_ITEM_TYPE_KEY
        );
        setCategories(categoriesData)
        console.log(categoriesData);
    }
    return resInfo === null ? (<Shimmer />) : (
        <div className="max-w-[800px] min-h-[800px]" style={{margin:"20px auto 0"}}>
            <div className="flex h-[200px] bg-blck-100">
                <img
                className="w-[250px] h-[170px]"
                src={IMG_CDN_URL + resInfo?.cloudinaryImageId}
                alt={resInfo?.name}
                />
                <div className="flex flex-col basis-[520px] mx-5">
                    <div className="text-4xl font-light">{resInfo?.name}</div>
                    <div className="text-2xl"> {resInfo.areaName},{resInfo?.city}</div>
                    <div className="whitespace-nowrap text-xl"> Cuisine: {resInfo?.cuisines?.join(", ")}</div>
                    <div className="flex text-xl gap-1">
                        <div className="gap-[5px]" style={
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
        <div className="flex justify-center">
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
            <div>If you prefer Vegetarian food click on checkbox</div>
        </div> 
        <div className="restautant-menu-items">
            <div className="flex justify-center">
                <div >
                <div className="menu-title-wrap">
                    <h3 className="menu-title">Recommended</h3>
                    <p className="menu-count">
                    {filteredVegMenu.length} ITEMS
                    </p>
                </div>
                <div className="flex justify-center flex-col">
                    {filteredVegMenu.map((item) => (
                    <div className="flex self-start" key={item?.id + item?.category}>
                        <div className="flex flex-col w-[500px]">
                        <h3 className="w-[60%]">{item?.name}</h3>
                        <p className="mt-1 text-lg font-normal w-[40%]">
                            {item?.price > 0
                            ? new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                }).format(item?.price / 100)
                            : " "}
                        </p>
                        <p className="item-desc">{item?.description}</p>
                        </div>
                        <div className="flex flex-col justify-center items-end w-[200px]">
                        {item?.imageId && (
                            <img
                            className="h-[100px] w-[100px] rounded"
                            src={ITEM_IMG_CDN_URL + item?.imageId}
                            alt={item?.name}
                            />
                        )}
                        <button className="bg-orange-100 px-6 py-2">ADD +</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
        <div>{categories.map((category,index) => <RestaurantCategory  
        key={category.card.card.title} 
        data={category.card.card} 
        showItems ={index === showIndex ? true:false}
        updateIndex = {() => updateActiveIndex(index)}
        />)}</div>
    </div>
    )
}
export default RestaurantMenu