import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, updateCart } from "store/reducer/cart-reducer";

const images = import.meta.glob('../../../assets/**/*.jpg', { eager: true });

export default function Card({ paginatedProducts, cartSelector }: any) {

    const dispatch = useDispatch<any>();

    const handleAddToCart = (product: any) => {
        console.log(product);
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
                paginatedProducts.map((product: any, key: number) => {
                    const cartItem = cartMap.get(product._id);
                    const imagePath = `../../../assets/${product.category?.toLowerCase()}/${product.image}.jpg`;
                    const imageSrc = images[imagePath]?.default;

                    return (
                        <div className="w-1/4 outline-[#243c5a] overflow-hidden inset-shadow-2xs border-[#dbdbdb] px-2 mb-2" key={key}>
                               
                            <img
                                className="h-48 w-full max-w-96 p-2"
                                src={imageSrc}
                                alt={product.description}
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 text-center whitespace-nowrap overflow-hidden text-ellipsis hover:overflow-visible group-hover:opacity-100 text-nowrap" title={product.name}>
                                    {product.name}
                                </div>
                            </div>
                            <div className="flex justify-center items-center pb-2">
                                <span className="px-2 font-bold text-md">{product.price}$</span>
                            </div>

                            {cartItem ? (
                                <div
                                    className="transition-all duration-300 ease-in-out transform scale-100 opacity-100 border-1 h-8 flex justify-center items-center"
                                    key={`quantity-${product._id}`}
                                >
                                    <button className="cursor-pointer px-4 w-24" onClick={() => handleDecrement(cartItem)}>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <span className="px-2 font-bold w-8 text-center">{cartItem.quantity}</span>
                                    <button className="cursor-pointer px-4 w-24" onClick={() => handleIncrement(cartItem)}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="transition-all duration-300 ease-in-out transform scale-100 opacity-100 w-full border-2 border-gray-400 text-center cursor-pointer p-2"
                                    onClick={() => handleAddToCart(product)}
                                    key={`add-${product._id}`}
                                >
                                    <i className="fa fa-shopping-cart px-1"></i>
                                    Add to Cart
                                </button>
                            )}

                        </div>
                    );
                })
            }
        </>
    );
}