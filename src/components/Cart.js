import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import {clearItems} from "../utils/cartSlice"

const Cart = () =>{
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);

return (
<div className="text-center m-5 p-5">
<div className="w-6/12 m-auto">
    { cartItems.length != 0 && <button className="p-2 m-2 bg-black text-white rounded-md" onClick={() => {
        dispatch(clearItems());
    }}>Clear Items</button>}
    {cartItems.length == 0 && <h1>Cart is empty Please add items to cart</h1>}
    <ItemList items = {cartItems}/>
</div>
</div>
)
};
export default Cart;