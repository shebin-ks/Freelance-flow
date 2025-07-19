import React from 'react';
import {
    Users,
    Calendar,
    MessageSquare,
    DollarSign,
    Home,
    Target,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

const allNavigations = [
    { name: 'Dashboard', id: '', icon: Home },
    { name: 'Leads', id: 'leads', icon: Users },
    { name: 'Follow-ups', id: 'followups', icon: Calendar },
    { name: 'Pipeline', id: 'pipeline', icon: Target },
    { name: 'Communications', id: 'communications', icon: MessageSquare },
    { name: 'Revenue', id: 'revenue', icon: DollarSign, roles: ['admin', 'viewer'] },
    { name: 'Users', id: 'users', icon: Users, roles: ['admin', 'viewer'] },
];

interface SidebarProps {
    onMenuClick: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
    const { user } = useAppSelector(state => state.auth);

    const filteredNavigations = allNavigations.filter(nav => {
        if (nav.id === 'revenue') {
            return user?.role === 'admin' || user?.role === 'viewer';
        }
        if (nav.id === 'users') {
            return user?.role === 'admin' || user?.role === 'viewer';

        }
        return true;
    });
    return (
        <aside className="w-64 h-screen bg-white shadow-sm">
            <div className="border-b p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Target className="text-blue-800 w-6 h-6" />
                    <h2 className="font-bold text-xl text-gray-800">Freelance Flow</h2>
                </div>
                <X onClick={onMenuClick} className="lg:hidden w-5 h-5 text-gray-500 cursor-pointer" />
            </div>

            <nav className="p-4 flex flex-col gap-2">
                {filteredNavigations.map(({ name, icon: Icon, id }) => (
                    <NavLink
                        key={id}
                        onClick={onMenuClick}
                        to={`/${id}`}
                        className={({ isActive }) => `flex items-center gap-3 p-2 px-4 rounded cursor-pointer  text-gray-700 ${isActive ? 'bg-blue-100 border-r-5 border-blue-800 font-semibold' : 'hover:bg-gray-200'}`}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700 font-bold' : 'text-gray-500'}`} />
                                <span className={`font-medium ${isActive ? 'text-blue-700 font-extrabold' : ''}`}>{name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
