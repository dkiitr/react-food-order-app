import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./context/CartContext";
import UserProgressContextProvider from "./context/UserProgressContext";

function App() {
    return (
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <Meals />
                <Footer />
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserProgressContextProvider>
    );
}

export default App;
