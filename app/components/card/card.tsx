import { useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, updateCart } from "store/reducer/cart-reducer";
import resolveImage from "~/util/products.util";

const images = import.meta.glob('../../../assets/**/*.jpg', { eager: true });

export default function Card({ paginatedProducts, cartSelector, isChat }: any) {

    const dispatch = useDispatch<any>();

    const handleAddToCart = (product: any) => {
        dispatch(cartSelector.length ? updateCart({
            ...product
        }) : addToCart({
            ...product
        }))
    };

    const handleDecrement = (product: any) => {
        dispatch(decreaseQuantity({ ...product }))
    }
    const handleIncrement = (product: any) => {
        dispatch(increaseQuantity({ ...product }));
    }
    const cartMap = new Map(cartSelector?.map((item: any) => [item._id, item]));

    return (
        <>
            {
                paginatedProducts?.map((product: any, key: number) => {
                    const cartItem = cartMap.get(product._id);

                    return (
                        <div
                            key={key}
                            className="w-full p-2 mb-4 bg-white rounded shadow-sm border border-gray-300 px-2"
                        >
                            {/* Product Image */}
                            <img
                                src={resolveImage(product, images)}
                                alt={product.description}
                                className={`object-cover rounded ${isChat ? 'h-20 w-20 mx-auto' : 'w-full h-48 rounded-t'}`}
                            />

                            {/* Product Name */}
                            <div className="px-4 py-2">
                                <div
                                    className="font-semibold text-lg sm:text-xl text-center text-gray-800 truncate"
                                    title={product.name}
                                >
                                    {product.name}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex justify-center items-center pb-2">
                                <span className="px-2 font-bold text-md text-gray-700">${product.price}</span>
                            </div>

                            {/* Quantity or Add to Cart */}
                            {cartItem ? (
                                <div
                                    key={`quantity-${product._id}`}
                                    className="transition-all duration-300 ease-in-out transform scale-100 opacity-100 border-t border-gray-200 h-12 flex justify-center items-center gap-2 sm:gap-4 px-2"
                                >
                                    <button
                                        className="cursor-pointer px-2 sm:px-4 w-12 sm:w-16 text-sm sm:text-base bg-gray-100 rounded hover:bg-gray-200"
                                        onClick={() => handleDecrement(cartItem)}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </button>

                                    <span className="px-2 font-bold w-6 text-center text-sm sm:text-base">
                                        {cartItem.quantity}
                                    </span>

                                    <button
                                        className="cursor-pointer px-2 sm:px-4 w-12 sm:w-16 text-sm sm:text-base bg-gray-100 rounded hover:bg-gray-200"
                                        onClick={() => handleIncrement(cartItem)}
                                    >
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    key={`add-${product._id}`}
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full border-2 border-gray-400 text-center cursor-pointer p-2 rounded hover:bg-gray-100 transition"
                                >
                                    <i className="fa fa-shopping-cart px-1"></i>
                                    {isChat ? <></> : <span className="hidden md:inline">Add to Cart</span>}
                                </button>
                            )}
                        </div>

                    );
                })
            }
        </>
    );
}