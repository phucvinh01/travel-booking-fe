import { Breadcrumb, Button, Card, DatePicker, Empty, Space, Steps, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NavigationArrow, Clock, Car, Planet, Airplane, Star, User } from 'phosphor-react'
import { CheckCircleFilled } from '@ant-design/icons'
import { getScheduleTour, getTourByCategory, getTourById } from '../Axios/Tour'
import formatCurrency from '../util/formatCurrency'
import ModalOrder from '../components/ModalOrder'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { constant } from 'lodash'
import SildeTour from '../components/SildeTour'

const TourDetail = () => {

    const hotel = useSelector((state) => state.hotel.hotel.data);
    const flight = useSelector((state) => state.flight.flight.data);
    const user = useSelector((state) => state.auth.login.currentUser);



    const id = useParams()
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [count, setCount] = useState(1)
    const [tours, setTours] = useState([])
    const [dayOrder, setDayOrder] = useState("")
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };




    const getData = async (id) => {
        let res = await getTourById(id)
        if (res) {
            setData(res)
        }
    }

    const getSchedule = async (id) => {
        let res = await getScheduleTour(id)
        console.log(res);
        if (res) {
            setSchedule(res)

        }
    }

    const getTourSame = async (id) => {
        let res = await getTourByCategory(id)
        if (res) {
            setTours(res)
            console.log(res);

        }
    }

    const hotelName = hotel?.find((item) => item.idKhachSan === data?.maKhachSan)
    const flightName = flight?.find((item) => item.idChuyenBay === data?.maChuyenBay)
    console.log(flightName);

    useEffect(() => {
        getData(id.id)
        getSchedule(id.id)
    }, [id])


    useEffect(() => {
        getTourSame(data.maLoaiTour)
    }, [data])

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
                                <img className='w-100' height={400} src={"/src/assets/Images/"+data.anhBia} alt='https://i.pinimg.com/564x/c9/10/2b/c9102bdfe432d0830a5f0dd0cfafd891.jpg'></img>
                                <Space>
                                    <small>Mã tour: <span style={{ color: "blue" }}>{data?.idTour}</span></small>
                                </Space>
                                <div className='d-flex justify-content-between mt-3'>
                                    <Space>
                                        <NavigationArrow size={18} />
                                        <p>Hồ Chí Minh</p>
                                    </Space>
                                    <Space>
                                        <Clock size={16} />
                                        <p>5 Ngày 4 Đêm</p>
                                    </Space>
                                    <Space align='center'><p>Phương tiện:</p>{
                                        data?.phuongTienDiChuyen?.includes("Xe") ? <Car /> : <><Airplane size={18} weight="fill" /> <p>{flightName?.hangBay}</p></>
                                    }
                                    </Space>
                                    <Space align='center'><p>Khách sạn:</p>{
                                        hotelName?.hangSao
                                    }<Star size={18} />
                                    </Space>
                                </div>
                            </Space>
                            <section className='border rounded-3 p-3 mt-4'>
                                <h5>Chương trình tour</h5>
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
                                                        {item.hinhAnh=="null"?"":<img width={200} src={"/src/assets/Images/"+item.hinhAnh}></img>}
                                                        
                                                        
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
                            <section className='border rounded-3 p-3'>
                                <div >
                                    <h3>Thông tin Visa</h3>
                                    <p> Visa đoàn nhập cảnh cho khách hộ chiếu Việt Nam. (Scan nguyên cuốn Hộ chiếu + file hình gốc nền trắng (theo mẫu bên dưới)) (Lưu ý: trường hợp khách đi 1 mình vui lòng bổ sung thêm CT07 hoặc scan nguyên cuốn hộ khẩu + HĐLĐ/GPKD)
                                    </p>
                                    <p>- Khai phiếu cung cấp thông tin visa nhấp vô link</p>
                                    <p>TIÊU CHUẨN HỘ CHIẾU + ẢNH HỒ SƠ XIN VISA</p>=
                                    <p>- Hộ chiếu: scan rõ, không mất gốc, không bị chói lóa, không bị bóng + nguyên cuốn</p>
                                    <p> - Ảnh: file hình (không cần rửa)</p>
                                    <p>- Phông nền: trắng </p>
                                    <p>- Áo màu, không hở vai</p>
                                    <p>- Không đeo trang sức (dây chuyền, bông tai….)</p>
                                    <p> - Chụp bằng camera sau</p>
                                    <p>- Ngẩng cao đầu, không được nghiên đầu</p>
                                    <p>- Mắt nhìn vào ổng kính, không đeo kính, không nhún vai, phải để rỏ vành tai, tai không bị che bất kỳ điểm nào</p>
                                </div>
                            </section>
                            <section className='border rounded-3 p-3'>
                                <h3>Hướng dẫn viên</h3>
                                <p>- Hướng Dẫn Viên (HDV) sẽ liên lạc với Quý Khách khoảng 2-3 ngày trước khi khởi hành để sắp xếp giờ đón và cung cấp các thông tin cần thiết cho chuyển đi. </p>
                            </section>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12' >
                            <div style={{
                                position: " sticky",
                                top: "80px"
                            }}>

                                <div className='rounded-3 border p-3 w-100'>
                                    <h2>Đặt lịch</h2>
                                    <div >
                                        <small>Chọn ngày khởi hành</small>
                                        <input type='date' className='form-control' onChange={(e) => setDayOrder(e.target.value)} />
                                        <Space direction='vertical'>
                                            <p>Số lượng người:</p>
                                            <input onChange={(e) => setCount(e.target.value)} defaultValue={1} min={1} max={20} type='number' className='form-control w-100'></input>
                                        </Space>
                                        <div className='d-flex justify-content-between mb-3'>
                                            <p>Tổng cộng:</p>
                                            <p className='text-danger'>{formatCurrency.format(+data.chiPhi * count)}</p>
                                        </div>
                                        {
                                            !user ? <><Button disabled={true} block>Đăng nhập để có thể yêu đặt tour</Button></> : <ModalOrder quantity={count} idTour={data?.idTour} dayOrder={dayOrder} />
                                        }
                                    </div>

                                </div>
                                <div className='row mt-3 rounded-3 border p-3'>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Các tour liên quan</h3>
                    <SildeTour tours={tours}/>
                </section>
            </div>
        </div>
    )
}

export default TourDetail