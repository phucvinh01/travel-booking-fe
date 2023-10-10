import React from 'react'
import { Breadcrumb, Divider, Radio, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFrom from '../components/Search';
import ListItem from '../components/Items/ListItem';
import ListItem2 from '../components/Items/ListItem2';

const Tours = () => {
    const cate = useSelector((state) => state.cate.category.data);
    const tours = useSelector((state) => state.tour.tours.data);

    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='d-flex justify-content-center align-items-center backgound-tour-page'>
                    <SearchFrom />
                </div>
                <section>
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
                </section>

                <div className='row'>
                    <div className='col-lg-3 col-md-3 mt-3' style={ { borderRight: "1px solid #333", minHeight: "100vh" } }>
                        <Space direction='vertical' size={ 'large' }>
                            <p>Lọc loại tour</p>
                            <Space direction='vertical' className='border rounded-3 w-100'>
                                {
                                    cate && cate?.length > 0 && cate.map((item) => {
                                        return (
                                            <>
                                                <div className='p-3' key={ item.id }><Link>{ item.tenLoai }</Link>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </Space>
                            <Space direction='vertical' className='border rounded-3 p-3' >
                                <p>Lọc theo giá</p>
                                <Radio.Group >
                                    <Space direction='vertical' size={ 'middle' }>
                                        <Radio value={ 1 }>Từ 1.000.000đ - 1.500.000đ</Radio>
                                        <Radio value={ 2 }>Từ 1.500.000đ - 3.000.000đ</Radio>
                                        <Radio value={ 4 }>Từ 3.000.000đ - 7.000.000đ</Radio>
                                        <Radio value={ 5 }>Từ 7.000.000đ - 15.000.000đ</Radio>
                                        <Radio value={ 6 }>Từ 15.000.000đ - 30.000.000đ</Radio>
                                        <Radio value={ 7 }>Trên 30.000.000đ</Radio>

                                    </Space>
                                </Radio.Group>
                            </Space>
                        </Space>

                    </div>
                    <div className='col-5 col-md-5 col-sm-12'>
                        <ListItem2
                            data={ tours }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tours