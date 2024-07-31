import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import Payment from "./Pages/Payment/Payment.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Order from "./Pages/Orders/Order.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./componentes/protectedRoute/ProtectedRoute.jsx";

const stripePromise = loadStripe(
  "pk_test_51Pfv5PJbXvrEdYxO1rbvGVrI2DQt0xnNc1ebxebchz1KMr8f4rMMoOskfqciZfR8KD3srAHNnFrqP4QJFHGERjvw00OaXxcFfA"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="auth" element={<Auth />} />
        <Route
          path="/Payments"
          element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/Payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              msg={"you must log in to access your orders"}
              redirect={"/Order"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/catagory/:catagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
