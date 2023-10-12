import React, { useState } from 'react';
import { Button, Modal, Select, Space } from 'antd';
const ModalEditEmp = (props) => {
    const { isModalOpen, handleOk, handleCancel, state } = props

    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")


    return (
        <>
            <Modal title="Chỉnh sửa nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <Space>
                    <div>

                        <div className='mb-3'>
                            <label>Tên nhân viên</label>
                            <input type='text' value={ name } className='form-control' onChange={ (e) => setName(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Giới tính</label>
                            <select value={ gender } className='form-control' onChange={ (e) => setGender(e.target.value) }>
                                <option value={ true }>Nam</option>
                                <option value={ false }  >Nữ</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Ngày sinh</label>
                            <input type='date' value={ birthday } className='form-control' onChange={ (e) => setBirthday(e.target.value) } />
                        </div>

                    </div>
                    <div>
                        <div className='mb-3'>
                            <label>Chức vụ</label>
                            <select className='form-control' value={ role } onChange={ (e) => setRole(e.target.value) }>
                                <option value={ '1' }>Admin</option>
                                <option value={ '2' }>Nhân viên tư vấn</option>
                                <option value={ '3' }>Hướng dẫn viên</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Giới tính</label>
                            <select value={ gender } className='form-control' onChange={ (e) => setGender(e.target.value) }>
                                <option value={ true }>Nam</option>
                                <option value={ false } >Nữ</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Số điện thoại</label>
                            <input type='number' value={ birthday } className='form-control' onChange={ (e) => setBirthday(e.target.value) } />
                        </div>

                    </div>
                </Space>
            </Modal>
        </>
    );
};
export default ModalEditEmp;