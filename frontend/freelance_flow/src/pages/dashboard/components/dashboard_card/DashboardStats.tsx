import React, { useEffect } from 'react';
import { Users, DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

import DashboardCard, { type Stat } from './DashboardCard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getDashboardSummary } from '../../../../redux/features/dashboard/dashboardThunk';

const DashboardStats: React.FC = () => {
    const dispatch = useAppDispatch();

    const summary = useAppSelector(state => state.dashboard.summary);
    const fetchStatus = useAppSelector(state => state.dashboard.fetchStatus);



    const getChangeType = (value: number): 'increase' | 'decrease' | 'neutral' => {
        if (value > 0) return 'increase';
        if (value < 0) return 'decrease';
        return 'neutral';
    };
    const getTrendIcon = (value: number) => {
        return value >= 0 ? TrendingUp : TrendingDown;
    };

    const stats: Stat[] = [
        {
            title: 'Total Leads',
            value: summary ? summary.totalLeads : '--',
            icon: Users,
            change: summary ? `${summary.totalLeadsGrowth}%` : '--',
            changeType: getChangeType(summary?.totalLeadsGrowth ?? 0),
            color: 'blue',
        },
        {
            title: 'Monthly Revenue',
            value: summary ? `₹${summary.monthlyRevenue.toLocaleString()}` : '--',
            icon: DollarSign,
            change: summary ? `${summary.monthlyRevenueGrowth}%` : '--',
            changeType: getChangeType(summary?.monthlyRevenueGrowth ?? 0),
            color: 'green',
        },
        {
            title: 'Upcoming Follow-ups',
            value: summary ? summary.upcomingFollowUps : '--',
            icon: Calendar,
            change: summary ? `${summary.overdueFollowUps} overdue` : '--',
            changeType: summary?.overdueFollowUps && summary.overdueFollowUps > 0 ? 'decrease' : 'neutral',
            color: 'orange',

        },
        {
            title: 'Total Revenue',
            value: summary ? `₹${summary.totalRevenue.toLocaleString()}` : '--',
            icon: getTrendIcon(summary?.totalRevenueGrowth ?? 0),
            change: summary ? `${summary.totalRevenueGrowth}%` : '--',
            changeType: getChangeType(summary?.totalRevenueGrowth ?? 0),
            color: 'purple',

        },
    ];

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(getDashboardSummary());
        }
    }, [dispatch, fetchStatus]);

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        stat={stat}
                        loading={fetchStatus === 'loading'}
                        error={fetchStatus === 'failed'}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
