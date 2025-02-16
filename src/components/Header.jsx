import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../context/CartContext";
import { UserProgressContext } from "../context/UserProgressContext";

const Header = () => {
    const { items } = useContext(CartContext);
    const {showCart} = useContext(UserProgressContext);
    let totalCartItems = items.reduce(
        (totalNumberOfCartItems, item) =>
            (totalNumberOfCartItems += item.quantity),
        0
    );

    function handleShowCart(){
      showCart()
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="food app logo" />
                <h1>ReactMeal</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly>Cart({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;
