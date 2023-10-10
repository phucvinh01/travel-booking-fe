import React from 'react'
import { Breadcrumb, Divider, Radio, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFrom from '../components/Search';
import ListItem from '../components/Items/ListItem';

const Tours = () => {
    const cate = useSelector((state) => state.cate.category.data);
    const tours = useSelector((state) => state.tour.tours.data);

    return (
        <main>
            <div className='container-fluid mt-4'>
                <div className='d-flex justify-content-end'>
                    <SearchFrom />
                </div>

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
                <div className='row'>
                    <div className='col-lg-3 col-md-12 d-sm-hidden  mt-3'>
                        <Space direction='vertical' size={ 'large' }>
                            <Space direction='vertical' className='border rounded-3 w-100'>
                                {
                                    cate && cate.map((item) => {
                                        return (
                                            <>
                                                <div className='p-3' key={ item.id }><Link>{ item.tenLoai }</Link>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                            </Space>
                            <Space>
                                <p>Lọc theo giá</p>

                                <Radio.Group onChange={ onChange } value={ value }>
                                    <Space direction='vertical'>
                                        <Radio value={ 1 }>A</Radio>
                                        <Radio value={ 2 }>B</Radio>
                                        <Radio value={ 3 }>C</Radio>
                                        <Radio value={ 4 }>D</Radio>
                                    </Space>
                                </Radio.Group>

                            </Space>
                        </Space>

                    </div>
                    <div className='col-9 col-md-9 col-sm-12'>
                        <ListItem
                            title={ 'Tour Du Lịch Lễ 2/9' }
                            subtitle={ 'Chơi Lễ Thả Ga, Không Lo Về Giá' }
                            data={ tours }
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Tours