import { Breadcrumb, Button, Card, Table } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import formatCurrency from '../util/formatCurrency'
import { getOrderByIdCustomer } from '../Axios/Order'
import { getOneCusTomerByIdAccoutn } from '../Axios/customer'
const Order = () => {

    const [orders, setOrders] = useState([])
    const [state, setState] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tours = useSelector((state) => state.tour.tours.data);
    const [info, setInfo] = useState({})

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const user = useSelector((state) => state.auth.login.currentUser);


    const getOrder = async (userId) => {
        let r = await getOrderByIdCustomer(userId);
        if (r) {
            setOrders(r)
        }
    }

    const getInfo = async () => {
        try {
            let r = await getOneCusTomerByIdAccoutn(user.idTaiKhoan)
            if (r) {
                setInfo(r)
            }
        } catch (error) {
            message.error(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [user])

    useEffect(() => {
        if (info) {
            getOrder(info?.idKhachHang)
        }
    }, [info])

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idDatTour',
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'ngayDat',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.ngayDat) - Date.parse(b.ngayDat),
            render: (_, { ngayDat }) => (
                <>
                    {<span>{moment(ngayDat).format('MM/DD/YYYY')}</span>}
                </>
            )
        },
        {
            title: 'Tên tour',
            dataIndex: 'maTour',
            render: (text, record) => {
                const comparisonItem = tours.find(item => item.idTour === record.maTour);
                return comparisonItem?.tenTour;
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            filters: [
                { text: 'Chờ khởi hành', value: true },
                { text: 'Đã hoàn thành', value: false },
            ],
            onFilter: (value, record) => record.trangThai.startsWith(value),
            render: (_, { trangThai }) => (
                <>
                    {<span>{trangThai ? "Chờ khởi hành" : "Đã hoàn thành"}</span>}
                </>
            ),
            width: '20%',
        },
        {
            title: 'Xem chi tiết',
            key: 'action',
            render: (_, record) => (
                <Button key={record._id} onClick={() => { setState(record), showModal() }} type='text' block icon={<EyeOutlined />} />

                //<ModalDetailOrder state={ record } />
            ),
        },
    ];
    return (
        <>
            <div className='container' style={{ marginTop: "150px" }}>
                <div className='row'>
                    <div className='col-4'>

                        <img className='w-100 rounded-3' height={400} src='https://i.pinimg.com/564x/4f/34/d2/4f34d2dad8546b06aeb42f8e067ef733.jpg'>

                        </img>
                    </div>
                    <div className='col-8'>
                        <Breadcrumb className='mb-3'
                            items={[
                                {
                                    title: <Link to={'/'}>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Lịch sử đặt hàng</span>,
                                },
                            ]}
                        />
                        <h2>Đơn hàng</h2>
                        <Table pagination={false} dataSource={orders} columns={columns}></Table>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Order