import { Breadcrumb, Card, DatePicker, Space, Steps, Tabs } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavigationArrow, Clock, Car } from 'phosphor-react'
import { CheckCircleFilled } from '@ant-design/icons'


const items = [{
    label: `1`,
    key: 1,
    children: `Content of Tab Pane`,
}, {
    label: `2`,
    key: 2,
    children: `Content of Tab Pane`,
}, {
    label: `3`,
    key: 3,
    children: `Content of Tab Pane`,
}, {
    label: `4`,
    key: 4,
    children: `Content of Tab Pane`,
}, {
    label: `5`,
    key: 5,
    children: `Content of Tab Pane`,
}, {
    label: `4`,
    key: 6,
    children: `Content of Tab Pane`,
},

]


const TourDetail = () => {
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    return (
        <main>
            <div className='container mt-4'>
                <Breadcrumb
                    items={ [
                        {
                            title: <Link to={ '/' }>Home</Link>,
                        },
                        {
                            title: <p style={ { cursor: "pointer" } }>Tours</p>,
                        },
                    ] }
                />
                <section>
                    <h1> Tour Châu Âu 9N8Đ: Đức - Hà Lan - Bỉ - Pháp - Thụy Sỹ - Bay Thẳng VNA</h1>
                    <div className='row'>
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            <Space direction='vertical'>
                                <img height={ 400 } src='https://i.pinimg.com/564x/c9/10/2b/c9102bdfe432d0830a5f0dd0cfafd891.jpg' alt='https://i.pinimg.com/564x/c9/10/2b/c9102bdfe432d0830a5f0dd0cfafd891.jpg'></img>
                                <Space size={ 'large' }>
                                    <Space>
                                        <NavigationArrow size={ 16 } />
                                        <p>Hồ Chí Minh</p>
                                    </Space>
                                    <Space>
                                        <Clock size={ 16 } />
                                        <p>5 Ngày 4 Đêm</p>
                                    </Space>
                                    <Space>
                                        <Car size={ 16 } />
                                    </Space>
                                </Space>
                            </Space>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 sticky'>
                            <Card>
                                <Space direction='vertical'>
                                    <h2>Lịch khỏi hành và giá</h2>
                                    <small>Chọn ngày khởi hành</small>
                                    <DatePicker size='large' className='w-100' />
                                    <Space direction='vertical'>
                                        <p>Số lượng người:</p>
                                        <input defaultValue={ 1 } min={ 1 } max={ 20 } type='number' className='form-control'></input>
                                    </Space>
                                    <div className='d-flex justify-content-between'>
                                        <p>Tổng cộng:</p>
                                        <p className='text-danger'>999999 đ</p>
                                    </div>
                                    <button className='btn btn-info w-100'>Yêu cầu đặt </button>
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
                <section className='border rounded-3 p-3 mt-4'>
                    <h2>Chương trình tour</h2>
                    <Tabs
                        tabPosition={ 'left' }
                        items={ items }
                    />
                </section>
            </div>
        </main>
    )
}

export default TourDetail