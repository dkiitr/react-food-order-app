import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/CartContext";
import { currencyFormatter } from "../utils/currency-formatter";
import Button from "./UI/Button";
import { UserProgressContext } from "../context/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    let totalCartPrice = cartCtx.items.reduce(
        (totalPrice, item) => (totalPrice += item.quantity * item.price),
        0
    );

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGotoCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={
                userProgressCtx.progress === "cart" ? handleCloseCart : null
            }
        >
            <h2>Your Cart</h2>
            {cartCtx.items.length === 0 && <p>Your Cart is empty...</p>}
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(totalCartPrice)}
            </p>
            <p className="modal-actions">
                <Button onClick={handleCloseCart} textOnly>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGotoCheckout}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    );
};

export default Cart;
