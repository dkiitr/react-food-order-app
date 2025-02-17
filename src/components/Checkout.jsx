import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { UserProgressContext } from "../context/UserProgressContext";
import { CartContext } from "../context/CartContext";
import { currencyFormatter } from "../utils/currency-formatter";
import Input from "./Input";
import Button from "./UI/Button";

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    let totalCartPrice = cartCtx.items.reduce(
        (totalPrice, item) => (totalPrice += item.quantity * item.price),
        0
    );

    function handleCheckoutClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        console.log(customerData);

        fetch("http://localhost:3000/orders", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            }),
        });
    }
    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleCheckoutClose}
        >
            <form onSubmit={handleSubmit}>
                <h2> Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalCartPrice)}</p>
                <Input label="Full Name" id="name" type="text" />
                <div className="control-row">
                    <Input label="Email Address" id="email" type="email" />
                    <Input
                        label="Contact Number"
                        id="contact-number"
                        type="text"
                    />
                </div>

                <Input label="Address" id="address" type="text" />
                <div className="control-row">
                    <Input label="Pin Code" type="text" id="pincode" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button
                        type="button"
                        onClick={handleCheckoutClose}
                        textOnly
                    >
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;
