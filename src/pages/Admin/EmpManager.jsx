import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { Export } from 'phosphor-react'
import React from 'react'
import ModalCreateEmp from '../../components/ModalCreateEmp'

const EmpManager = () => {
    return (
        <main style={ { marginTop: "90px", minHeight: "100vh" } }>
            <section>
                <Space>
                    <ModalCreateEmp />
                    <Button size='large' icon={ <Export size={ 16 } weight="fill" /> } style={ { backgroundColor: "yellowgreen" } }>
                        Xuất danh sách nhân viên hiện tại
                    </Button>
                    <Button size='large' icon={ <PlusCircleOutlined /> } style={ { backgroundColor: "palegoldenrod" } }>
                        Tại một tài khoản
                    </Button>
                </Space>
            </section>
        </main>
    )
}

export default EmpManager