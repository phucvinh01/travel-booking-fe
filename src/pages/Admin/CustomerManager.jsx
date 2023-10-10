import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { Export } from 'phosphor-react'
import React from 'react'

const CustomerManager = () => {
    return (
        <main style={ { marginTop: "90px", minHeight: "100vh" } }>
            <Space>
                <Button size='large' icon={ <Export size={ 16 } weight="fill" /> } style={ { backgroundColor: "palegoldenrod" } }>
                    Xuất danh sách khách hàng
                </Button>
            </Space>
        </main>
    )
}

export default CustomerManager