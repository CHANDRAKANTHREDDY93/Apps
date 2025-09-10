import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE_URL;

export default function Search() {
    const [query, setQuery] = useState<string>();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [results, setResults] = useState<any>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const debounce = (func: any, delay = 5000) => {
        let timer: any;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay)
        }
    }

    const onSearch = async (val: string) => {
        if (val.length > 1) {
            try {
                const res = await fetch(`${apiBase}/api/search/?name=${val}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                const response = await res.json();
                if (res.status === 200) {
                    setShowDropdown(true);
                    setResults(response);
                }

            } catch (error) {
                console.error("Search failed:", error);
            }
        } else {
            setShowDropdown(false);
            setResults([]);
        }
    };

    //Memoize debounce so it's not recreated again
    const debouncedSearch = useMemo(
        () => debounce(onSearch, 500),
        [onSearch]
    )

    const handleChange = useCallback((event: Event) => {
        setQuery(event?.target.value);
        debouncedSearch(event.target.value);
    }, [debouncedSearch]);

    const handleClose = () => {
        setQuery('');
        setShowDropdown(false);
        setResults([]);
    }

    // Clear input on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setQuery(undefined);
                setShowDropdown(false);
                setResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div className="w-full flex m-1" ref={wrapperRef}>
                <form className="w-full items-center">
                    <label className="relative block w-full">
                        <i className="absolute fa fa-search top-2 m-1"></i>
                        <span className="sr-only">Search</span>
                        <input
                            className="block w-full rounded-md border border-gray-300 py-2 pr-3 pl-6 text-gray-700 shadow-sm placeholder:text-gray-400 placeholder:italic focus:border-sky-500 focus:outline focus:outline-sky-500 sm:text-sm dark:border-gray-600 dark:text-white"
                            placeholder="Search cart"
                            type="text"
                            value={query ?? ''}
                            onChange={event => handleChange(event)}
                            onPaste={event => handleChange(event)}
                            onCut={event => handleChange(event)}
                            name="search" />
                        {showDropdown && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                {results.length ? results.map((item: any, index: number) => (
                                    <div key={`${item.name}-${index}`}
                                        className="text-gray-700 cursor-pointer hover:bg-indigo-100 flex justify-between items-center py-1" onClick={() => {
                                            setQuery(item.name);
                                            setShowDropdown(false);
                                        }}>
                                        <li
                                            className="px-2 py-2"
                                            aria-label={item.name}>
                                            <i className="fa fa-search mr-1" aria-hidden="true"></i>
                                            {item.name}
                                        </li>
                                        <div className="font-bold mx-1 cursor-pointer px-1" onClick={handleClose}>
                                            <i className="fa fa-times"></i>
                                        </div>
                                    </div>
                                )) : <>
                                    <div className="flex justify-between text-gray-700 items-center">
                                        <li className=" px-4 py-2"> No Results Found </li>
                                        <div className="font-bold mx-1 cursor-pointer px-1" onClick={handleClose}>
                                            <i className="fa fa-times"></i>
                                        </div>
                                    </div>

                                </>}
                            </ul>
                        )}
                    </label>
                </form>
            </div>

        </>
    );
}