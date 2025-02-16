import React from "react";
import { currencyFormatter } from "../utils/currency-formatter";

const CartItem = ({ item, onIncrease, onDecrease }) => {
    // console.log("cartitem....");
    return (
        <li className="cart-item">
            <p>
                {item.name}- {item.quantity} X{" "}
                {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{item.quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
};

export default CartItem;
