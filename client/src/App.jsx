import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Customer
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

// Seller
import Seller from "./pages/Seller";
import AddProduct from "./pages/AddProduct";

// Admin
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

import AdminProducts from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import Categories from "./pages/admin/Categories";
import Settings from "./pages/admin/Settings";

import AIChat from "./components/AIChat";


function App() {

return (

<Layout>

<Routes>


{/* Public */}

<Route
path="/"
element={<Home />}
/>

<Route
path="/about"
element={<About />}
/>

<Route
path="/contact"
element={<Contact />}
/>



{/* Authentication */}

<Route
path="/login"
element={<Login />}
/>

<Route
path="/register"
element={<Register />}
/>



{/* Customer */}

<Route
path="/products"
element={<Products />}
/>

<Route
path="/products/:id"
element={<ProductDetails />}
/>

<Route
path="/cart"
element={<Cart />}
/>

<Route
path="/checkout"
element={<Checkout />}
/>

<Route
path="/orders"
element={<Orders />}
/>

<Route
path="/profile"
element={<Profile />}
/>



{/* Seller */}

<Route
path="/seller/dashboard"
element={<Seller />}
/>

<Route
path="/seller/add-product"
element={<AddProduct />}
/>

<Route
path="/seller/edit-product/:id"
element={<AddProduct />}
/>



{/* Admin Login */}

<Route
path="/admin/login"
element={<AdminLogin />}
/>



{/* Admin */}

<Route
path="/admin"
element={
<AdminRoute>
<AdminLayout />
</AdminRoute>
}
>

<Route
index
element={<Admin />}
/>

<Route
path="products"
element={<AdminProducts />}
/>

<Route
path="users"
element={<Users />}
/>

<Route
path="orders"
element={<AdminOrders />}
/>

<Route
path="categories"
element={<Categories />}
/>

<Route
path="settings"
element={<Settings />}
/>


</Route>


</Routes>


<AIChat />

</Layout>

);

}


export default App;