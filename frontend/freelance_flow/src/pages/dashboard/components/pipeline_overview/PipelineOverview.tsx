import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getPipelineOverview } from '../../../../redux/features/pipeline/pipelineThunk';
import PipelineOverviewCard, { type Stage } from './pipelineOverviewCard';
import LoadingIcon from '../../../../components/widgets/LoadingIcon';



const PipelineOverview: React.FC = () => {
    const dispatch = useAppDispatch();

    const overview = useAppSelector(state => state.pipeline.overview);
    const fetchStatus = useAppSelector(state => state.pipeline.fetchStatus);
    const fetchError = useAppSelector(state => state.pipeline.fetchError);

    const stages: Stage[] = overview
        ? [
            { name: 'Inquiry', key: 'inquiry', count: overview.inquiry },
            { name: 'Proposal Sent', key: 'proposal_sent', count: overview.proposal_sent },
            { name: 'Contract Signed', key: 'contract_signed', count: overview.contract_signed },
            { name: 'Payment Done', key: 'payment_done', count: overview.payment_done }, 
        ]
        : [];

    const total = stages.reduce((sum, stage) => sum + stage.count, 0);

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(getPipelineOverview());
        }
    }, [fetchStatus, dispatch]);

    return (
        <div className="border border-gray-100 shadow-sm rounded-md p-4 w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Pipeline Overview</h2>

            <div className="min-h-[120px] flex flex-col justify-center items-center space-y-3 w-full">
                {fetchStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <LoadingIcon />
                        <p className="text-sm text-gray-500">Loading pipeline overview...</p>
                    </div>
                )}

                {fetchStatus === 'failed' && (
                    <p className="text-sm text-red-600 text-center">
                        {fetchError || 'Failed to load pipeline overview.'}
                    </p>
                )}

                {fetchStatus === 'succeeded' && stages.length === 0 && (
                    <p className="text-sm text-gray-500 text-center">No pipeline data available.</p>
                )}

                {fetchStatus === 'succeeded' && stages.length > 0 && (
                    <div className="w-full">
                        {stages.map(stage => {
                            const percentage = total > 0 ? (stage.count / total) * 100 : 0;
                            return (
                                <PipelineOverviewCard
                                    key={stage.key}
                                    stage={stage}
                                    percentage={percentage}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PipelineOverview;
