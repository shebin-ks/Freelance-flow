import React, { useState } from 'react'
import PageHeader from '../../components/pages/PageHeader'
import Model from '../../components/Model'
import { DollarSign, Calendar, BarChart3 } from 'lucide-react';
import PageDashboard from '../../components/pages/PageDashboard';
import { useAppSelector } from '../../hooks/reduxHooks';
import PaymentDetail from './payment_detail/PaymentDetail';
import AddPayment from './add_payment/AddPayment';

const Revenue: React.FC = () => {
  const {
    totalRevenue,
    thisMonth,
    totalTransactions,
  } = useAppSelector(state => state.payments);

  const data = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'This Month',
      value: thisMonth,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Transactions',
      value: totalTransactions,
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  const [isModelOpen, setIsModelOpen] = useState(false)

  return (
    <div className='mx-4 py-6 space-y-8 '>
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Revenue Tracking"
        subtitle='Monitor your earnings and financial performance'
        btnText='Add Revenue'
      />
      <PageDashboard
        data={data}
        mdCols={3}
      />

      {/* <TopClients /> */}
      <PaymentDetail />


      <Model isModelOpen={isModelOpen} >
        <AddPayment setIsModelOpen={setIsModelOpen} />
      </Model>
    </div>
  )
}

export default Revenue