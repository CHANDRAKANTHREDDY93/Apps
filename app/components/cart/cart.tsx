import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "store/reducer/cart-reducer";
import resolveImage from "~/util/products.util";

const images = import.meta.glob('../../../assets/**/*.jpg', { eager: true });
export default function Cart() {
    const dispatch = useDispatch();
    const handleDecrement = (product: any) => {
        dispatch(decreaseQuantity({ ...product }))
    }
    const handleIncrement = (product: any) => {
        dispatch(increaseQuantity({ ...product }));
    }
    const handleRemoveItem = (product: any) => {
        dispatch(removeFromCart(product))
    };
    const cartSelector = useSelector((item: any) => item.cartReducer)?.carts

    return (
        <>
            <div className="bg-gray-200 mx-auto mt-3 pt-2 pb-2 px-4">
                {cartSelector.length === 0 ? (
                    <p className="text-center text-gray-800">No Items in the Cart</p>
                ) : (
                    <div className="w-full space-y-4">
                        {cartSelector.map((item: any) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4"
                            >
                                {/* Product Info */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <img
                                        src={resolveImage(item, images)}
                                        alt={item.description}
                                        className="h-40 w-full sm:w-60 object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <span className="font-bold text-gray-800 text-lg">{item.name}</span>
                                        <div className="flex text-blue-800 mt-2 space-x-2">
                                            <button
                                                className="cursor-pointer hover:underline"
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                Delete
                                            </button>
                                            <span className="text-gray-400">|</span>
                                            <button className="cursor-pointer hover:underline">Save for later</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity & Price */}
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <div className="flex items-center border rounded px-2 h-10 text-gray-800">
                                        <button
                                            className="cursor-pointer px-2"
                                            onClick={() => handleDecrement(item)}
                                        >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button
                                            className="cursor-pointer px-2"
                                            onClick={() => handleIncrement(item)}
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="text-gray-800 font-semibold">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Total Amount */}
                        <div className="flex justify-end items-center pt-4 text-gray-800">
                            <h3 className="font-bold text-xl">Total Amount:</h3>
                            <span className="px-2 font-bold text-xl">
                                ${cartSelector.reduce((acc: number, item: any) => acc + item.quantity * item.price, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}