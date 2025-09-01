import { useDispatch } from "react-redux";
import { addToCart } from "store/reducer/cart-reducer";

export default function Home() {

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: 1,
            price: 50,
            quantity: 1,
            name: 'Banana',
            image: 'test'
        }))
    };
    return (
        <>
        <div className="bg-gray-200 pt-2 pb-2">
            <div className="">
               <div className="flex justify-between w-full p-2">
                    <h3>My Smart Basket</h3>
                    <div className="">
                        <a href="/app/cart" className="underline px-2">View All</a>
                        <button className="px-1 mr-1 border-2 border-gray-700 cursor-pointer">
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <button className="px-1 border-2 border-gray-700">
                            <i className="fa fa-arrow-right"></i>
                        </button>
                    </div>
                    
               </div>
               <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="h-48 w-full max-w-96 p-2" src="../../../assets/fruits/banana.jpg" alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center">Banana</div>
                </div>
                <button className="w-full border-2 border-gray-400 text-center cursor-pointer p-2"
                    onClick={handleAddToCart}>
                    <i className="fa fa-shopping-cart px-1"></i>
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
        </>
    );
}