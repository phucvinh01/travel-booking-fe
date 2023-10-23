import { Breadcrumb, Button, Card, Table } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import formatCurrency from '../util/formatCurrency'
import { getOrderByIdCustomer } from '../Axios/Order'
import { getOneCusTomerByIdAccoutn } from '../Axios/customer'
import ModalDetaiOrder from '../components/ModalDetailOrder'
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
            width: '20%'
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'ngayDat',
            defaultSortOrder: 'descend',
            sorter: (a, b) => Date.parse(a.ngayDat) - Date.parse(b.ngayDat),
            render: (_, { ngayDat }) => (
                <>
                    { <span>{ moment(ngayDat).format('MM/DD/YYYY') }</span> }
                </>
            ),
            width: '20%'
        },
        {
            title: 'Tên tour',
            dataIndex: 'maTour',
            render: (text, record) => {
                const comparisonItem = tours.find(item => item.idTour === record.maTour);
                return comparisonItem?.tenTour;
            }
            ,
            width: '40%'
        },
        {
            title: 'Trạng thái',
            render: (_, { ngayDat }) => (
                <>
                    { <span>{ moment(ngayDat).isAfter(moment().format('MM/DD/YYYY')) ? "Chờ khởi hành" : "Đã hoàn thành" }</span> }
                </>
            ),
            width: '10%',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'trangThai',
            key: 'trangThai',
            filters: [
                { text: 'Chưa thanh toán', value: false },
                { text: 'Đã thanh toán', value: true },
            ],
            onFilter: (value, record) => record.trangThai.startsWith(value),
            render: (_, { trangThai }) => (
                <>
                    { <span>{ trangThai ? "Đã thanh toán" : "Chưa thanh toán" }</span> }
                </>
            ),
            width: '10%',
        },
        {
            title: 'Xem chi tiết',
            key: 'action',
            render: (_, record) => (
                // <Button key={ record._id } onClick={ () => { setState(record), showModal() } } type='text' block icon={ <EyeOutlined /> } />
                <ModalDetaiOrder data={ record }  />
            ),
            width: '10%',
        },
    ];
    return (
        <>
            <div className='container' style={ { marginTop: "150px" } }>
                <div className='row'>
                    <div className='col-12'>
                        <Breadcrumb className='mb-3'
                            items={ [
                                {
                                    title: <Link to={ '/' }>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Lịch sử đặt hàng</span>,
                                },
                            ] }
                        />
                        <h2>Đơn hàng</h2>
                        <Table size='large' pagination={ true } dataSource={ orders } columns={ columns }></Table>

                    </div>
                    {/* <div className='col-6'>
                        <Breadcrumb className='mb-3'
                            items={ [
                                {
                                    title: <Link to={ '/' }>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Lịch sử đặt hàng</span>,
                                },
                            ] }
                        />
                        <h2>Đơn hàng</h2>
                        <Table size='large' pagination={ true } dataSource={ orders } columns={ columns }></Table>

                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Order