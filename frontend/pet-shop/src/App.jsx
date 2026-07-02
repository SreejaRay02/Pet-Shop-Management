import "./App.css";
import { useFormik } from "formik";
import GroomingForm from "./components/forms/GroomingForm";
import VaccinationForm from "./components/forms/VaccinationForm";
import TransactionForm from "./components/forms/TransactionForm";
import FoodForm from "./components/forms/FoodForm";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/Register";
import ManageGrooming from "./pages/admin/ManageGrooming";
import CustomerProfile from "./pages/customer/Profile";
import ManageAddresses from "./pages/admin/ManageAddresses";
import ManageCustomers from "./pages/admin/ManageCustomers";

function App() {
	return (
		<BrowserRouter>
			<nav style={{ padding: "20px", display: "flex", gap: "20px" }}>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/grooming">Manage Grooming</Link>
				<Link to="/addresses">Manage Addresses</Link>
				<Link to="/customers">Manage Customers</Link>
			</nav>

			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/grooming" element={<ManageGrooming />} />
				<Route path="/customer/profile" element={<CustomerProfile />} />
				<Route path="/addresses" element={<ManageAddresses />} />
				<Route path="customers" element={<ManageCustomers />} />

				<Route path="*" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
