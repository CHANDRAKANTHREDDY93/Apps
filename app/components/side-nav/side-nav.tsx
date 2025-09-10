import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "store/reducer/cart-reducer";
import { setCategory } from "store/reducer/category-reducer";
import SideNavCard from "./side-nav-card";

export default function SideNav () {
    const dispatch = useDispatch<any>();
    const productSelector = useSelector(item => item.cartReducer)?.products || {};
    const categorySelector = useSelector(item => item.categoryReducer).category || 'fruits';
    
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
            {Object.keys(productSelector)?.length > 0 && (
                <div className="bg-gray-200 py-4 mx-1">
                    <SideNavCard productSelector={productSelector} categorySelector={categorySelector} />
                </div>
            )}
        </>
    );
}