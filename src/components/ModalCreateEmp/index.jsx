import React, { useEffect, useId, useState } from 'react';
import { Button, Modal, Select, Space } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
const ModalCreateEmp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState(1)
    const [cccd, setCCCD] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
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
            setGender(1)
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
                            <input onChange={ (e) => setPhone(e.target.value) } value={ phone } id={ id + 'phone' } type='number' className='form-control'></input>
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
                                defaultValue={ 1 }
                                allowClear
                                options={ [
                                    {
                                        label: "Nam",
                                        value: 1,
                                        key: 1
                                    },
                                    {
                                        label: "Nữ",
                                        value: 0,
                                        key: 2
                                    }
                                ] }
                            />                        </div>

                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'cccd' }>Căn cước công dân</label>
                            <input onChange={ (e) => setCCCD(e.target.value) } value={ cccd } id={ id + 'cccd' } type='number' className='form-control'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'birthday' }>Ngày sinh</label>
                            <input onChange={ (e) => setBirthday(e.target.value) } value={ birthday } type='date' className='form-control' id={ id + 'birthday' }></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor={ id + 'birthday' }>Ngày sinh</label>
                            <input onChange={ (e) => setBirthday(e.target.value) } value={ birthday } type='date' className='form-control' id={ id + 'birthday' }></input>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button disabled={ !isFull ? true : false } type='primary'>Thêm</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateEmp;