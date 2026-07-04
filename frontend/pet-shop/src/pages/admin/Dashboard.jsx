import React, { useMemo } from 'react';

// Charting library components
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Data hooks
import { useDashboardMetrics as useDashboard, useRevenueByMonth as useDashboardRevenue } from '../../hooks/queries/useDashboard';

// Components and Helpers
import StatCard from '../../components/cards/StatCard';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import { PageHeader } from '../../components/layout/PageHeader';

// Colors for the pie chart
const COLORS = ['#6C63FF', '#FF6584', '#00C896', '#FFB347', '#4ECDC4'];

export default function AdminDashboard() {
  // Fetch dashboard data
  const { data: metrics, isLoading } = useDashboard();
  const { data: revenue = [] } = useDashboardRevenue();

  // Define the data for our StatCards using bootstrap icon classes
  const stats = useMemo(() => [
    { title: 'Total Pets', value: metrics?.totalPets ?? 0, icon: 'bi-box-seam', color: 'primary' },
    { title: 'Total Customers', value: metrics?.totalCustomers ?? 0, icon: 'bi-people', color: 'secondary' },
    { title: 'Total Suppliers', value: metrics?.totalSuppliers ?? 0, icon: 'bi-truck', color: 'warning' },
    { title: 'Total Employees', value: metrics?.totalEmployees ?? 0, icon: 'bi-person-badge', color: 'success' },
    { title: 'Total Transactions', value: metrics?.totalTransactions ?? 0, icon: 'bi-receipt', color: 'primary' },
    { title: 'Total Revenue', value: formatCurrency(metrics?.totalRevenue ?? 0), icon: 'bi-currency-rupee', color: 'success', subtitle: 'From successful transactions' },
    { title: 'Successful Tx', value: metrics?.successfulTransactions ?? 0, icon: 'bi-check-circle', color: 'success' },
    { title: 'Failed Tx', value: metrics?.failedTransactions ?? 0, icon: 'bi-x-circle', color: 'danger' },
  ], [metrics]);

  // Define data for the Pie Chart
  const pieData = useMemo(() => [
    { name: 'Successful', value: metrics?.successfulTransactions ?? 0 },
    { name: 'Failed', value: metrics?.failedTransactions ?? 0 },
  ], [metrics]);

  // Show a spinner while the API is loading
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Overview of your pet shop operations" />

      {/* Top Section: Stat Cards Grid */}
      <div className="row g-4 mb-4" >
        {stats.map((s) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={s.title}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* Middle Section: Charts */}
      <div className="row g-4 mb-4" >

        {/* Left Chart: Monthly Revenue (Bar Chart) */}
        <div className="col-12 col-md-8"  >
          <div className="card h-100 shadow-sm border-0" >
            <div className="card-body" >
              <h5 className="card-title fw-bold mb-4" >Monthly Revenue</h5>

              {revenue.length === 0 ? (
                <div className="text-muted text-center py-5" >No revenue data yet</div>
              ) : (
                // ResponsiveContainer makes the chart scale to fit its parent Card
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    {/* Format the Y-axis labels to look like "₹50k" */}
                    <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="revenue" fill="#6C63FF" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Right Chart: Transaction Status (Pie Chart) */}
        <div className="col-12 col-md-4"  >
          <div className="card h-100 shadow-sm border-0" >
            <div className="card-body" >
              <h5 className="card-title fw-bold mb-4" >Transaction Status</h5>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    outerRadius={95}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {/* Loop through our colors array to color each pie slice */}
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Transactions Table */}
      <div className="card shadow-sm border-0" >
        <div className="card-body" >
          <h5 className="card-title fw-bold mb-4" >Recent Transactions</h5>
          <div className="table-responsive" >
            {/* We use a standard Bootstrap table here */}
            <table className="table table-hover align-middle mb-0" >
              <thead className="table-light" >
                <tr>
                  {['ID', 'Customer', 'Pet', 'Date', 'Amount', 'Status'].map((h) => (
                    <th className="text-nowrap" key={h} >{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(metrics?.recentTransactions || []).map((tx) => (
                  <tr key={tx.id}>
                    <td>#{tx.id}</td>
                    <td>Customer #{tx.customer_id}</td>
                    <td>Pet #{tx.pet_id}</td>
                    <td>{formatDate(tx.transaction_date)}</td>
                    <td className="fw-bold" >{formatCurrency(tx.amount)}</td>
                    <td>
                      <span className={` ${`badge bg-${tx.transaction_status === 'error' ? 'danger' : statusColor(tx.transaction_status)}`}`.trim()} >
                        {tx.transaction_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

