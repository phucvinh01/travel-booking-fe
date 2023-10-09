import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const CustomerLayout = () => {
    return (
        <>
            <div className='container-fluid'>
                <Header />
                <Outlet />
                <Footer />
            </div>

        </>

    )
}

export default CustomerLayout