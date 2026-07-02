import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

// Components
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';

// Hooks
import { useGroomingServices } from '../../hooks/queries/useGroomingServices';
import { useCreateGroomingService, useUpdateGroomingService, useDeleteGroomingService } from '../../hooks/mutations/useGroomingMutations';
import { groomingSchema } from '../../validations/schemas';
import GroomingTable from '../../components/tables/GroomingTable';
import GroomingForm from '../../components/forms/GroomingForm';


export default function ManageGrooming() {
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

  const { data = [], isLoading, refetch } = useGroomingServices();
  const create = useCreateGroomingService();
  const update = useUpdateGroomingService();
  const remove = useDeleteGroomingService();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      available: true
    },
    validationSchema: groomingSchema,
    onSubmit: async (values) => {
      try {
        if (editItem) {
          await update.mutateAsync({ id: editItem.id, data: values });
        } else {
          await create.mutateAsync(values);
        }
        setModalOpen(false);
        setSuccessMessage("Operation successful!");
      } catch (error) {
        window.alert("API Error: " + (error.message || "Unknown error"));
        console.error("Form submit error", error);
      }
    }
  });

  const openCreate = () => { 
    formik.resetForm();
    setEditItem(null); 
    setModalOpen(true); 
  };
  
  const openEdit = (item) => { 
    formik.setValues(item); 
    formik.setTouched({}); 
    setEditItem(item); 
    setModalOpen(true); 
  };

  return (
    <div className="container p-0" fluid >

      {successMessage && <div className="alert alert-success m-3" >{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger m-3" >{errorMessage}</div>}
      <PageHeader
        title="Manage Grooming Services"
        subtitle={`${data.length} services`}
        action={openCreate}
        actionLabel="Add Service"
        actionIcon="plus-lg"
      />

      <GroomingTable data={data} isLoading={isLoading} refetch={refetch} openEdit={openEdit} setDeleteId={setDeleteId} />

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Service' : 'Add Grooming Service'}
        onSubmit={formik.handleSubmit}
        loading={create.isPending || update.isPending}
      >
        <GroomingForm formik={formik} />
      </FormModal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { remove.mutate(deleteId); setDeleteId(null); }}
        title="Delete Service"
        message="Are you sure you want to delete this grooming service?"
        loading={remove.isPending}
      />
    </div>
  );
}

