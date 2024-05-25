import { useDispatch } from "react-redux";
import { ITEM_IMG_CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList  = ({items}) => {
    const dispatch = useDispatch();
    const handleAddItem = () => {
        dispatch(addItem("Pizza"));
    };

return (
    <div>
        {
        items.map((item) => (
            <div className="my-2 flex self-start" key={item?.card.info?.id + item?.card.info?.category}>
            <div className="flex flex-col w-[500px]">
            <p className="my-1  font-bold w-[60%]">{item?.card.info?.name}</p>
            <p className="my-1 text-lg font-normal w-[40%]">
                {item?.card?.info?.price > 0
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    }).format(item?.card?.info?.price / 100)
                : item?.card?.info?.defaultPrice > 0
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    }).format(item?.card?.info?.defaultPrice / 100)
                : ""} 
            </p>
            <p className="my-1 item-desc">{item?.card.info?.description}</p>
            </div>
            <div className="flex flex-col justify-center items-end w-[200px]">
            {item?.card.info?.imageId && (
                <img
                className="h-[100px] w-[100px] rounded"
                src={ITEM_IMG_CDN_URL + item?.card.info?.imageId}
                alt={item?.card.info?.name}
                />
            )}
            <button className="bg-orange-100 px-6 py-2"
            onClick={() => {
                dispatch(addItem(item));
                console.log("Subash")
            }}>ADD +</button>
            </div>
        </div>
        ))}
    </div>
);
}
export default ItemList;