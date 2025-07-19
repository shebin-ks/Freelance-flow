import React from 'react';

export interface Stage {
    name: string;
    key: 'inquiry' | 'proposal_sent' | 'contract_signed' | 'payment_done';
    count: number;
}

const colorMap: Record<Stage['key'], string> = {
    inquiry: 'bg-blue-500',
    proposal_sent: 'bg-yellow-500',
    contract_signed: 'bg-purple-500',
    payment_done: 'bg-green-500',
};

interface PipelineOverviewCardProps {
    stage: Stage;
    percentage: number;
}

const PipelineOverviewCard: React.FC<PipelineOverviewCardProps> = ({ stage, percentage }) => {
    return (
        <div className="flex justify-between mb-5">
            <div className="flex items-center gap-2 font-medium text-gray-600">
                <div className={`w-3 h-3 ${colorMap[stage.key]} rounded-full`} />
                <span>{stage.name}</span>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{stage.count}</p>
                <div className="flex justify-between w-40 h-3 bg-gray-200 rounded-full">
                    <div
                        className={`h-full rounded-full ${colorMap[stage.key]}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PipelineOverviewCard;
