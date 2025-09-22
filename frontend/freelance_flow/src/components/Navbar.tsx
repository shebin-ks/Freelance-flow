import { Bell, Menu } from 'lucide-react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import LogoutButtton from './widgets/LogoutButtton';
import { Link } from 'react-router-dom';
import { loadNotifications } from '../redux/features/notification/notificationSlice';


const routeTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/leads': 'Leads',
    '/followups': 'Follow-ups',
    '/pipeline': 'Pipeline',
    '/communications': 'Communications',
    '/revenue': 'Revenue',
    '/reports': 'Reports',
    '/users': 'Users',
    '/settings': 'Settings',
    '/user-management': 'User Management',
    '/messages': 'Messages',
    '/notifications': 'Notifications'
};

interface NavbarProps {
    onMenuClick: () => void
}


const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const location = useLocation();
    const pageTitle = routeTitles[location.pathname] || 'Page';

    const { user } = useAppSelector(state => state.auth)

    const { fetchStatus } = useAppSelector(state => state.notification)
    const { notifications } = useAppSelector(state => state.notification)

    const dispatch = useAppDispatch()
    useEffect(() => {

        console.log(fetchStatus);


        if (fetchStatus === 'idle') {

            const saved = JSON.parse(localStorage.getItem('notifications') || '[]');
            dispatch(loadNotifications(saved));
        }

    }, [fetchStatus]);

    const unseenCount = notifications.filter(n => !n.seen).length;

    return (
        <header className="bg-white px-6 py-4 my-4 shadow-md flex justify-between items-center">

            <div className='flex gap-2'>
                <button onClick={onMenuClick} className='lg:hidden cursor-pointer'>
                    <Menu />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-6">

                <Link to="/notifications" className="relative group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out relative">
                        <Bell className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />

                        {unseenCount > 0 && (
                            <span className="absolute -top-0.5 -right-1 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none shadow">
                                {unseenCount}
                            </span>
                        )}
                    </div>
                </Link>
                <div className='hidden md:block'>
                    <LogoutButtton />
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex justify-center items-center rounded-full bg-blue-600 text-white font-medium">
                        {user?.name[0].toUpperCase() || 'R'}
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold">{user?.name || "NA"}</p>
                        <p className="text-gray-500">{user?.role || "NA"}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
