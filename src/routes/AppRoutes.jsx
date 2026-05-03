import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import SettingsPanel from "../components/SettingsPanel";

const AppRoutes = ({ search }) => {
  return (
    <Routes>

      <Route path="/" element={<Home search={search} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/settings" element={<SettingsPanel />} />

    </Routes>
  );
};

export default AppRoutes;