import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "store/reducer/cart-reducer";
import Card from "../card/card";

const ITEMS_PER_ROW = 4;

export default function Home() {
    const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({});
    const dispatch = useDispatch<any>();
    const cartSelector = useSelector(item => item.cartReducer)?.carts;
    const productSelector = useSelector(item => item.cartReducer)?.products || {};

    useEffect(() => {
        if (!productSelector || Object.keys(productSelector).length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, productSelector]);

    // Initialize current page for each category
    useEffect(() => {
        const pages: { [key: string]: number } = {};
        Object.keys(productSelector).forEach(category => {
            pages[category] = 1;
        });
        setCurrentPages(pages);
    }, [productSelector]);

    const handlePrev = (category: string, totalPages: number) => {
        setCurrentPages(prev => ({
            ...prev,
            [category]: Math.max((prev[category] || 1) - 1, 1)
        }));
    };

    const handleNext = (category: string, totalPages: number) => {
        setCurrentPages(prev => ({
            ...prev,
            [category]: Math.min((prev[category] || 1) + 1, totalPages)
        }));
    };

    return (
        <>
        <div className="bg-gray-200 pt-2 pb-2 text-gray-800">
            <div>
                {Object.keys(productSelector).map(category => {
                    const products = productSelector[category] || [];
                    const totalPages = Math.ceil(products.length / ITEMS_PER_ROW);
                    const currentPage = currentPages[category] || 1;
                    const paginatedProducts = products.slice(
                        (currentPage - 1) * ITEMS_PER_ROW,
                        currentPage * ITEMS_PER_ROW
                    );

                    return (
                        <div key={category} className="mb-8">
                            <div className="flex justify-between w-full p-2">
                                <h3 className="capitalize font-bold px-2">{category}</h3>
                                <div>
                                    <button className="cursor-pointer underline px-2 text-blue-800">View All</button>
                                    <button className="px-1 mr-1 border-2 border-gray-700 cursor-pointer"
                                        onClick={() => handlePrev(category, totalPages)}
                                        disabled={currentPage === 1}>
                                        <i className="fa fa-arrow-left"></i>
                                    </button>
                                    <button className="px-1 border-2 border-gray-700"
                                        onClick={() => handleNext(category, totalPages)}
                                        disabled={currentPage === totalPages}>
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                    <span className="ml-2 font-bold">Page {currentPage} of {totalPages}</span>
                                </div>
                            </div>
                            {paginatedProducts.length === 0 ? (
                                <p className="text-center">No Products Available</p>
                            ) : (
                                <div className="flex flex-wrap px-2 pb-2 shadow-lg">
                                    <Card paginatedProducts={paginatedProducts} cartSelector={cartSelector} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}