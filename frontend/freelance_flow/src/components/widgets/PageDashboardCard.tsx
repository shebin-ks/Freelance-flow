import React from 'react';

interface DashboardStats {
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
    bg: string
}

const PageDashboardCard: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
    const Icon = stats.icon;

    return (
        <div className="flex items-center  px-4 py-6 border border-gray-100 rounded-md shadow-sm">
            <div className={`${stats.bg} p-2.5 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stats.color}`} />
            </div>
            <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{stats.title}</p>
                <span className="text-2xl font-semibold text-gray-900">{stats.value}</span>
            </div>
        </div>
    );
};

export default PageDashboardCard;
