import React, { useEffect, useId, useState } from 'react';
import { Button, Modal, Select, Space, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { postCreateOneEmp } from '../../Axios/Employee';
import { useDispatch } from 'react-redux';
import { getAllEmployee } from '../../redux/api';
import { getAllTypeEmp } from '../../Axios/TypeEmp';
const ModalCreateEmp = () => {

    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState(true)
    const [cccd, setCCCD] = useState('')
    const [birthday, setBirthday] = useState('')
    const [dayStart, setDatStart] = useState('')
    const [address, setAddress] = useState('')
    const [type, setType] = useState('')
    const [listTypeEmp, setListTypeEmp] = useState([])

    const getType = async () => {
        let r = await getAllTypeEmp()
        if (r.status === 400) {
            message.error("Lấy list loại nhân viên thất bại")
        }
        else {
            setListTypeEmp(r)
        }
    }

    useEffect(() => {
        getType()
    }, [])


    useEffect(() => {
        if (cccd.length > 12) {
            setCCCD(cccd.slice(0, 12))
        }
        if (dayStart && birthday && birthday > dayStart) {
            setDatStart(birthday);
        }

    }, [cccd, birthday, dayStart])

    const [isFull, setIsFull] = useState(false)
    const id = useId()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeGender = (value) => {
        setGender(value)
    }

    const handleSubmit = async () => {
        let body = {
            "maLoaiNhanVien": type,
            "tenNhanVien": name,
            "gioiTinh": gender,
            "soDienThoai": phone,
            "ngaySinh": birthday,
            "ngayVaoLam": dayStart,
            "canCuocConDan": cccd,
            "diaChi": address
        }

        let res = await postCreateOneEmp(body)
        if (res) {
            message.success("Thêm thành công")
            getAllEmployee(dispatch)
            handleCancel()
        }
        else {
            message.error("Thêm thất bại")
        }
    }


    useEffect(() => {
        if (name && gender, phone, cccd, birthday) {
            setIsFull(true)
        }
        if (!isModalOpen) {
            setName("")
            setPhone("")
            setIsFull(false)
            setCCCD("")
            setBirthday("")
            setGender(true)
        }
    }, [gender, name, phone, cccd, birthday, isModalOpen])



    return (
        <>
            <Button icon={ <PlusCircleFilled /> } size='large' type="primary" onClick={ showModal }>
                Thêm một nhân viên
            </Button>
            <Modal footer={ null } title="Thêm một nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'name' }>Họ tên nhân viên</label>
                            <input onChange={ (e) => setName(e.target.value) } value={ name } id={ id + 'name' } type='text' className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'phone' }>Số điện thoại</label>
                            <input onChange={ (e) => setPhone(e.target.value) } value={ phone } id={ id + 'phone' } type='tel' maxLength={ 11 } className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'gender' }>Giới tính</label>
                            <Select
                                onChange={ handleChangeGender }
                                size='large'
                                //onChange={ onChangeIdTranpost }
                                id='gender'
                                style={ {
                                    width: '100%',
                                } }
                                defaultValue={ true }
                                allowClear
                                options={ [
                                    {
                                        label: "Nam",
                                        value: true,
                                        key: 1
                                    },
                                    {
                                        label: "Nữ",
                                        value: false,
                                        key: 2
                                    }
                                ] }
                            />
                        </div>

                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'cccd' }>Căn cước công dân</label>
                            <input maxLength={ 12 } onChange={ (e) => setCCCD(e.target.value) } value={ cccd } id={ id + 'cccd' } type='number' className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'birthday' }>Ngày sinh</label>
                            <input onChange={ (e) => setBirthday(e.target.value) } value={ birthday } type='date' className='form-control' id={ id + 'birthday' }></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'dateStart' }>Ngày vào làm</label>
                            <input onChange={ (e) => setDatStart(e.target.value) } value={ dayStart } type='date' className='form-control' id={ id + 'dateStart' }></input>
                        </div>
                    </div>
                    <div className='col-12'>
                        <label htmlFor={ id + 'address' }>Địa chỉ</label>
                        <input onChange={ (e) => setAddress(e.target.value) } value={ address } type='text' className='form-control' id={ id + 'address' }></input>
                    </div>
                    <div className='col-12'>
                        <label htmlFor={ id + 'type' }>Loại nhân viên</label>
                        <select onChange={ (e) => setType(e.target.value) } value={ type } className='form-control' id={ id + 'type' }>
                            {
                                listTypeEmp?.map((item, index) => {
                                    return (
                                        <>
                                            <option key={ index } value={ item.idLoaiNhanVien }>{ item.tenLoai }</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <Button onClick={ handleSubmit } disabled={ !isFull ? true : false } type='primary'>Thêm</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalCreateEmp;