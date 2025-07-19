import React from 'react';
import type { LucideIcon } from 'lucide-react';
import PageDashboardCard from '../widgets/PageDashboardCard';


interface StatCard {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bg: string;
}
interface PageDashboardProps {
    data: StatCard[];
    mdCols?: number;
}

const mdColClassMap: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
};

const PageDashboard: React.FC<PageDashboardProps> = ({ data, mdCols = 4 }) => {
    const mdClass = mdColClassMap[mdCols] || 'md:grid-cols-4';

    return (
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${mdClass}`}>
            {data.map((stats, index) => (
                <PageDashboardCard key={index} stats={stats} />
            ))}
        </div>
    );
};

export default PageDashboard;
