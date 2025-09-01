import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "store/reducer/cart-reducer";

export default function Home() {
    const [ products, setProducts ] = useState([]);
    const dispatch = useDispatch();
    const cartSelector = useSelector(item => item.cartReducer)?.carts;
    const handleAddToCart = (product) => {
        dispatch(cartSelector.length ? updateCart({
            ...product
        }) : addToCart({
            ...product
        }))
    };

    function checkTotalItemsInCart() {
        console.log(cartSelector);
    }
   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } 
    };

    fetchProducts();
  }, []);
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
               {/* Product Card */}
               {
               products.length === 0 ? <p className="text-center">No Products Available</p> : <div className="flex flex-wrap px-2 pb-2">
                {
                products.map((product: any, key: number) => (
                <div className="w-1/4 rounded overflow-hidden shadow-lg">
                    <img className="h-48 w-full max-w-96 p-2" src={`../../../assets/fruits/${product.image}.jpg`} alt={product.description}/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2 text-center space-wrap">{product.name}</div>
                    </div>
                    <button className="w-full border-2 border-gray-400 text-center cursor-pointer p-2"
                        onClick={() => handleAddToCart(product)}>
                        <i className="fa fa-shopping-cart px-1"></i>
                        Add to Cart
                    </button>
                    </div>
                ))}
                </div>
            }
            </div>
        </div>
        </>
    );
}