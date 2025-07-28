import { Menu } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import LogoutButtton from './widgets/LogoutButtton';


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
};

interface NavbarProps {
    onMenuClick: () => void
}


const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const location = useLocation();
    const pageTitle = routeTitles[location.pathname] || 'Page';

    const { user } = useAppSelector(state => state.auth)

    return (
        <header className="bg-white px-6 py-4 my-4 shadow-md flex justify-between items-center">

            <div className='flex gap-2'>
                <button onClick={onMenuClick} className='lg:hidden cursor-pointer'>
                    <Menu />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-6">
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
