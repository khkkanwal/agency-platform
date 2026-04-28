import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {
  Home,
  Login,
  Register,
  Portfolio,
  Services,
  Contact,
  Dashboard,
  Inquiries,
  ManageBookings,
  ManagePortfolios,
  ManageServices,
  ManageBlogs,
  AdminLayout,
  Blog,
  SingleBlog,
} from "../pages";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-services" element={<ManageServices />} />
          <Route path="manage-portfolios" element={<ManagePortfolios />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-inquiries" element={<Inquiries />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default AppRoutes;
