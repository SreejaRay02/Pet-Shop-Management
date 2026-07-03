import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/Register";

import ManageGrooming from "./pages/admin/ManageGrooming";
import ManageAddresses from "./pages/admin/ManageAddresses";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageCategories from "./pages/admin/ManageCategories";
import ManagePets from "./pages/admin/ManagePets";

import CustomerProfile from "./pages/customer/Profile";

function App() {
	return (
		<BrowserRouter>
			<nav style={{ padding: "20px", display: "flex", gap: "20px" }}>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/grooming">Manage Grooming</Link>
				<Link to="/addresses">Manage Addresses</Link>
				<Link to="/customers">Manage Customers</Link>
				<Link to="/foods">Manage Foods</Link>
				<Link to="/categories">Manage Categories</Link>
				<Link to="/pets">Manage Pets</Link>
			</nav>

			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/grooming" element={<ManageGrooming />} />
				<Route path="/customer/profile" element={<CustomerProfile />} />
				<Route path="/addresses" element={<ManageAddresses />} />
				<Route path="/customers" element={<ManageCustomers />} />
				<Route path="/foods" element={<ManageFoods />} />
				<Route path="/categories" element={<ManageCategories />} />
				<Route path="/pets" element={<ManagePets />} />

				<Route path="*" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;