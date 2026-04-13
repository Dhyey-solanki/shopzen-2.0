import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/user/HomeDb";
import Login from "./pages/user/LoginPage";
import Register from "./pages/user/RegisterPage";
import Products from "./pages/user/ProductListPageDb";
import ProductDetails from "./pages/user/ProductDetailsPageDb";
import Cart from "./pages/user/CartPageFlow";
import Checkout from "./pages/user/CheckoutPageFlow";
import Payment from "./pages/user/PaymentPageFlow";
import PlaceOrder from "./pages/user/PlaceOrderPage";
import OrderSuccess from "./pages/user/OrderSuccessPage";
import MyOrders from "./pages/user/MyOrdersPageFlow";
import OrderHistory from "./pages/user/OrderHistoryPageFlow";
import OrderDetails from "./pages/user/OrderDetailsPageFlow";
import Profile from "./pages/user/ProfilePageFlow";
import EditProfile from "./pages/user/EditProfilePageFlow";
import Settings from "./pages/user/SettingsPageFlow";
import Wishlist from "./pages/user/WishlistPage";
import NotFound from "./pages/user/NotFoundPage";
import PaymentSuccessPage from "./pages/user/PaymentSuccessPageFlow";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboardPage";
import AdminProductlist from "./pages/admin/AdminProductListPageFlow";
import AdminAddProductPage from "./pages/admin/AdminAddProductPageFlow";
import AdminUserListPage from "./pages/admin/AdminUserListPage";
import AdminOrderListPage from "./pages/admin/AdminOrderListPageFlow";
import AdminPaymentListPage from "./pages/admin/AdminPaymentListPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPageFlow";
import AdminOrderManagePage from "./pages/admin/AdminOrderManagePageFlow";




function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/history"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />
          

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProductlist />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <AdminRoute>
                <AdminAddProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUserListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrderListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminRoute>
                <AdminPaymentListPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRoute>
                <AdminEditProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders/manage/:id"
            element={
              <AdminRoute>
                <AdminOrderManagePage />
              </AdminRoute>
            }
          />
          
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
