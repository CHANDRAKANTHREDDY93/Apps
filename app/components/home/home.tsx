import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "store/reducer/cart-reducer";
import Card from "../card/card";

const ITEMS_PER_ROW = 4;

export default function Home() {
    const [ products, setProducts ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch<any>();
    const cartSelector = useSelector(item => item.cartReducer)?.carts;
    const productSelector = useSelector(item => item.cartReducer)?.products;
      // Pagination logic
    const totalPages = productSelector ? Math.ceil(productSelector.length / ITEMS_PER_ROW) : 1;
    const paginatedProducts = productSelector
        ? productSelector.slice((currentPage - 1) * ITEMS_PER_ROW, currentPage * ITEMS_PER_ROW)
        : [];

    useEffect(() => {
        // Only fetch if products are not already loaded
        if (!productSelector || productSelector.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, productSelector]);

    useEffect(() => {
        setProducts(productSelector);
    }, [productSelector]);
    // useEffect(() --- IGNORE ---

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
        <div className="bg-gray-200 pt-2 pb-2 text-gray-800">
            <div className="">
               <div className="flex justify-between w-full p-2">
                    <h3>My Smart Basket</h3>
                    <div className="">
                        <a href="/app/cart" className="underline px-2">View All</a>
                        <button className="px-1 mr-1 border-2 border-gray-700 cursor-pointer" onClick={handlePrev} disabled={currentPage === 1} >
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        <button className="px-1 border-2 border-gray-700" onClick={handleNext} disabled={currentPage === totalPages} >
                            <i className="fa fa-arrow-right"></i>
                        </button>
                    </div>
               </div>
               {/* Product Card */}
               {
               paginatedProducts.length === 0 ? <p className="text-center">No Products Available</p> :
                <div className="flex flex-wrap px-2 pb-2">
                    <Card paginatedProducts={paginatedProducts} cartSelector={cartSelector} />
                </div>
            }
            </div>
        </div>
        </>
    );
}