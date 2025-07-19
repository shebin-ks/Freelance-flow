import React from 'react';
import { ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react';

export interface Stat {
    title: string;
    value: number | string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: LucideIcon;
    color: 'blue' | 'green' | 'orange' | 'purple';
}

const colorMap = {
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
    },
    green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
    },
    orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
    },
    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
    },
};

const DashboardCard: React.FC<{ stat: Stat, loading: boolean, error: boolean }> = ({ stat, loading, error }) => {
    const { title, value, change, changeType, icon: Icon, color } = stat;
    const { bg, text } = colorMap[color];

    return (
        <div className="bg-white flex justify-between items-center px-4 py-6 rounded-md border border-gray-100 shadow-sm">
            <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>

                {loading ? (
                    <div className="mt-2 h-7 w-24 bg-gray-100 animate-pulse rounded-md"></div>
                ) : error ? (
                    <p className="text-sm text-red-600 mt-2"> ------- </p>
                ) : (
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                )}

                {!loading && !error && (
                    <div className="flex items-center mt-2">
                        {changeType === 'increase' && <ArrowUp className="w-4 h-4 text-green-500 mr-1" />}
                        {changeType === 'decrease' && <ArrowDown className="w-4 h-4 text-red-500 mr-1" />}
                        <span
                            className={`text-sm font-medium ${changeType === 'increase'
                                ? 'text-green-600'
                                : changeType === 'decrease'
                                    ? 'text-red-600'
                                    : 'text-gray-600'
                                }`}
                        >
                            {change}
                        </span>
                    </div>
                )}
            </div>
            <div className={`p-3 rounded-lg ${bg}`}>
                <Icon className={`w-6 h-6 ${text}`} />
            </div>
        </div>
    );
};

export default DashboardCard;
