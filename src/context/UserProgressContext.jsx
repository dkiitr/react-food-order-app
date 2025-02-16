import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: "",
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState("");

    function showCart() {
        setUserProgress("cart");
    }
    function hideCart() {
        setUserProgress("");
    }
    function showCheckout() {
        setUserProgress("checkout");
    }
    function hideCheckout() {
        setUserProgress("");
    }

    const userProgresstCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        hideCheckout,
        showCheckout,
    };

    // console.log(userProgresstCtx);
    return (
        <UserProgressContext.Provider value={userProgresstCtx}>
            {children}
        </UserProgressContext.Provider>
    );
};

export default UserProgressContextProvider;
