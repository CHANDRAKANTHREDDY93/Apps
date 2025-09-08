import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { dismissCartAlerts } from "store/reducer/cart-reducer";
import { dismissHomeAlerts } from "store/reducer/home-reducer";


export default function Alert() {
    const [isShowAlert, setShowAlert] = useState<boolean>(false);
    const dispatch = useDispatch();
    const errorBanner = useSelector((state) => {
        const homeErrors = state.homePageReducer?.errorResponses || [];
        const cartErrors = state.cartReducer?.errorResponses || [];
        return [...homeErrors, ...cartErrors];
    });

    const dismissAlert = (alert) => {
        console.log(alert);
        if (alert.source === 'home') {
            dispatch(dismissHomeAlerts(alert));
        } else if (alert.source === 'cart') {
            dispatch(dismissCartAlerts(alert));
        }
    };

    return (<>
        {
            isShowAlert &&
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg m-2" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
                </div>
            </div>
        }
        {
            errorBanner.map(item => (
                <div id="alert-1" className="flex items-center p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 m-2" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                        {item.error}
                    </div>
                    <button type="button"
                        className="ms-auto -mx-1.5 -my-1.5 text-red-800 rounded-lg focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
                        data-dismiss-target="#alert-1" aria-label="Close"
                        onClick={() => dismissAlert(item)}>
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            ))
        }
    </>

    )
}