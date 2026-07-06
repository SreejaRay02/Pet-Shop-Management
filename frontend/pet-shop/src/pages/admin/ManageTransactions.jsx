import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';

import FormModal from '../../components/dialogs/FormModal';
import { PageHeader } from '../../components/layout/PageHeader';

import { useTransactions } from '../../hooks/queries/useTransactions';
import { useCreateTransaction, useUpdateTransaction } from '../../hooks/mutations/useTransactionMutations';
import { useCustomers } from '../../hooks/queries/useCustomers';
import { usePets } from '../../hooks/queries/usePets';
import { transactionSchema } from '../../validations/schemas';
import TransactionTable from '../../components/tables/TransactionTable';
import TransactionForm from '../../components/forms/TransactionForm';

export default function ManageTransactions() {

  // Alert messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Clear alerts automatically after a few seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  // Manage modal and selected transaction
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch transactions, customers and pets
  const { data = [], isLoading, refetch } = useTransactions();
  const { data: customers = [] } = useCustomers();
  const { data: pets = [] } = usePets();

  // Mutation hooks
  const create = useCreateTransaction();
  const update = useUpdateTransaction();

  // Formik configuration
  const formik = useFormik({
    initialValues: {},

    validationSchema: transactionSchema,

    // Handle both add and edit operations
    onSubmit: async (values) => {
      if (editItem) {
        await update.mutateAsync({
          id: editItem.id,
          data: values,
        });
      } else {
        await create.mutateAsync(values);
      }

      setModalOpen(false);
      setSuccessMessage("Operation successful!");
    },
  });

  // Extract commonly used Formik functions
  const { setValues, setTouched, handleSubmit } = formik;

  // Open the form to create a new transaction
  const openCreate = useCallback(() => {
    // Fill some default values
    setValues({ transaction_date: new Date().toISOString().slice(0, 10), transaction_status: 'Success'});
    setTouched({});
    setEditItem(null);
    setModalOpen(true);
  }, [setValues, setTouched]);

  // Open the form with existing transaction details
  const openEdit = useCallback((item) => {
    setValues(item);
    setTouched({});
    setEditItem(item);
    setModalOpen(true);
  }, [setValues, setTouched]);

  return (
    <div className="container p-0" fluid>

      {/* Success and error alerts */}
      {successMessage && (
        <div className="alert alert-success m-3"> {successMessage} </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger m-3"> {errorMessage} </div>
      )}

      {/* Page heading */}
      <PageHeader
        title="Manage Transactions"
        subtitle={`${data.length} transactions`}
        action={openCreate}
        actionLabel="Add Transaction"
        actionIcon="plus-lg"
      />

      {/* Transactions list */}
      <TransactionTable
        data={data}
        isLoading={isLoading}
        refetch={refetch}
        customers={customers}
        pets={pets}
        openEdit={openEdit}
      />

      {/* Add/Edit transaction form */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Transaction' : 'New Transaction'}
        onSubmit={handleSubmit}
        loading={create.isPending || update.isPending}
      >
        <TransactionForm
          formik={formik}
          editItem={editItem}
          customers={customers}
          pets={pets}
        />
      </FormModal>

    </div>
  );
}