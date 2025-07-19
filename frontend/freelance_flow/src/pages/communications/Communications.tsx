import React, { useState } from 'react'
import PageHeader from '../../components/pages/PageHeader'
import Model from '../../components/Model'
import { MessageSquare, Phone, Users, Mail, AlertCircle } from 'lucide-react';
import PageDashboard from '../../components/pages/PageDashboard';
import CommunicationDetail from './communication_detail/CommunicationDetail';
import { useAppSelector } from '../../hooks/reduxHooks';
import AddCommunucation from './add_communications/AddCommunication';

const Communications: React.FC = () => {

  const [isModelOpen, setIsModelOpen] = useState(false)

  const {
    countAll,
    countFollowupNeeded,
    countCall,
    countEmail,
    countMeeting,
  } = useAppSelector(state => state.communication);

  const data = [
    {
      title: 'Total',
      value: countAll,
      icon: MessageSquare,
      color: 'text-gray-600',
      bg: 'bg-gray-100'
    },
    {
      title: 'Calls',
      value: countCall,
      icon: Phone,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Emails',
      value: countEmail,
      icon: Mail,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Meetings',
      value: countMeeting,
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Follow-ups',
      value: countFollowupNeeded,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
  ];


  return (
    <div className='mx-4 py-6 space-y-8 '>
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Communication Logs"
        subtitle='Track all client interactions and conversations'
        btnText='Log Communiction'
      />
      <PageDashboard
        data={data}
        mdCols={5}
      />
      <CommunicationDetail />


      <Model isModelOpen={isModelOpen} >
        <AddCommunucation setIsModelOpen={setIsModelOpen} />
      </Model>
    </div>
  )
}

export default Communications