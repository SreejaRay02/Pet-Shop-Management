import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';
import { useSuppliers } from '../../hooks/queries/useSuppliers';
import { useAddresses } from '../../hooks/queries/useAddresses';
import { useCreateSupplier, useUpdateSupplier, useDeleteSupplier } from '../../hooks/mutations/useSupplierMutations';
import { supplierSchema } from '../../validations/schemas';
import SupplierTable from '../../components/tables/SupplierTable';
import SupplierForm from '../../components/forms/SupplierForm';


export default function ManageSuppliers() {
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
  
  const { data = [], isLoading, refetch } = useSuppliers();
  const { data: addresses = [] } = useAddresses(); // Needed for dropdown
  
  const create = useCreateSupplier();
  const update = useUpdateSupplier();
  const remove = useDeleteSupplier();

  const formik = useFormik({
    initialValues: {
      name: '',
      contact_person: '',
      phone_number: '',
      email: '',
      address_id: ''
    },
    validationSchema: supplierSchema,
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
        title="Manage Suppliers" 
        subtitle={`${data.length} suppliers`} 
        action={openCreate} 
        actionLabel="Add Supplier" 
        actionIcon="plus-lg" 
      />
      
      <SupplierTable data={data} isLoading={isLoading} refetch={refetch} openEdit={openEdit} setDeleteId={setDeleteId} />
      
      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editItem ? 'Edit Supplier' : 'Add Supplier'} 
        onSubmit={handleSubmit} 
        loading={create.isPending || update.isPending}
      >
        <SupplierForm formik={formik} editItem={editItem} addresses={addresses} />
      </FormModal>
      
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { remove.mutate(deleteId); setDeleteId(null); }} 
        title="Delete Supplier" 
        message="Are you sure you want to delete this supplier?" 
        loading={remove.isPending} 
      />
    </div>
  );
}