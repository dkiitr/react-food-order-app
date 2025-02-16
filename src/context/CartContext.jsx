import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

//useReducer hook initialization and reducerFn logic...

const initialCartState = { items: [] };
function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        //update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const updatedItems = [...state.items];
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return {
            ...state,
            items: updatedItems,
        };
    }
    if (action.type === "REMOVE_ITEM") {
        //update the state to remove a meal item
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

const CartContextProvider = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initialCartState
    );

    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id });
    }

    const cartCtx = {
        items: cartState.items,
        addItem,
        removeItem,
    };

    // console.log(cartCtx);
    return (
        <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
    );
};

export default CartContextProvider;
