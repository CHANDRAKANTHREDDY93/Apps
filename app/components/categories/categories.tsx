import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card";
import SideNav from "../side-nav/side-nav";
import { useEffect } from "react";
import { setCategory } from "store/reducer/category-reducer";
import { fetchProducts } from "store/reducer/cart-reducer";

export default function Categories() {
    const dispatch = useDispatch<any>();
    const productSelector = useSelector(item => item.cartReducer)?.products || {};
    const categorySelector = useSelector(item => item.categoryReducer).category || 'fruits';
    const categories = useSelector(item => item.categoryReducer).products || [];

    useEffect(() => {
        if (productSelector[categorySelector]?.length) {
            dispatch(setCategory({
                products: productSelector[categorySelector],
                category: categorySelector
            }));
        } else {
            dispatch(fetchProducts());
        }
    }, [dispatch, categorySelector, productSelector]);

    return (
        <>
            <div className="bg-gray-100 pt-2 pb-2 text-gray-800 flex mt-8">
                <SideNav />
                <div className="flex w-full p-2">
                    {
                        categories.length &&
                             (
                                <div className="flex flex-wrap">
                                    <Card paginatedProducts={categories} />
                                </div>
                            )
                    }
                </div>
            </div>
            <div>
                {/* Future enhancement: Display category-specific products here */}
            </div>
            <div>
                {/* Future enhancement: Pagination controls for categories */}
            </div>
        </>
    );
}