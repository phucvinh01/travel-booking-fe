import React from 'react';
import { Space, Table, Button, Popconfirm, message } from 'antd';;
import { DeleteFilled, DeleteOutlined, DeleteTwoTone, EditFilled } from '@ant-design/icons';
import ModalEditHotel from '../ModalEditHotel';
import { useState } from 'react';
import Axios from '../../Axios/Axios'
import { getHotel } from '../../redux/api';
import { useDispatch } from 'react-redux';

const TableHotel = (props) => {
    const dispatch = useDispatch()
    const confirm = async (e) => {
        let r = await Axios.delete(`/KhachSan/delete-khach-san?Id=${e}`)
        if (r) {
            getHotel(dispatch)
            message.success('Xóa thành công');
        }
    };
    const cancel = (e) => {
        message.error('Click on No');
    };
    const columns = [
        {
            title: 'Tên khách sạn',
            dataIndex: 'tenKhachSan',
            key: 'tenKhachSan',
            render: (text) => <a>{ text }</a>,
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
                    <Button onClick={ () => showModal(record) } icon={ <EditFilled /> }></Button>
                    <Popconfirm
                        title={ `Delete the hotel` }
                        description={ `Bạn có chắc muốn xóa ${record.tenKhachSan} ?` }
                        onConfirm={ () => confirm(record.idKhachSan) }
                        onCancel={ cancel }
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={ { style: { backgroundColor: "red" } } }
                    >
                        <Button danger icon={ <DeleteOutlined /> }></Button>
                    </Popconfirm>
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
            <Table style={ { width: "1000px" }
            } size='large' columns={ columns } dataSource={ props?.data } pagination={ {
                position: ['bottomCenter']
            } } />
            <ModalEditHotel isModalOpen={ isModalOpen } handleCancel={ handleCancel } handleOk={ handleOk } state={ state } />
        </>
    )
}



export default TableHotel;