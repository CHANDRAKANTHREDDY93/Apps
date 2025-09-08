import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from 'store/reducer/category-reducer';

export default function SideNavCard({ productSelector = {} as any, categorySelector }) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const dispatch = useDispatch<any>();

    const handleCategoryClick = (category: string) => {
        dispatch(setCategory({
            products: productSelector[category],
            category: category
        }));
    }

    return (
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
            {/* Category Dropdown */}
            <h3 className="font-bold mb-2 text-gray-800 text-base sm:text-lg">Select A Category</h3>
            <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full px-3 py-2 flex items-center justify-between bg-gray-300 cursor-pointer rounded-md"
            >
                <span className="font-semibold text-gray-800 capitalize text-sm sm:text-base">
                    {categorySelector.includes('_') ? categorySelector.replace('_', ' & ') : categorySelector}
                </span>
                <i className={`fa fa-caret-down transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isCategoryOpen && Object.keys(productSelector)?.length > 0 && (
                <div className="mt-2">
                    <ul className="w-full flex flex-col gap-2 p-3 border border-gray-300 rounded-md bg-white shadow-sm">
                        {Object.keys(productSelector).map((category) => (
                            <li
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`cursor-pointer capitalize hover:text-blue-600 py-1 text-sm sm:text-base ${category === categorySelector ? 'font-bold text-emerald-500 underline' : 'text-gray-600'
                                    }`}
                            >
                                {category.includes('_') ? category.replace('_', ' & ') : category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Price Filter */}
            <div className="mt-6">
                <h3 className="font-bold mb-2 text-gray-800 text-base sm:text-lg">Prices</h3>

                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="w-full px-3 py-2 flex items-center justify-between bg-gray-300 cursor-pointer rounded-md"
                >
                    <span className="font-semibold text-gray-800 text-sm sm:text-base">Filter By Prices</span>
                    <i className={`fa fa-caret-down transition-transform ${isPriceOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isPriceOpen && (
                    <div className="mt-2">
                        <ul className="flex flex-col gap-2 p-3 border border-gray-300 rounded-md bg-white shadow-sm">
                            {[
                                'Under $5',
                                '$10 to $15',
                                '$15 to $20',
                                '$25 to $50',
                                '$50 to $100',
                                '$100 to $150',
                            ].map((price, index) => (
                                <li key={index} className="flex items-center text-gray-600 hover:text-blue-600 text-sm sm:text-base">
                                    <input type="checkbox" className="mr-2" /> {price}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

    );
}
