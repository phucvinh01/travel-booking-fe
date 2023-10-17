import React from 'react';
import { Space, Table, Button } from 'antd';;
import { EditFilled } from '@ant-design/icons';
import ModalEditHotel from '../ModalEditHotel';
import { useState } from 'react';

const TableHotel = (props) => {
    const columns = [
        {
            title: 'Tên khách sạn',
            dataIndex: 'tenKhachSan',
            key: 'tenKhachSan',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hạng sao',
            dataIndex: 'hangSao',
            key: 'hangSao',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.hangSao - b.hangSao,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            key: 'diaChi',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            key: 'soDienThoai',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)} icon={<EditFilled />}></Button>
                </Space>
            ),
        },

    ];
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [state, setState] = useState({})

    const showModal = (record) => {
        setState(record)
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Table style={{ width: "1000px" }
            } size='large' columns={columns} dataSource={props?.data} pagination={{
                position: ['bottomCenter']
            }} />;
            <ModalEditHotel isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} state={state} />
        </>
    )
}



export default TableHotel;