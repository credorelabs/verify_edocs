import React from 'react'
import NavBar from './NavBar'

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className='min-h-screen'>
                <NavBar />
                <main className="flex flex-col justify-between p-24">
                    {children}
                </main>
            </div>
        </>
    )
}

export default PageLayout