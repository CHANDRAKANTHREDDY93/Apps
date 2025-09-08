import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import SideNav from "../side-nav/side-nav";
import { useEffect, useRef } from "react";
import { setCategory } from "store/reducer/category-reducer";
import { fetchProducts } from "store/reducer/cart-reducer";

export default function Categories() {
    const dispatch = useDispatch<any>();
    const hasFetched = useRef(false);
    const productSelector = useSelector(item => item.cartReducer)?.products || {};
    const categorySelector = useSelector(item => item.categoryReducer).category || 'fruits';
    const categories = useSelector(item => item.categoryReducer).products || [];
    const cartSelector = useSelector(item => item.cartReducer)?.carts;

    useEffect(() => {
        if (productSelector[categorySelector]?.length) {
            dispatch(setCategory({
                products: productSelector[categorySelector],
                category: categorySelector
            }));
        } else if (!hasFetched.current) {
            dispatch(fetchProducts());
            hasFetched.current = true;
        }
    }, [dispatch, categorySelector, productSelector]);

    return (
        <>
            <div className="bg-gray-100 pt-2 pb-2 text-gray-800 mt-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4">
                        <SideNav />
                    </aside>

                    {/* Card Grid */}
                    <main className="w-full lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.length ? 
                                 <Card paginatedProducts={categories} cartSelector={cartSelector} /> :
                                 <p className="t text-gray-600 mt-2 text-center">No Products Available</p>
                            }
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}