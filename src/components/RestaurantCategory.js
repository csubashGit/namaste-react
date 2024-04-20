import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = (data) => {
    const [showItems,setShowItems] = useState(false);
    console.log(data);
    const HandleClick = () =>{
        setShowItems(!showItems);
    }
    return(
        <div>
            <div className="my-3 bg-gray-50 shadow-lg p-4">
                <div className="flex justify-between ">
                <span className="font-bold text-lg" onClick={HandleClick}>{data.data.title}({data.data.itemCards.length})</span>
                <span>↓</span>
                </div>
                {showItems && <ItemList items={data.data.itemCards}/>}
            </div>
        </div>
    )
}
export default RestaurantCategory;