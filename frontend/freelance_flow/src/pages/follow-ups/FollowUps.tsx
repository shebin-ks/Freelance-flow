import React, { useState } from 'react'
import FollowUpDetail from './components/followup_detail/FollowUpDetail'
import Model from '../../components/Model'
import AddFollowup from './components/add_followup/AddFollowup'
import PageHeader from '../../components/pages/PageHeader'
import PageDashboard from '../../components/pages/PageDashboard'
import { Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { useAppSelector } from '../../hooks/reduxHooks'

const FollowUps: React.FC = () => {
  const [isModelOpen, setIsModelOpen] = useState(false)

  const { countAll, countUpcoming, countOverdue, countCompleted } = useAppSelector(state => state.reminders);

  const data = [
    {
      title: 'Total Follow-ups',
      value: countAll,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Upcoming',
      value: countUpcoming,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      title: 'Overdue',
      value: countOverdue,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    {
      title: 'Completed',
      value: countCompleted,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
  ];


  return (
    <div className='mx-4 py-6 space-y-8 '>
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Follow-up Reminders"
        subtitle='Stay on top of your client communications'
        btnText='Add Follow-up'
      />
      <PageDashboard data={data} />

      <FollowUpDetail />
      <Model isModelOpen={isModelOpen} >
        <AddFollowup setIsModelOpen={setIsModelOpen} />
      </Model>
    </div>
  )
}

export default FollowUps