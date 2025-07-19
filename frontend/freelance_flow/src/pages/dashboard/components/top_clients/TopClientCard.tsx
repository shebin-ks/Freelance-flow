import React from 'react'
import type { TopLead } from '../../../../redux/features/leads/types'

const TopClientCard: React.FC<{ lead: TopLead, index: number }> = ({ lead, index }) => {
    return (
        <div className='flex bg-gray-50 px-4 py-4 rounded-md justify-between items-center cursor-pointer hover:shadow-md  hover:bg-gray-100'>
            <div className='flex items-center gap-3'>
                <div className='
                    w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 
                    rounded-full flex items-center 
                    justify-center text-white text-sm font-semibold'
                >
                    {index + 1}
                </div>
                <div>
                    <h1 className='text-sm font-medium text-gray-800'>{lead.name}</h1>
                    <p className='text-sm text-gray-600'>
                        {lead.leadCompanyName || 'No company'}
                    </p>
                </div>
            </div>
            <div className='text-right'>
                <p className='font-bold text-sm text-gray-900'>
                    ₹{lead.totalPaid?.toLocaleString() ?? 0}
                </p>
                <p className='text-xs text-gray-600'>Total Revenue</p>
            </div>
        </div>
    )
}

export default TopClientCard