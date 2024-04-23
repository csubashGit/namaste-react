import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data,showItems,updateIndex}) => {
    //const [showItems,setShowItems] = useState(false);
    console.log(showItems);
    const HandleClick = () =>{
        //setShowItems(!showItems);
        updateIndex();
    }
    return(
        <div>
            <div className="my-3 bg-gray-50 shadow-lg p-4" onClick={HandleClick}>
                <div className="flex justify-between ">
                <span className="font-bold text-lg">{data.title}({data.itemCards.length})</span>
                <span>↓</span>
                </div>
                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        </div>
    )
}
export default RestaurantCategory;