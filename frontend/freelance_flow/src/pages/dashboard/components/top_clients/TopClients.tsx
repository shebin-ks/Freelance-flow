import React, { useEffect } from 'react'
import TopClientCard from './TopClientCard'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { getTopLeads } from '../../../../redux/features/leads/leadThunk'
import LoadingIcon from '../../../../components/widgets/LoadingIcon'

const TopClients: React.FC = () => {

    const dispatch = useAppDispatch()

    const topLeads = useAppSelector(state => state.leads.topLeads)
    const topLeadsStatus = useAppSelector(state => state.leads.topLeadsStatus)
    const topLeadserror = useAppSelector(state => state.leads.topLeadserror)

    useEffect(() => {
        if (topLeadsStatus === 'idle') {
            dispatch(getTopLeads())
        }
    }, [topLeadsStatus, dispatch])

    return (
        <div className="border border-gray-100 shadow-sm rounded-md p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg text-gray-800">Top Clients by Revenue</h1>
            </div>

            <div className="min-h-[120px] flex flex-col justify-center items-center space-y-3">
                {topLeadsStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <LoadingIcon />

                        <p className="text-sm text-gray-500 text-center">Loading top clients...</p>
                    </div>
                )}

                {topLeadsStatus === 'failed' && (
                    <p className="text-sm text-red-600 text-center">{topLeadserror || 'Failed to load top clients.'}</p>
                )}

                {topLeadsStatus === 'succeeded' && topLeads.length === 0 && (
                    <p className="text-sm text-gray-500 text-center">No top clients found.</p>
                )}

                {topLeadsStatus === 'succeeded' && topLeads.length > 0 &&
                    (
                        <div className="space-y-4 w-full">
                            {topLeads.slice(0, 3).map((lead, index) => (
                                <TopClientCard key={lead.id} index={index} lead={lead} />
                            ))}
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default TopClients