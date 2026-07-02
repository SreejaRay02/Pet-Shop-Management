import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

// Components
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/dialogs/FormModal';
import ConfirmDialog from '../../components/dialogs/ConfirmDialog';
import { PageHeader } from '../../components/layout/PageHeader';

// Hooks
import { usePetFoods } from '../../hooks/queries/usePetFoods';
import { useCreatePetFood, useUpdatePetFood, useDeletePetFood, useUpdateFoodQuantity } from '../../hooks/mutations/usePetFoodMutations';
import { petFoodSchema } from '../../validations/schemas';
import { formatCurrency } from '../../utils/helpers';
import FoodTable from '../../components/tables/FoodTable';
import FoodForm from '../../components/forms/FoodForm';


// A constant list of types of food
const FOOD_TYPES = ['Dry', 'Wet', 'Flakes', 'Pellets', 'Hay', 'Other'];

export default function ManageFoods() {
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
  
  // Specific state for the "Quick Update Quantity" feature
  const [qtyItem, setQtyItem] = useState(null);
  const [newQty, setNewQty] = useState('');
  
  const { data = [], isLoading, refetch } = usePetFoods();
  
  const create = useCreatePetFood();
  const update = useUpdatePetFood();
  const remove = useDeletePetFood();
  const updateQty = useUpdateFoodQuantity();

  const handleQtyUpdate = () => {
    if (qtyItem && newQty !== '') {
      updateQty.mutate({ id: qtyItem.id, quantity: parseInt(newQty, 10) });
      setQtyItem(null);
      setNewQty('');
      setSuccessMessage("Stock updated successfully!");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      brand: '',
      type: '',
      quantity: '',
      price: ''
    },
    validationSchema: petFoodSchema,
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

  return (
    <div className="container p-0" fluid >
      
      {successMessage && <div className="alert alert-success m-3" >{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger m-3" >{errorMessage}</div>}
      <PageHeader 
        title="Manage Pet Foods" 
        subtitle={`${data.length} food items`} 
        action={openCreate} 
        actionLabel="Add Food" 
        actionIcon="plus-lg" 
      />
      
      <FoodTable data={data} isLoading={isLoading} refetch={refetch} setQtyItem={setQtyItem} setNewQty={setNewQty} openEdit={openEdit} setDeleteId={setDeleteId} />

      <FormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editItem ? 'Edit Pet Food' : 'Add Pet Food'} 
        onSubmit={formik.handleSubmit} 
        loading={create.isPending || update.isPending}
      >
        <FoodForm formik={formik} editItem={editItem} />
      </FormModal>

      {/* Special Dialog for quickly updating just the stock quantity */}
      {qtyItem && (
        <div className="modal d-block"  tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-sm modal-dialog-centered" >
            <div className="modal-content" >
              <div className="modal-header" >
                <h5 className="modal-title fs-5" >Update Stock</h5>
              </div>
              <div className="modal-body" >
                <p className="text-muted small mb-3" >{qtyItem?.name}</p>
                <div className="mb-3" >
                  <label className="form-label" >New Quantity</label>
                  <input className="form-control form-control-sm" 
                    type="number" 
                    value={newQty} 
                     onChange={(e) => setNewQty(e.target.value)} 
                  />
                </div>
              </div>
              <div className="modal-footer" >
                <button className="btn btn-secondary"  onClick={() => setQtyItem(null)}>Cancel</button>
                <button className="btn btn-primary"  onClick={handleQtyUpdate} disabled={updateQty.isPending}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { remove.mutate(deleteId); setDeleteId(null); }} 
        title="Delete Food Item" 
        message="Are you sure you want to delete this food item?" 
        loading={remove.isPending} 
      />
    </div>
  );
}
