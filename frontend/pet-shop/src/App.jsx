import "./App.css";
import { useFormik } from "formik";
import GroomingForm from "./components/forms/GroomingForm";
import VaccinationForm from "./components/forms/VaccinationForm";
import TransactionForm from "./components/forms/TransactionForm";
import FoodForm from "./components/forms/FoodForm";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/Register";
import ManageGrooming from "./pages/admin/ManageGrooming";


function App() {
	return (
		<BrowserRouter>
			<ManageGrooming />
			<LoginPage />
		</BrowserRouter>
	);	
}

export default App;
