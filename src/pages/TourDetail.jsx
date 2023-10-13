import { Breadcrumb, Card, DatePicker, Empty, Space, Steps, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NavigationArrow, Clock, Car, Planet } from 'phosphor-react'
import { CheckCircleFilled } from '@ant-design/icons'
import { getScheduleTour, getTourByCategory, getTourById } from '../Axios/Tour'
import formatCurrency from '../util/formatCurrency'
import ModalOrder from '../components/ModalOrder'
import moment from 'moment'







const TourDetail = () => {
    const id = useParams()
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [count, setCount] = useState(1)
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };


    const getData = async (id) => {
        let res = await getTourById(id)
        if (res) {
            setData(res)
        }
        console.log(res);
    }

    const getSchedule = async (id) => {
        let res = await getScheduleTour(id)
        console.log(res);
        if (res) {
            setSchedule(res)
        }
    }

    useEffect(() => {
        getData(id.id)
        getSchedule(id.id)
    }, [])

    return (
        <div style={{ marginTop: 100 }}>
            <div className='container mt-4'>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Home</Link>,
                        },
                        {
                            title: <p style={{ cursor: "pointer" }}>Tours</p>,
                        },
                    ]}
                />
                <section>
                    <h1> {data.tenTour}</h1>
                    <div className='row'>
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <Space direction='vertical' className='border rounded-3 p-3'>
                                <img width={600} height={400} src={data.anhBia} alt='https://i.pinimg.com/564x/c9/10/2b/c9102bdfe432d0830a5f0dd0cfafd891.jpg'></img>
                                <div className='d-flex justify-content-between'>
                                    <Space>
                                        <NavigationArrow size={16} />
                                        <p>Hồ Chí Minh</p>
                                    </Space>
                                    <Space>
                                        <Clock size={16} />
                                        <p>5 Ngày 4 Đêm</p>
                                    </Space>
                                    <Space>{
                                        data?.phuongTienDiChuyen?.includes("Xe") ? <Car /> : <Planet />
                                    }
                                    </Space>
                                </div>
                            </Space>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 sticky'>
                            <h2>Đặt lịch</h2>
                            <Card className='rounded-3 border'>
                                <Space size={'middle'} direction='vertical' style={{
                                    width: 310
                                }}>
                                    <small>Chọn ngày khởi hành</small>
                                    <DatePicker size='large' className='w-100' />
                                    <Space direction='vertical'>
                                        <p>Số lượng người:</p>
                                        <input onChange={(e) => setCount(e.target.value)} defaultValue={1} min={1} max={20} type='number' className='form-control w-100'></input>
                                    </Space>
                                    <div className='d-flex justify-content-between'>
                                        <p>Tổng cộng:</p>
                                        <p className='text-danger'>{formatCurrency.format(+data.chiPhi * count)}</p>
                                    </div>
                                    <ModalOrder quantity={count} />
                                </Space>

                            </Card>
                            <Card className='row mt-3 rounded-3 border'>
                                <Space direction='vertical' className='col-6'>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Bảo hiểm</p>
                                    </Space>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Bữa ăn</p>
                                    </Space>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Vé máy bay</p>
                                    </Space>
                                </Space>
                                <Space direction='vertical' className='col-6'>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Vé xe</p>
                                    </Space>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Vé tham quan</p>
                                    </Space>
                                    <Space>
                                        <CheckCircleFilled />
                                        <p>Khách sạn</p>
                                    </Space>
                                </Space>


                            </Card>
                        </div>
                    </div>
                </section>
                <h5>Chương trình tour</h5>
                <section className='border rounded-3 p-3 mt-4'>
                    <Tabs
                        tabPosition={'left'}
                        items={
                            schedule?.length > 0 && schedule.map((item, index) => {
                                return {
                                    label: `Ngày ${index + 1} `,
                                    key: index,
                                    children: <>
                                        <Space direction='vertical' style={{ minHeight: 300 }}>
                                            <h5>{item.tieuDe}</h5>
                                            <p>Từ {item.diemKhoiHanh} đến {item.diemDen}</p>
                                            <p>Từ {moment(item.thoiGianBatDau).format('HH:mm')} đến {moment(item.thoiGianKetThuc).format('HH:mm')}</p>
                                            <img width={200} src={item.hinhAnh}></img>
                                            <p>
                                                {item.moTa}
                                            </p>
                                        </Space>
                                    </>,
                                }
                            })
                        }
                    />
                </section>
            </div>
        </div>
    )
}

export default TourDetail