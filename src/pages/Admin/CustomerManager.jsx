import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { Export } from 'phosphor-react'
import React from 'react'
import TableCus from '../../components/TableCus'
import { getAllCustomer } from '../../Axios/customer'
import { useState } from 'react'
import { useEffect } from 'react'

const CustomerManager = () => {

    const [data, setData] = useState([])

    const getAllCustomers = async () => {
        let r = await getAllCustomer()
        if (r) {
            setData(r)
        }
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    console.log(data);

    return (
        <main style={{ marginTop: "90px", minHeight: "100vh" }}>
            <Space>
                <Button size='large' icon={<Export size={16} weight="fill" />} style={{ backgroundColor: "palegoldenrod" }}>
                    Xuất danh sách khách hàng
                </Button>
            </Space>
            <section>
                <TableCus data={data} />
            </section>
        </main>
    )
}

export default CustomerManager