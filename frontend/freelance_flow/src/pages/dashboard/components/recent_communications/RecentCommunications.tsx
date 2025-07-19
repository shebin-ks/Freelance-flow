import React, { useEffect } from 'react'
import RecentCommunicationsCard from './RecentCommunicationsCard'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { getCompanyCommunications } from '../../../../redux/features/communications/communicationThunk'
import LoadingIcon from '../../../../components/widgets/LoadingIcon'

const RecentCommunications: React.FC = () => {
    const dispatch = useAppDispatch()

    const communications = useAppSelector(state => state.communication.communications)
    const fetchStatus = useAppSelector(state => state.communication.fetchStatus)
    const fetchError = useAppSelector(state => state.communication.fetchError)


    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(getCompanyCommunications())
        }
    }, [fetchStatus, dispatch])

    return (
        <div className="border border-gray-100 shadow-sm rounded-md p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg text-gray-800">Recent Communications</h1>
            </div>

            <div className="min-h-[120px] flex flex-col justify-center items-center space-y-3">
                {fetchStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <LoadingIcon />

                        <p className="text-sm text-gray-500">Loading communications...</p>
                    </div>
                )}

                {fetchStatus === 'failed' && (
                    <p className="text-sm text-red-600 text-center">{fetchError || 'Failed to load communications.'}</p>
                )}

                {fetchStatus === 'succeeded' && communications.length === 0 && (
                    <p className="text-sm text-gray-500 text-center">No communications found.</p>
                )}

                {fetchStatus === 'succeeded' && communications.length > 0 && (
                    <div className="space-y-4 w-full">
                        {communications.slice(0, 3).map(comm => (
                            <RecentCommunicationsCard key={comm.id} communication={comm} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentCommunications