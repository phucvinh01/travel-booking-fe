import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { EditFilled, EyeFilled } from '@ant-design/icons';
import moment from 'moment';
import ModalEditEmp from '../ModalEditEmp';
import formatCurrency from '../../util/formatCurrency';
import { useSelector } from 'react-redux';
import ModalScludeTour from '../ModalScludeTour/inde';
import ModalEditTour from '../ModalEditTour';

const TableTour = (props) => {
    const cate = useSelector((state) => state.cate.category.data);

    console.log(cate);

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
            dataIndex: 'tenTour',
            key: 'tenTour',
            render: (text) => <a>{ text }</a>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
        },
        {
            title: 'Chi phí',
            dataIndex: 'chiPhi',
            key: 'chiPhi',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.chiPhi - b.chiPhi,
            render: (_, { chiPhi }) => (
                <>
                    { <p className='text-danger text-end'>{ formatCurrency.format(chiPhi) }</p> }
                </>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (_, { trangThai }) => (
                <>
                    { <span>{ trangThai ? "Đang hoạt động" : "Ngừng hoạt động" }</span> }
                </>
            )
        },
        {
            title: 'Loại',
            dataIndex: 'maLoaiTour',
            key: 'maLoaiTour',
            filters: cate.map((item) => {
                return (
                    {
                        text: item.tenLoai,
                        value: item.id
                    }
                )
            }),
            onFilter: (value, record) => record.maLoaiTour.startsWith(value),
            render: (text, record) => {
                const comparisonItem = cate.find(item => item.id === record.maLoaiTour);
                return comparisonItem.tenLoai;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <ModalScludeTour id={ record.id } />
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
            <ModalEditTour handleCancel={ handleCancel } handleOk={ handleOk } isModalOpen={ isModalOpen } state={ state } />

        </>
    )
}
export default TableTour;