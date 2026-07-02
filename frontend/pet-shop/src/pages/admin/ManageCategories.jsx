import React, { useState, useEffect } from 'react';

// Form validation
import { useFormik } from 'formik';

// Components
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';

// Hooks
import { useCategories } from '../../hooks/queries/useCategories';
import { useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../hooks/mutations/useCategoryMutations';
import { categorySchema } from '../../validations/schemas';

export default function ManageCategories() {
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

  // State for controlling modals
  const [modalOpen, setModalOpen] = useState(false); // Controls the Add/Edit form
  const [editItem, setEditItem] = useState(null); // Stores which category we are currently editing
  const [deleteId, setDeleteId] = useState(null); // Stores which ID we are about to delete

  // Data fetching and mutations
  const { data = [], isLoading, refetch } = useCategories();
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const remove = useDeleteCategory();

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: categorySchema,
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
  const columns = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Category Name', sortable: true },
    {
      field: 'actions', headerName: 'Actions', sortable: false,
      renderCell: (row) => (
        <div className="d-flex gap-2" >
          
            <button className="btn btn-outline-primary btn-sm"  onClick={() => openEdit(row)}>
              <i className="bi bi-pencil" ></i>
            </button>
          
          
            <button className="btn btn-outline-danger btn-sm"  onClick={() => setDeleteId(row.id)}>
              <i className="bi bi-trash" ></i>
            </button>
          
        </div>
      ),
    },
  ];

  return (
    <div className="container p-0" fluid >
      
      {successMessage && <div className="alert alert-success m-3" >{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger m-3" >{errorMessage}</div>}
      <PageHeader 
        title="Manage Categories" 
        subtitle={`${data.length} categories`} 
        action={openCreate} 
        actionLabel="Add Category" 
        actionIcon="plus-lg" 
      />
      
      <DataTable 
        columns={columns} 
        data={data} 
        loading={isLoading} 
        onRefresh={refetch} 
      />

      {/* The Add/Edit Form Modal */}
      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editItem ? 'Edit Category' : 'Add Category'} 
        onSubmit={formik.handleSubmit} 
        loading={create.isPending || update.isPending}
      >
        <div className="mb-3" >
          <label className="form-label" >Category Name</label>
          <input className={` ${`form-control ${formik.touched.name && !!formik.errors.name ? 'is-invalid' : ''}`}`.trim()} 
            type="text" 
            name="name" value={formik.values.name || ''} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
          <div className="invalid-feedback" >
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
      </FormModal>

      {/* The Delete Confirmation Modal */}
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { 
          remove.mutate(deleteId); // Delete it
          setDeleteId(null); // Close the modal
        }} 
        title="Delete Category" 
        message="Are you sure you want to delete this category?" 
        loading={remove.isPending} 
      />
    </div>
  );
}

