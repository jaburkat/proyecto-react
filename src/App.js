import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { NavBar } from "./components/NavBar/NavBar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemCount } from "./components/ItemCount/ItemCount";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import { CartProvider } from "./components/Context/CartContext";
import { CartScreen } from "./components/CartScreen/CartScreen";
import { Checkout } from "./components/Checkout/Checkout";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/categoria/:categoryId" element={<ItemListContainer />}/>
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
