import "./App.css";
import { useFormik } from "formik";
import GroomingForm from "./components/forms/GroomingForm";
import VaccinationForm from "./components/forms/VaccinationForm";
import TransactionForm from "./components/forms/TransactionForm";
import FoodForm from "./components/forms/FoodForm";

function App() {
  const formik = useFormik({
    initialValues: {
      // Grooming & Vaccination
      name: "",
      description: "",
      price: "",
      available: false,

      // Transaction
      customer_id: "",
      pet_id: "",
      transaction_date: "",
      amount: "",
      transaction_status: "Success",
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Dummy data for TransactionForm dropdowns

  const customers = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
    },

    {
      id: 2,
      first_name: "Mayank",
      last_name: "Raj",
    },
  ];

  const pets = [
    {
      id: 1,
      name: "Bruno",
      breed: "Labrador",
    },

    {
      id: 2,
      name: "Tommy",
      breed: "Beagle",
    },
  ];

  return (
    <div className="container mt-4">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="mb-3">Grooming Form</h2>
        <GroomingForm formik={formik} />
        <hr className="my-4" />
        <h2 className="mb-3">Vaccination Form</h2>
        <VaccinationForm formik={formik} />
        <hr className="my-4" />
        <h2 className="mb-3">Transaction Form</h2>
        <TransactionForm
          formik={formik}
          editItem={null}
          customers={customers}
          pets={pets}
        />
        <hr className="my-4" />
        <h2 className="mb-3">Food Form</h2>
        <FoodForm formik={formik} />
        <button type="submit" className="btn btn-primary mt-4">
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default App;
