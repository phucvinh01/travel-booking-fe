import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Space } from 'antd'

const AdminLayout = () => {
    return (
        <>
            <Space direction='horizontal'>
                <Header />
                <Outlet />
            </Space>

        </>
    )
}

export default AdminLayout