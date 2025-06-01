import * as React from "react";
import { LoadingPopup } from "./loading-popup";

interface LoadingContextType {
    isLoading: boolean;
    message: string;
    showLoading: (message?: string) => void;
    hideLoading: () => void;
}

const LoadingContext = React.createContext<LoadingContextType>({
    isLoading: false,
    message: "",
    showLoading: () => {},
    hideLoading: () => {},
});

export const useLoading = () => React.useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = React.useState({
        isLoading: false,
        message: "Loading...",
    });

    const showLoading = React.useCallback((message = "Loading...") => {
        setState({ isLoading: true, message });
    }, []);

    const hideLoading = React.useCallback(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
    }, []);

    const value = React.useMemo(
        () => ({
            ...state,
            showLoading,
            hideLoading,
        }),
        [state, showLoading, hideLoading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
            <LoadingPopup isLoading={state.isLoading} message={state.message} />
        </LoadingContext.Provider>
    );
};
