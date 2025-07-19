import React from 'react'
import DashboardStats from './components/dashboard_card/DashboardStats'
import PipelineOverview from './components/pipeline_overview/PipelineOverview'
import UpcommingFollowups from './components/upcomming_followups/UpcommingFollowups'
import TopClients from './components/top_clients/TopClients'
import RecentCommunications from './components/recent_communications/RecentCommunications'
import { useAppSelector } from '../../hooks/reduxHooks'

const Dashboard: React.FC = () => {

    const { user } = useAppSelector(state => state.auth)
    return (
        <div className='mx-4 py-6 space-y-8'>
            <DashboardStats />
            <PipelineOverview />
            <UpcommingFollowups />
            {user && user.role !== 'assistant'&&
                < TopClients />
            }

            <RecentCommunications />

        </div>
    )
}

export default Dashboard