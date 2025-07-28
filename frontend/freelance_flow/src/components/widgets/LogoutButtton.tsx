import React from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { clearRedux } from '../../redux/features/clearReducer'
import { logout } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const LogoutButtton: React.FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    return (
        <button onClick={
            async () => {
                dispatch(clearRedux());

                dispatch(logout())
                navigate('/auth')
            }
        }
            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className=''>Logout</span>
        </button>
    )
}

export default LogoutButtton