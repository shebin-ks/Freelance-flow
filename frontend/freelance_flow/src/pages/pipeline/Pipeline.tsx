import React, { useState } from 'react'
import PageHeader from '../../components/pages/PageHeader'
import Model from '../../components/Model'
import AddLead from '../leads/add_lead/AddLead'
import { CalendarCheck, Send, FileSignature, CheckCircle2 } from 'lucide-react';
import PageDashboard from '../../components/pages/PageDashboard'
import PipelineDetail from './pipeline_detail/PipelineDetail';
import { useAppSelector } from '../../hooks/reduxHooks';

const Pipeline: React.FC = () => {
  const [isModelOpen, setIsModelOpen] = useState(false)

  const { totalInquiry, totalContractSigned, totalProposalSent, totalPaymentDone } = useAppSelector(state => state.leads)

  
  
  const data = [
    {
      title: 'Inquiry',
      value: totalInquiry,
      icon: CalendarCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Proposal Sent',
      value: totalProposalSent,
      icon: Send,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      title: 'Contract Signed',
      value: totalContractSigned,
      icon: FileSignature,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Payment Done',
      value: totalPaymentDone,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
  ];


  return (
    <div className='mx-4 py-6 space-y-8 '>
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Sales Pipeline"
        subtitle='Track leads through your sales process'
        btnText='Add Lead'
      />
      <PageDashboard data={data} />

      <PipelineDetail />

      <Model isModelOpen={isModelOpen} >
        <AddLead setIsModelOpen={setIsModelOpen} />
      </Model>
    </div>
  )
}

export default Pipeline