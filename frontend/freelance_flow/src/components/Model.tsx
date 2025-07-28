import React from 'react'


interface ModelProps {
    isModelOpen: boolean
    children: React.ReactNode
}

const Model: React.FC<ModelProps> = ({ isModelOpen, children }) => {
    console.log("render");
    
    if (!isModelOpen) return null
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50' style={{ 'backgroundColor': 'rgba(0,0,0,0.8)' }}>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-6'>

                {children}
            </div>
        </div>
    )
}

export default Model