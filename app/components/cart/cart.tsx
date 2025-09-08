import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "store/reducer/cart-reducer";
import resolveImage from "~/util/products.util";

const images = import.meta.glob('../../../assets/**/*.jpg', { eager: true });
export default function Cart () {
    const dispatch = useDispatch();
    const handleDecrement = (product: any) => {
        dispatch(decreaseQuantity({...product}))
    }
    const handleIncrement = (product: any) => {
        dispatch(increaseQuantity({...product}));
    }
    const handleRemoveItem = (product: any) => {
        dispatch(removeFromCart(product))
    };
    const cartSelector = useSelector((item: any) => item.cartReducer)?.carts
    
    return (
        <>
            <div className="bg-gray-200 mx-auto mt-3 pt-2 pb-2">
                {
                cartSelector.length === 0 ? <p className="text-center text-gray-800">No Items in the Cart</p> : 
                    <div className="w-full p-2" >
                        {
                            cartSelector.map((item: any) => (
                                <div className="flex justify-between pt-2">
                                <div className="flex">
                                    <img src={resolveImage(item, images)} className="h-48 w-[292px] p-2" alt={item.description}></img>
                                    <div className="px-2 mt-4 flex flex-col justify-between">
                                        <span className="font-bold text-gray-800 text-x"> {item.name} </span>
                                        <div className="flex text-blue-800">
                                            <button className="cursor-pointer hover:underline px-2" onClick={() => handleRemoveItem(item)}>Delete</button>
                                            <div className="w-[1px] h-full bg-gray-300"></div>
                                            <button className="cursor-pointer hover:underline px-2">Save for later</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-wrap items-center justify-center">
                                    <div className="border-1 h-8 max-w-36 text-gray-800">
                                        <button className="cursor-pointer px-4" onClick={() => handleDecrement(item)}>
                                            <i className="fa fa-minus" ></i>
                                        </button>
                                        <span className="px-2" >{item.quantity}</span>
                                        <button className="cursor-pointer px-4" onClick={() => handleIncrement(item)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="flex justify-center items-center px-2 text-gray-800">{item.quantity * item.price}$</div>
                                </div>
                                </div>
                            ))
                        }
                        <div className="flex justify-end items-center pt-4 text-gray-800">
                            <h3 className="font-bold text-xl">Total Amount: </h3>
                            <span className="px-2 font-bold text-xl">
                                { cartSelector.reduce((acc: number, item: any) => acc + (item.quantity * item.price), 0)?.toFixed(2) }$
                            </span>
                        </div>
                    </div>
            }
            </div>
        </>
    );
}