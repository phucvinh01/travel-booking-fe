import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import moment from 'moment';
import ModalEditEmp from '../ModalEditEmp';

const TableEmp = (props) => {

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
            dataIndex: 'tenNhanVien',
            key: 'tenNhanVien',
            render: (text) => <a>{ text }</a>,
        },
        {
            title: 'Năm sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.ngaySinh) - Date.parse(b.ngaySinh),
            render: (_, { ngaySinh }) => (
                <>
                    { <span>{ moment(ngaySinh).format('MM/DD/YYYY') }</span> }
                </>
            )
        },
        {
            title: 'Ngày vào làm',
            dataIndex: 'ngayVaoLam',
            key: 'ngayVaoLam',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.ngayVaoLam) - Date.parse(b.ngayVaoLam),
            render: (_, { ngayVaoLam }) => (
                <>
                    { <span>{ moment(ngayVaoLam).format('MM/DD/YYYY') }</span> }
                </>
            )
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            render: (_, { gioiTinh }) => (
                <>
                    { <span>{ gioiTinh ? "Nam" : "Nữ" }</span> }
                </>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diaChi',
            key: 'diaChi',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'maLoaiNhanVien',
            key: 'maLoaiNhanVien',
            filters: [
                {
                    text: 'Nhân viên tư vấn',
                    value: 2,
                },
                {
                    text: 'Hướng dẫn viên',
                    value: 3,
                },
            ],
            onFilter: (value, record) => record.maLoaiNhanVien.startsWith(value),
            render: (_, { maLoaiNhanVien }) => (
                <>
                    { <span>{ maLoaiNhanVien === "1" ? "Admin" : maLoaiNhanVien === "2" ?
                        "Nhân viên tư vấn" : "Hướng dẫn viên" }</span> }
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={ <EyeFilled /> } />
                    <Button onClick={ () => showModal(record) } icon={ <EditFilled /> } />
                </Space>
            ),
        },
    ];
    const { data } = props
    return (
        <>
            <Table pagination={ {
                position: ['bottomCenter']
            } } columns={ columns } dataSource={ data } />
            <ModalEditEmp isModalOpen={ isModalOpen } handleCancel={ handleCancel } handleOk={ handleOk } state={ state } />

        </>
    )
}
export default TableEmp;