import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { dismissCartAlerts } from "store/reducer/cart-reducer";
import { dismissHomeAlerts } from "store/reducer/home-reducer";
import { dismissLoginAlerts } from "store/reducer/user-reducer";


export default function Alert() {
    const [isShowAlert, setShowAlert] = useState<boolean>(false);
    const dispatch = useDispatch();

    const selectHomeErrors = (state) => state.homePageReducer?.errorResponses || [];
    const selectCartErrors = (state) => state.cartReducer?.errorResponses || [];
    const selectLoginErrors = (state) => state.userReducer?.errorResponses || [];

    const selectErrorBanner = createSelector(
        [selectHomeErrors, selectCartErrors, selectLoginErrors],
        (homeErrors, cartErrors, loginErrors) => {
            const combined = [
                ...homeErrors,
                ...cartErrors,
                ...loginErrors
            ];

            // Only transform if combined errors actually changed
            return combined.map((err) => ({
                ...err,
                source:
                    homeErrors.includes(err) ? 'home' :
                        cartErrors.includes(err) ? 'cart' :
                            loginErrors.includes(err) ? 'login' :
                                'unknown'
            }));
        }
    );
    const errorBanner = useSelector(selectErrorBanner, shallowEqual);


    useEffect(() => {
        const timeoutIds = errorBanner.map((alert) =>
            setTimeout(() => {
                dismissAlert(alert); // dispatch Alert
            }, 5000) // dismiss after 5 seconds
        );

        return () => {
            timeoutIds.forEach(clearTimeout); // cleanup on unmount
        };
    }, [errorBanner]);

    const dismissAlert = (alert: any) => {
        if (alert.source === 'home') {
            dispatch(dismissHomeAlerts(alert));
        } else if (alert.source === 'cart') {
            dispatch(dismissCartAlerts(alert));
        } else if (alert.source === 'login') {
            dispatch(dismissLoginAlerts(alert));
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