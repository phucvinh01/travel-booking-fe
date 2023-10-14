import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Divider, Empty, Radio, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFrom from '../components/Search';
import ListItem from '../components/Items/ListItem';
import ListItem2 from '../components/Items/ListItem2';
import Item from '../components/Items/Item';
import { getTourByCategory } from '../Axios/Tour';

const Tours = () => {
    const cate = useSelector((state) => state.cate.category.data);
    const tours = useSelector((state) => state.tour.tours.data);
    const [value, setValue] = useState(0);
    const [valueCate, setvalueCate] = useState(0);
    const [data, setData] = useState([])

    useEffect(() => {
        tours && setData(tours)
    }, [])

    const getTourById = async (id) => {
        let res = await getTourByCategory(id)
        if (res) {
            setData(res)
        }
        else {
            setData(null)
        }
    }

    useEffect(() => {
        if (valueCate == "0")
            setData(tours)
        else {
            getTourById(valueCate)
        }
    }, [valueCate])

    useEffect(() => {
        switch (value) {
            case "0":
                setData(tours)
                break;
            case "1":
                setData(tours.filter((item) => item.chiPhi >= 1000000 && item.chiPhi <= 1500000))
                break;
            case "2":
                setData(tours.filter((item) => item.chiPhi >= 1500000 && item.chiPhi <= 3000000))
                break;
            case "3":
                setData(tours.filter((item) => item.chiPhi >= 3000000 && item.chiPhi <= 7000000))
                break;
            case "4":
                setData(tours.filter((item) => item.chiPhi >= 7500000 && item.chiPhi <= 15000000))
                break;
            case "5":
                setData(tours.filter((item) => item.chiPhi >= 15000000 && item.chiPhi <= 30000000))
                break;
            case "6":
                setData(tours.filter((item) => item.chiPhi > 30000000))
                break;
            default:
                break;
        }
    }, [value])
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <div className='container-fluid mt-4'>
                <div className='d-flex justify-content-center align-items-center backgound-tour-page'>
                </div>
                <section>
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
                </section>
                <div style={{ height: 200 }} className='d-flex justify-content-end'>
                    <SearchFrom />
                </div>
                <div className='row'>
                    <div className='col-lg-2 col-md-3 mt-3' style={{ borderRight: "1px solid #333", minHeight: "100vh" }}>
                        <Space direction='vertical' size={'large'}>
                            <p>Lọc loại tour</p>
                            <Space direction='vertical' className='border rounded-3 w-100'>
                                <Radio.Group buttonStyle='outline' size='large' onChange={(e) => setvalueCate(e.target.value)}>
                                    <Space direction='vertical'>
                                        <Radio.Button style={{ border: "none" }} type='text' value={0}>Tất cả</Radio.Button>
                                        {
                                            cate && cate?.length > 0 && cate.map((item) => {
                                                return (
                                                    <>
                                                        <Radio.Button key={item.id} style={{ border: "none" }} value={item.idLoaiTour} type='text'>{item.tenLoai}</Radio.Button>
                                                    </>
                                                )
                                            })
                                        }
                                    </Space>
                                </Radio.Group>
                            </Space>
                            <Space direction='vertical' className='border rounded-3 p-3' >
                                <p>Lọc theo giá</p>
                                <Radio.Group >
                                    <Space direction='vertical' size={'middle'} onChange={handleChange}>
                                        <Radio value={0}>Mặc định</Radio>
                                        <Radio value={1}>Từ 1.000.000đ - 1.500.000đ</Radio>
                                        <Radio value={2}>Từ 1.500.000đ - 3.000.000đ</Radio>
                                        <Radio value={3}>Từ 3.000.000đ - 7.000.000đ</Radio>
                                        <Radio value={4}>Từ 7.000.000đ - 15.000.000đ</Radio>
                                        <Radio value={5}>Từ 15.000.000đ - 30.000.000đ</Radio>
                                        <Radio value={6}>Trên 30.000.000đ</Radio>
                                    </Space>
                                </Radio.Group>
                            </Space>
                        </Space>
                    </div>
                    <div className='col-lg-10 col-md-5 col-sm-12'>
                        <div className='row p-3'>
                            {data?.length > 0 ? data.map((item, index) => {
                                return (
                                    <Item
                                        key={index}
                                        data={item}
                                    />)
                            }) : <Empty />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tours