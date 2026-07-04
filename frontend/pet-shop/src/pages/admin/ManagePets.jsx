import React, { useState, useEffect, useCallback } from 'react';

// Validation
import { useFormik } from 'formik';

// Components
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';

// Hooks
import { usePets } from '../../hooks/queries/usePets';
import { useCategories } from '../../hooks/queries/useCategories';
import { useCreatePet, useUpdatePet, useDeletePet } from '../../hooks/mutations/usePetMutations';

import { petSchema } from '../../validations/schemas';
import PetTable from '../../components/tables/PetTable';
import PetForm from '../../components/forms/PetForm';

export default function ManagePets() {
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
  const [editPet, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: pets = [], isLoading, refetch } = usePets();
  const { data: categories = [] } = useCategories();
  
  const createPet = useCreatePet();
  const updatePet = useUpdatePet();
  const deletePet = useDeletePet();

  const formik = useFormik({
    initialValues: {
      name: '',
      breed: '',
      age: '',
      price: '',
      category_id: '',
      description: '',
      image_url: ''
    },
    validationSchema: petSchema,
    onSubmit: async (values) => {
      if (editPet) {
        await updatePet.mutateAsync({ id: editPet.id, data: values });
      } else {
        await createPet.mutateAsync(values);
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
        title="Manage Pets" 
        subtitle={`${pets.length} pets in database`} 
        action={openCreate} 
        actionLabel="Add Pet" 
        actionIcon="plus-lg" 
      />
      
      <PetTable data={pets} isLoading={isLoading} refetch={refetch} categories={categories} openEdit={openEdit} setDeleteId={setDeleteId} />

      {/* Form Modal for Add/Edit */}
      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editPet ? 'Edit Pet' : 'Add New Pet'} 
        onSubmit={handleSubmit} 
        loading={createPet.isPending || updatePet.isPending}
      >
        <PetForm formik={formik} editPet={editPet} categories={categories} />
      </FormModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { 
          deletePet.mutate(deleteId); 
          setDeleteId(null); 
        }}
        title="Delete Pet"
        message="Are you sure you want to delete this pet? This action cannot be undone."
        loading={deletePet.isPending}
      />
    </div>
  );
}

