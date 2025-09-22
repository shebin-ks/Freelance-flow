import React, {  useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'

const MainLayout: React.FC = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='h-screen flex bg-gray-50 overflow-hidden'>
            <ToastContainer position="top-center" autoClose={3000} />

            <div
                className={`
                    fixed z-40 h-full w-64 bg-white shadow-md transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:static lg:translate-x-0
                `}
            >
                <Sidebar onMenuClick={() => setSidebarOpen(false)} />
            </div>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 lg:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <main className="flex-1 p-6 bg-white overflow-y-scroll">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout