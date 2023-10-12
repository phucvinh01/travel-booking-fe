import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Space, message } from 'antd';
import moment from 'moment';
import { date } from 'yup';
import { getOneById } from '../../Axios/Account';
import { SaveFilled } from '@ant-design/icons';
import { putUpdateEmp } from '../../Axios/Employee';
import { getAllEmployee } from '../../redux/api';
import { useDispatch } from 'react-redux';
const ModalEditEmp = (props) => {
    const { isModalOpen, handleOk, handleCancel, state } = props

    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const dispatch = useDispatch()

    const getAccount = async (id) => {
        let res = await getOneById(id)
        if (res) {
            setEmail(res.email)
            setStatus(res.trangThai)
        }
    }

    useEffect(() => {
        getAccount(state.id)
    }, [state])

    useEffect(() => {
        let formattedDate = '';

        if (state.ngaySinh) {
            const dateObj = new Date(state.ngaySinh);

            if (!isNaN(dateObj)) {
                formattedDate = dateObj.toISOString().split('T')[0];
            }
        }

        setId(state.id)
        setName(state.tenNhanVien)
        setRole(state.maLoaiNhanVien)
        setPhone(state.soDienThoai)
        setBirthday(formattedDate)
        setGender(state.gioiTinh)
        setAddress(state.diaChi)
    }, [state])

    const handleSubmit = async () => {
        let bodyEmp = {
            "id": id,
            "maTaiKhoan": null,
            "maLoaiNhanVien": role,
            "tenNhanVien": name,
            "gioiTinh": gender,
            "soDienThoai": phone,
            "ngaySinh": birthday,
            "canCuocConDan": state.cccd,
            "diaChi": address
        }
        let r = await putUpdateEmp(bodyEmp)
        if (r) {
            message.success("Chỉnh sửa nhân viên thành công")
            getAllEmployee(dispatch)
            handleCancel()
        }
        else {
            message.error("Chỉnh sửa viên thất bại")
        }
    }

    return (
        <>
            <Modal footer={ null } width={ 800 } title="Chỉnh sửa nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-12'>
                        <h5>Thông tin nhân viên</h5>
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

                        <div className='mb-3'>
                            <label>Số điện thoại</label>
                            <input type='tel' value={ phone } className='form-control' onChange={ (e) => setPhone(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Địa chỉ</label>
                            <input type='text' value={ address } className='form-control' onChange={ (e) => setAddress(e.target.value) } />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12'>
                        <h5>Thông tin tài khoản</h5>
                        <div className='mb-3'>
                            <label>Chức vụ</label>
                            <select className='form-control' value={ role } onChange={ (e) => setRole(e.target.value) }>
                                <option value={ '1' }>Admin</option>
                                <option value={ '2' }>Nhân viên tư vấn</option>
                                <option value={ '3' }>Hướng dẫn viên</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Email</label>
                            <input type='text' value={ email } className='form-control' onChange={ (e) => setEmail(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Trạng thái tài khoản</label>
                            <select className='form-control' value={ status } onChange={ (e) => setStatus(e.target.value) }>
                                <option value={ true }>Đang hoạt động</option>
                                <option value={ false }>Đang khóa</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={ handleSubmit } icon={ <SaveFilled /> }>Lưu</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalEditEmp;