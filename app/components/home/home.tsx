import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import { setCategory } from "store/reducer/category-reducer";
import { useNavigate } from "react-router";
import { fetchItems } from "store/reducer/home-reducer";

const ITEMS_PER_ROW = 4;

export default function Home() {
    const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({});
    const hasFetched = useRef(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const cartSelector = useSelector(item => item.cartReducer)?.carts;
    const productSelector = useSelector(item => item.homePageReducer)?.products || {};

    useEffect(() => {
        if ((!productSelector || Object.keys(productSelector).length === 0) && !hasFetched.current) {
            dispatch(fetchItems());
            hasFetched.current = true;
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

    const handleAll = (category: string) => {
        dispatch(setCategory({
            products: productSelector[category],
            category: category
        }));
        navigate('/app/categories');
    }

    return (
        <>
            <div className="bg-gray-100 pt-2 pb-2 text-gray-800">
                {Object.keys(productSelector).map(category => {
                    const products = productSelector[category] || [];
                    const totalPages = Math.ceil(products.length / ITEMS_PER_ROW);
                    const currentPage = currentPages[category] || 1;
                    const paginatedProducts = products.slice(
                        (currentPage - 1) * ITEMS_PER_ROW,
                        currentPage * ITEMS_PER_ROW
                    );

                    return (
                        <div key={category} className="mb-8 px-4 sm:px-6 lg:px-8">
                            {/* Header & Pagination Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2">
                                <h3 className="capitalize font-bold text-lg text-gray-800">{category}</h3>

                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        className="underline text-blue-800 text-sm sm:text-base"
                                        onClick={() => handleAll(category)}
                                    >
                                        View All
                                    </button>

                                    <button
                                        className="px-2 py-1 border border-gray-700 rounded disabled:opacity-50"
                                        onClick={() => handlePrev(category, totalPages)}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fa fa-arrow-left"></i>
                                    </button>

                                    <button
                                        className="px-2 py-1 border border-gray-700 rounded disabled:opacity-50"
                                        onClick={() => handleNext(category, totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fa fa-arrow-right"></i>
                                    </button>

                                    <span className="font-semibold text-sm sm:text-base">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </div>
                            </div>

                            {/* Product Grid */}
                            {paginatedProducts.length === 0 ? (
                                <p className="text-center text-gray-600">No Products Available</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 pb-4">
                                    <Card paginatedProducts={paginatedProducts} cartSelector={cartSelector} />
                                </div>
                            )}
                        </div>

                    );
                })}
            </div>
        </>
    );
}