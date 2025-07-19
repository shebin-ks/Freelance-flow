export const BASE_URL = 'http://localhost:3000/api/v1';

export const API_ROUTES = {
    AUTH: {
        REGISTER: `/auth/register`,
        LOGIN: `/auth/login`,
        REFRESH_TOKEN: `/auth/refresh-token`,
        SEND_INVITE: `/auth/send-invite`,
        ACCEPT_INVITE: `/auth/accept-invite`,
        FORGOT_PASSWORD: `/auth/forgot-password`,
        RESET_PASSWORD: `/auth/reset-password`,
    },

    DASHBOARD: {
        SUMMARY: `/dashboard/summary`,
    },

    USERS: {
        GET_ALL: `/user/`,
        DELETE: `/user/profile`,
        UPDATE_STATUS: `/user/change-status`,
        MY_PROFILE: `/user/profile/me`,
    },
    PIPELINE: {
        OVERVIEW: `/pipeline/overview`,
    },

    LEADS: {
        CREATE: `/lead/create`,
        GET_ALL: `/lead/top-leads`,
        DELETE: `/lead/profile`,
        UPDATE_STATUS: `/lead/change-status`,
        TOP_LEADS: `/lead/top-leads`,
        UPLOAD_LEADS:'/lead/import'
    },

    REMINDERS: {
        CREATE: `/reminder/create`,
        MARK_COMPLETE: (reminderId: number) => `/reminder/${reminderId}/complete`,
        GET_ALL: `/reminder`,
        GET_UPCOMING: `/reminder/upcomming`,
    },

    PAYMENTS: {
        GET_ALL: `/payment/`,
        CREATE: `/payment/create`,
    },

    COMMUNICATIONS: {
        GET_BY_COMPANY: `/communication/`,
        CREATE: `/communication/create`,
        GET_BY_LEAD: (leadId: number) => `/communication/${leadId}`,
        GET_BY_EMPLOYEE: (userId: number) => `/communication/employee/${userId}`,
    },
};
