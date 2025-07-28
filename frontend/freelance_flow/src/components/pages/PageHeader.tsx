import { Plus } from 'lucide-react'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'


interface PageHeaderProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    subtitle: string,
    btnText: string
    uploadBtn?: string
    setIsUpload?: React.Dispatch<React.SetStateAction<boolean>>,

}

const PageHeader: React.FC<PageHeaderProps> = ({ setIsModelOpen, title, subtitle, btnText, uploadBtn, setIsUpload }) => {

    const { user } = useAppSelector(state => state.auth)


    return (
        <div className='flex flex-col gap-5 justify-between md:flex-row md:items-center'>
            <div>
                <h1 className='font-bold text-3xl'>
                    {title}
                </h1>
                <p className='text-gray-600 mt-1'>
                    {subtitle}
                </p>
            </div>
            <div className={`flex gap-4 ${user && user.role === 'viewer' ? 'hidden' : ''}`}>
                {uploadBtn && <button
                    onClick={
                        () => {
                            setIsUpload ? setIsUpload(true) : ''
                            setIsModelOpen(true)
                        }
                    }
                    className='flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700'>
                    <Plus className='w-4 h-4 mr-2' />
                    {uploadBtn}
                </button>}
                <button
                    onClick={() => setIsModelOpen(true)}

                    className='flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700'>
                    <Plus className='w-4 h-4 mr-2' />
                    {btnText}
                </button>

            </div>
        </div>
    )
}

export default PageHeader