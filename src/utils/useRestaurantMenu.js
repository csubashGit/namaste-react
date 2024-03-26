import { useEffect, useState } from "react";


const useRestaurantMenu = (resId) =>{
    const [resInfo,setResInfo] = useState(null);
useEffect(() => {
    fetchData();
},[])

const fetchData = async() => {
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
}

return resInfo;
}
export default useRestaurantMenu;