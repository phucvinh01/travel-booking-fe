import { Button, Modal, Select, Space, Spin, message } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import { Plus, Star } from 'phosphor-react'
import React, { useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import cloudinary from '../../util/Cloudnary'
import Upload from '../Uploads';
import { set } from 'lodash';
import { createTour } from '../../Axios/Tour';
import { getItems } from '../../redux/api';
const ModalCreateTour = () => {

    const cate = useSelector((state) => state.cate.category.data);
    const hotel = useSelector((state) => state.hotel.hotel.data);
    const flight = useSelector((state) => state.flight.flight.data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const id = useId();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [createAt, setCreateAt] = useState('')
    const [userCreate, setUserCreate] = useState("1")
    const [category, setCategory] = useState('');
    const [idTranport, setIdTranport] = useState(0);
    const [idHotel, setIdHotel] = useState(0)
    const [tranpost, setTranport] = useState('');
    const [isFull, setIsFull] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (name && description && image && createAt && category && idTranport && idHotel && tranpost) {
            setIsFull(true)
        }

    }, [name, description, image, price, createAt, category, idTranport, idHotel, tranpost])

    useEffect(() => {
        if (!isModalOpen) {
            setName("")
            setDescription("")
            setCategory("")
            setPrice(0)
            setCreateAt("")
            setIdHotel(0)
            setIdTranport(0)
            setTranport("")
            setImage("")
            setIsFull(false)
        }
    }, [isModalOpen])

    console.log(idTranport);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (value) => {
        setCategory(value)
    }

    const onChangeIdTranpost = (value) => {
        setIdTranport(value)
    }
    const onChangeHotel = (value) => {
        setIdHotel(value)
    }
    const onChangeTranpost = (value) => {
        setTranport(value)
    }

    const handleClick = async () => {
        setLoading(true)
        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let body = {
                "tenTour": name,
                "moTa": description,
                "anhBia": res.data.secure_url,
                "chiPhi": price,
                "ngayLap": createAt,
                "nguoiLap": userCreate,
                "maLoaiTour": category,
                "maChuyenBay": idTranport,
                "maKhachSan": idHotel,
                "phuongTienDiChuyen": tranpost,
                "trangThai": true,
            }
            let result = createTour(body)
            console.log(result);
            if (result) {
                message.success("Thêm thành công")
                handleCancel();
                getItems(dispatch)
            }
        }
        else {
            message.success("Thêm thất bại")
        }
        setLoading(false)
    }
    return (
        <>
            <Button onClick={ showModal } size='large' icon={ <Plus size={ 16 } /> } style={ { backgroundColor: "yellow" } }>
                <Space>
                    <p>Thêm một tour</p>
                </Space>
            </Button>
            <Modal
                width={ 880 }
                title='Thêm một loại tours'
                open={ isModalOpen }
                footer={ null }
                onOk={ handleOk }
                onCancel={ handleCancel }>
                <hr></hr>
                <div className='row g-2'>
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-name' }
                                className='form-label fw-bolder'>
                                Tên tour
                            </label>
                            <input
                                value={ name }
                                onChange={ (e) => setName(e.target.value) }
                                type='text'
                                className='form-control'
                                id={ id + '-name' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-price' }
                                className='form-label fw-bolder'>
                                Giá
                            </label>
                            <input
                                value={ price }
                                onChange={ (e) => setPrice(e.target.value) }
                                type='number'
                                className='form-control'
                                id={ id + '-price' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-category' }
                                className='form-label fw-bolder'>
                                Loại tour
                            </label>
                            <Select
                                value={ category }
                                size='large'
                                onChange={ onChange }
                                id='category'
                                style={ {
                                    width: '100%',
                                } }
                                allowClear
                                options={
                                    cate && cate.length > 0 && cate.map((item) => {
                                        return (
                                            {
                                                value: item.id,
                                                label: item.tenLoai,
                                                key: item.id
                                            }
                                        )
                                    })

                                }
                            />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-brand' }
                                className='form-label fw-bolder'>
                                Chuyến bay
                            </label>
                            <Select
                                size='large'
                                onChange={ onChangeIdTranpost }
                                id='brand'
                                style={ {
                                    width: '100%',
                                } }
                                allowClear
                                placeholder="Search to Select"
                                showSearch
                                optionFilterProp="children"
                                filterOption={ (input, option) => (option?.label ?? '').includes(input) }
                                filterSort={ (optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={ flight && flight.length > 0 && flight.map((item) => {
                                    return (
                                        {
                                            value: item.id,
                                            label: item.hangBay,
                                            key: item.id
                                        }
                                    )
                                }) }
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-description' }
                                className='form-label fw-bolder'>
                                Mô tả
                            </label>
                            <TextArea
                                value={ description }
                                onChange={ (e) => setDescription(e.target.value) }
                                style={ {
                                    height: 123,
                                    resize: 'none',
                                } }
                                type='text'
                                className='form-control'
                                id={ id + '-description' }></TextArea>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-createAt' }
                                className='form-label fw-bolder'>
                                Ngày tạo
                            </label>
                            <input
                                onChange={ (e) => setCreateAt(e.target.value) }
                                type='date'
                                className='form-control'
                                id={ id + '-createAt' }></input>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-hotel' }
                                className='form-label fw-bolder'>
                                Khách sạn
                            </label>
                            <Select
                                size='large'
                                onChange={ onChangeHotel }
                                id='hotel'
                                style={ {
                                    width: '100%',
                                } }
                                placeholder="Search to Select"
                                allowClear
                                showSearch
                                optionFilterProp="children"
                                filterOption={ (input, option) => (option?.label ?? '').includes(input) }
                                filterSort={ (optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={ hotel && hotel.length > 0 && hotel.map((item) => {
                                    return (
                                        {
                                            value: item.id,
                                            label: item.tenKhachSan,
                                            key: item.id
                                        }
                                    )
                                }) }
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor={ id + '-tranpost' }
                                className='form-label fw-bolder'>
                                Phương tiện di chuyển
                            </label>
                            <Select
                                size='large'
                                onChange={ onChangeTranpost }
                                id='tranpost'
                                style={ {
                                    width: '100%',
                                } }
                                allowClear
                                options={ [
                                    {
                                        value: "Xe",
                                        key: 1
                                    },
                                    {
                                        value: "Máy bay",
                                        key: 2
                                    },
                                    {
                                        value: "Tàu",
                                        key: 3
                                    }
                                ] }
                            />
                        </div>

                    </div>
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <div className='p-0 mb-3'>
                            <Upload setImage={ setImage } />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button type='primary' disabled={ !isFull ? true : false } onClick={ () => handleClick() }>{ loading ? <Spin></Spin> : <>Create</> } </Button>
                </div>
            </Modal>
        </>
    )
}

export default ModalCreateTour