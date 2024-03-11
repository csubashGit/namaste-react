import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./Shimmer";
import { swiggy_api_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Body = () => {

    const [listOfRestaurants,setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurant,setFilteredRestaurant] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(()=>{
        getRestaurants();
    },[])

    async function getRestaurants() {
        // handle the error using try... catch
        try {
          let json = await
          fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING')}`)
          .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
          })
          // .then(data => {
          //   json = data.contents;
          //   console.log(data.contents);
          // });
          //const response = await fetch(swiggy_api_URL);
          //const json = await response.json();
    
          // initialize checkJsonData() function to check Swiggy Restaurant data
          async function checkJsonData(jsonData) {
            for (let i = 0; i < jsonData?.data?.cards.length; i++) {
              
              // initialize checkData for Swiggy Restaurant data
              let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
              // if checkData is not undefined then return it
              if (checkData !== undefined) {
                return checkData;
              }
            }
          }
    
          // call the checkJsonData() function which return Swiggy Restaurant data
          const resData = await checkJsonData(JSON.parse(json.contents));
    
          // update the state variable restaurants with Swiggy API data
          setListOfRestaurants(resData);
          setFilteredRestaurant(resData);
        } catch (error) {
          console.log(error);
        }
      }

    return  listOfRestaurants?.length === 0 ? (
        <Shimmer/>
    ):(
        <div className="body">
            <div className="filter">
                <div>
                    <input type="text" className="search-box" value={searchText} placeholder="Search Restauarants" onChange={(e) => {
                        setSearchText(e.target.value);
                        console.log(e.target.value);
                        e.target.value === "" ? setFilteredRestaurant(listOfRestaurants) : 
                        setFilteredRestaurant(listOfRestaurants.filter((res) => res?.info?.name?.includes(searchText)))
                    }} />
                </div>
                <button className="filter-btn" onClick={()=>{
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.4
                    );
                    setFilteredRestaurant(filteredList);
                }
                    }>Top Rated Restaurants</button>
            </div>
            <div className="res-container">
                {filteredRestaurant.map((restaurant) => (
                   <Link key={restaurant?.info?.id} to={"restaurants/" + restaurant?.info?.id}><RestaurantCard  {...restaurant?.info} /></Link>
                ))}
            </div>
        </div>
    )
}
export default Body