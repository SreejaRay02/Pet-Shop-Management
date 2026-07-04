import  { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';
import { useEmployees } from '../../hooks/queries/useEmployees';
import { useAddresses } from '../../hooks/queries/useAddresses';
import { useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '../../hooks/mutations/useEmployeeMutations';
import { employeeSchema } from '../../validations/schemas';
import EmployeeTable from '../../components/tables/EmployeeTable';
import EmployeeForm from '../../components/forms/EmployeeForm';


export default function ManageEmployees() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const { data = [], isLoading, refetch } = useEmployees();
  const { data: addresses = [] } = useAddresses();
  
  const create = useCreateEmployee();
  const update = useUpdateEmployee();
  const remove = useDeleteEmployee();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      position: '',
      hire_date: '',
      phone_number: '',
      email: '',
      address_id: '',
      role: ''
    },
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      if (editItem) {
        await update.mutateAsync({ id: editItem.id, data: values });
      } else {
        await create.mutateAsync(values);
      }
      setModalOpen(false);
      setSuccessMessage("Operation successful!");
    }
  });

  const { resetForm, setValues, setTouched, handleSubmit } = formik;

  const openCreate = useCallback(() => { 
    resetForm();
    setEditItem(null); 
    setModalOpen(true); 
  }, [resetForm]);
  
  const openEdit = useCallback((item) => { 
    setValues(item); 
    setTouched({}); 
    setEditItem(item); 
    setModalOpen(true); 
  }, [setValues, setTouched]);

  return (
    <div className="container p-0" fluid >
      
      {successMessage && <div className="alert alert-success m-3" >{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger m-3" >{errorMessage}</div>}
      <PageHeader 
        title="Manage Employees" 
        subtitle={`${data.length} employees`} 
        action={openCreate} 
        actionLabel="Add Employee" 
        actionIcon="plus-lg" 
      />
      
      <EmployeeTable data={data} isLoading={isLoading} refetch={refetch} openEdit={openEdit} setDeleteId={setDeleteId} />
      
      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editItem ? 'Edit Employee' : 'Add Employee'} 
        onSubmit={handleSubmit} 
        loading={create.isPending || update.isPending}
      >
        <EmployeeForm formik={formik} editItem={editItem} addresses={addresses} />
      </FormModal>
      
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { remove.mutate(deleteId); setDeleteId(null); }} 
        title="Delete Employee" 
        message="Are you sure you want to delete this employee?" 
        loading={remove.isPending} 
      />
    </div>
  );
}
