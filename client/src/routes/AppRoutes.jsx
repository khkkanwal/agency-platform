import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/inquiries" element={<Inquiries />} />
        <Route path="/admin/manage-bookings" element={<ManageBookings />} />
        <Route path="/admin/manage-portfolios" element={<ManagePortfolios />} />
        <Route path="/admin/manage-services" element={<ManageServices />} />
      </Routes>
    </Router>
  );
}
export default AppRoutes;
