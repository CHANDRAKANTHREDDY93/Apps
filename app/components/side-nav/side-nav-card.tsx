import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from 'store/reducer/category-reducer';

export default function SideNavCard({ productSelector, categorySelector }) {
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
        <div className="relative w-full">
            {/* Category Dropdown */}
            <h3 className="font-bold mb-2 text-gray-800">Select A Category</h3>
            <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full px-2.5 lg:py-1.5 xl:py-2 leading-sm flex items-center justify-between bg-[#cacaca] cursor-pointer rounded-t-2xs"
            >
                <h3 className="font-bold text-gray-800 capitalize">{categorySelector.includes('_') ? categorySelector.replace('_', ' & ') : categorySelector}</h3>
                <i className={`fa fa-caret-down ${isCategoryOpen ? 'transform rotate-180' : ''}`}></i>
            </button>

            {isCategoryOpen && (
                <div className="mb-2.5">
                    <ul className="z-10 w-full flex flex-col p-2.5 border-silverSurfer-200">
                        {Object.keys(productSelector).map(category => (
                            <li
                                key={category}
                                onClick={() => {
                                    handleCategoryClick(category);
                                }}
                                className={`mb-2 cursor-pointer capitalize underline hover:text-blue-600 py-1
                    ${category === categorySelector ? 'font-bold text-green-800' : 'text-gray-600'}`}
                            >
                                {category.includes('_') ? category.replace('_', ' & ') : category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Price Filter */}
            <div className="m-2">
                <h3 className="font-bold mb-2 text-gray-800">Prices</h3>
                <button
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    className="w-full px-2.5 lg:py-1.5 xl:py-2 leading-sm flex items-center justify-between bg-[#cacaca] cursor-pointer rounded-t-2xs"
                >
                    <h3 className="font-bold text-gray-800 whitespace-nowrap mr-8">Filter By Prices</h3>
                    <i className={`fa fa-caret-down ${isPriceOpen ? 'transform rotate-180' : ''}`}></i>
                </button>

                {isPriceOpen && (
                    <div className="mb-2.5">
                         <ul className="flex flex-col p-2.5 border-silverSurfer-200 rounded-2xs ">
                        {[
                            'Under $5',
                            '$10 to $15',
                            '$15 to $20',
                            '$25 to $50',
                            '$50 to $100',
                            '$100 to $150',
                        ].map((price, index) => (
                            <li
                                key={index}
                                className="mb-2 cursor-pointer text-gray-600 hover:text-blue-600 capitalize"
                            >
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
