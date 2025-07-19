import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute: React.FC = () => {
    const { accessToken, user } = useAppSelector(state => state.auth)
    
    if (!accessToken) {
        return <Navigate to='/auth' replace />
    }

    useEffect(() => {
        if (user && user.status !== 'active') {
            toast.error(`${user.name} is not an active user. Please contact admin.`);
        }
    }, [user]);



    if (user?.status !== 'active') {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />
}

export default ProtectedRoute