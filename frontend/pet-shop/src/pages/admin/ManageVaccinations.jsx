import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';

// Components
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';

// Hooks
import { useVaccinations } from '../../hooks/queries/useVaccinations';
import { useCreateVaccination, useUpdateVaccination, useDeleteVaccination } from '../../hooks/mutations/useVaccinationMutations';
import { vaccinationSchema } from '../../validations/schemas';
import { formatCurrency } from '../../utils/helpers';
import VaccinationTable from '../../components/tables/VaccinationTable';
import VaccinationForm from '../../components/forms/VaccinationForm';


export default function ManageVaccinations() {
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
  
  const { data = [], isLoading, refetch } = useVaccinations();
  const create = useCreateVaccination();
  const update = useUpdateVaccination();
  const remove = useDeleteVaccination();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      available: true
    },
    validationSchema: vaccinationSchema,
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
        title="Manage Vaccinations" 
        subtitle={`${data.length} vaccinations`} 
        action={openCreate} 
        actionLabel="Add Vaccination" 
        actionIcon="plus-lg" 
      />
      
      <VaccinationTable data={data} isLoading={isLoading} refetch={refetch} openEdit={openEdit} setDeleteId={setDeleteId} />
      
      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editItem ? 'Edit Vaccination' : 'Add Vaccination'} 
        onSubmit={handleSubmit} 
        loading={create.isPending || update.isPending}
      >
        <VaccinationForm formik={formik} />
      </FormModal>
      
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { remove.mutate(deleteId); setDeleteId(null); }} 
        title="Delete Vaccination" 
        message="Are you sure you want to delete this vaccination?" 
        loading={remove.isPending} 
      />
    </div>
  );
}

