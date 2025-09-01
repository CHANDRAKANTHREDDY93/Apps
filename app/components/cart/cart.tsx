import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "store/reducer/cart-reducer";

export default function Cart () {
    let [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const handleDecrement = () => {
        dispatch(decreaseQuantity({
            id: 1,
            price: 50,
            quantity: 1,
            name: 'Banana',
            image: 'test'
        }, {id: 1}));
    }
    const handleIncrement = () => {
        dispatch(increaseQuantity({
            id: 1,
            price: 50,
            quantity: 1,
            name: 'Banana',
            image: 'test'
        }));
    }
    const cartSelector = useSelector(item => console.log(item.cartReducer));
    console.log(cartSelector);
    return (
        <>
            <div className="bg-gray-200 mx-auto mt-3 pt-2 pb-2">
                <div className="flex justify-between">
                    <div className="flex">
                        <img src="../../../assets/fruits/banana.jpg" className="h-48 w-full max-w-96 border-0" alt="test"></img>
                    <div className="flex justify-center items-center">Banana</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="border-1 h-8 max-w-36 ">
                            <button className="cursor-pointer px-4" onClick={handleDecrement}>
                                <i className="fa fa-minus" ></i>
                            </button>
                            <span className="px-2" >{count}</span>
                            <button className="cursor-pointer px-4" onClick={handleIncrement}>
                                <i className="fa fa-plus"></i>
                            </button>
                            
                        </div>
                        <div className="flex justify-center items-center px-2">{count * 50}$</div>
                    </div>
                </div>
                
            </div>
        </>
    );
}