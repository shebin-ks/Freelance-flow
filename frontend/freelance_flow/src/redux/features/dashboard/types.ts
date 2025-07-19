



// -------- SLICE TYPES ------------




export interface DashboardState {
    summary: DashboardSummary | null;
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchError: string | null;
}


// ------ API TYPES ---------------

export interface DashboardSummary {
    totalContacts: number;
    totalContactsGrowth: number;
    totalRevenue: number;
    totalRevenueGrowth: number;
    monthlyRevenue: number;
    monthlyRevenueGrowth: number;
    upcomingFollowUps: number;
    overdueFollowUps: number;
}


export interface DashboardSummaryResponse {
    success: boolean;
    message: string;
    summary: DashboardSummary
}