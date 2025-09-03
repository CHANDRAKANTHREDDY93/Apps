import { useDispatch } from "react-redux";
import { addToCart, updateCart } from "store/reducer/cart-reducer";

export default function Card({ paginatedProducts, cartSelector }: any) {

    const dispatch = useDispatch<any>();

    const handleAddToCart = (product: any) => {
        dispatch(cartSelector.length ? updateCart({
            ...product
        }) : addToCart({
            ...product
        }))
    };

    return (
        <>
            {
                paginatedProducts.map((product: any, key: number) => (
                <div className="w-1/4 rounded overflow-hidden shadow-lg">
                    <img className="h-48 w-full max-w-96 p-2" src={`../../../assets/fruits/${product.image}.jpg`} alt={product.description}/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-center space-wrap">
                            {product.name}
                        </div>
                    </div>
                    <button className="w-full border-2 border-gray-400 text-center cursor-pointer p-2"
                        onClick={() => handleAddToCart(product)}>
                        <i className="fa fa-shopping-cart px-1"></i>
                        Add to Cart
                    </button>
                </div>
            ))}
        </>
    );
}