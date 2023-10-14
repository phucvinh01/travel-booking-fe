import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import moment from 'moment';
import ModalEditEmp from '../ModalEditEmp';

const TableCus = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({})
    const showModal = (record) => {
        setState(record)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Năm sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.ngaySinh) - Date.parse(b.ngaySinh),
            render: (_, { ngaySinh }) => (
                <>
                    {<span>{moment(ngaySinh).format('MM/DD/YYYY')}</span>}
                </>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            render: (_, { gioiTinh }) => (
                <>
                    {<span>{gioiTinh ? "Nam" : "Nữ"}</span>}
                </>
            )
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
                    <Button icon={<EyeFilled />} />
                </Space>
            ),
        },
    ];
    const { data } = props
    return (
        <>
            <Table style={{
                width: 1000
            }} pagination={{
                position: ['bottomCenter']
            }} columns={columns} dataSource={data} />

        </>
    )
}
export default TableCus; 