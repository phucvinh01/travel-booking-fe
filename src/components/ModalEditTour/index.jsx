import React, { useEffect, useId, useState } from 'react';
import { Button, DatePicker, Modal, Select, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { getTourById } from '../../Axios/Tour';
import Upload from '../Uploads';
import moment from 'moment';
import Axios from '../../Axios/Axios';
import { getItemsAdmin } from '../../redux/api';
const ModalEditTour = (props) => {

    const { state, isModalOpen, handleCancel, handleOk } = props
    const id = useId();


    const cate = useSelector((state) => state.cate.category.data);
    const hotel = useSelector((state) => state.hotel.hotel.data);
    const flight = useSelector((state) => state.flight.flight.data);
    const emp = useSelector((state) => state.emp.emp.data)


    const [tour, setTour] = useState({})
    const [idd, setIdd] = useState("")
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [createAt, setCreateAt] = useState('')
    const [userCreate, setUserCreate] = useState("NV001")
    const [category, setCategory] = useState('');
    const [idTranport, setIdTranport] = useState(0);
    const [idHotel, setIdHotel] = useState(0)
    const [tranpost, setTranport] = useState('');
    const [isFull, setIsFull] = useState(false)
    const [loading, setLoading] = useState(false)

    function findNameCateById(arr, id) {
        const foundObject = arr.find(obj => obj.idLoaiTour === id);
        if (foundObject) {
            return foundObject.tenLoai;
        }
        return null; // Trả về null nếu không tìm thấy đối tượng với id tương ứng
    }

    function findNameHotelById(arr, id) {
        const foundObject = arr.find(obj => obj.idKhachSan === id);
        if (foundObject) {
            return foundObject.tenKhachSan;
        }
        return null; // Trả về null nếu không tìm thấy đối tượng với id tương ứng
    }

    function findNameFlightById(arr, id) {
        const foundObject = arr.find(obj => obj.idChuyenBay === id);
        if (foundObject) {
            return foundObject.hangBay;
        }
        return null; // Trả về null nếu không tìm thấy đối tượng với id tương ứng
    }

    const onChange = (value) => {
        console.log(value);
        setCategory(value)
    }

    const onChangeIdTranpost = (value) => {
        setIdTranport(value)
    }
    const onChangeHotel = (value) => {
        setIdHotel(value)
    }
    const onChangeTranpost = (value) => {
        setTranport(value.join(","))
    }

    useEffect(() => {
        if (isModalOpen) {
            setIdd(state.idTour);
            setCreateAt(state.ngayLap)
            setName(state.tenTour);
            setPrice(state.chiPhi);
            setCategory(state.maLoaiTour);
            setDescription(state.moTa);
            setImage(state.anhBia);
            setUserCreate(1)
            setIdTranport(state.maChuyenBay)
            setIdHotel(state.maKhachSan)
            setTranport(state.phuongTienDiChuyen)
            console.log(idd);
        }
    }, [state])

    const dispatch = useDispatch()

    const handleClick = async () => {
        let body = {
            "IdTour": idd,
            "tenTour": name,
            "moTa": description,
            "anhBia": image,
            "chiPhi": price,
            "ngayLap": createAt,
            "nguoiLap": emp[0].maNhanVien,
            "maLoaiTour": category,
            "maChuyenBay": idTranport,
            "maKhachSan": idHotel,
            "phuongTienDiChuyen": tranpost,
            "trangThai": true,
        }

        let r = await Axios.put('/Tour/update-one-tour', body)
        if (r) {
            message.success("Update thanh cong")
            getItemsAdmin(dispatch)
            handleCancel()
        }
    }


    return (
        <>

            <Modal footer={ null } width={ 1000 } title="Chỉnh sửa" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
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
                                value={ findNameCateById(cate, category) }
                                size='large'
                                onChange={ onChange }
                                id='category'
                                style={ {
                                    width: '100%',
                                } }
                                allowClear
                                options={
                                    cate && cate.length > 0 && cate.map((item, index) => {
                                        return (
                                            {
                                                value: item.idLoaiTour,
                                                label: item.tenLoai,
                                                key: item.idLoaiTour
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
                                value={ findNameFlightById(flight, idTranport) }
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
                                options={ flight && flight.length > 0 && flight.map((item, index) => {
                                    return (
                                        {
                                            value: item.idChuyenBay,
                                            label: item.hangBay,
                                            key: item.idChuyenBay
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
                                defaultValue={ createAt }
                                value={ createAt }
                                onChange={ (e) => setCreateAt(e.target.value) }
                                type='datetime-local'
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
                                value={ findNameHotelById(hotel, idHotel) }

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
                                options={ hotel && hotel.length > 0 && hotel.map((item, index) => {
                                    return (
                                        {
                                            value: item.idKhachSan,
                                            label: item.tenKhachSan,
                                            key: item.idKhachSan
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
                                mode='multiple'
                                value={ tranpost?.split(",") }
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
                                    }
                                ] }
                            />
                        </div>

                    </div>
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <div className='p-0 mb-3'>
                            <Upload setImage={ setImage } value={ image } />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button type='primary' onClick={ () => handleClick() }>{ loading ? <Spin></Spin> : <>Edit</> } </Button>
                </div>
            </Modal>
        </>
    );
};
export default ModalEditTour;