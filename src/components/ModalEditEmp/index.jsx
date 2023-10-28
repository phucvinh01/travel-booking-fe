import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Space, message } from 'antd';
import moment from 'moment';
import { date } from 'yup';
import { getOneById, putUpdateAccount } from '../../Axios/Account';
import { EditFilled, SaveFilled } from '@ant-design/icons';
import { putUpdateEmp } from '../../Axios/Employee';
import { getAllEmployee } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { getAllTypeEmp } from '../../Axios/TypeEmp';
import { set } from 'lodash';
import { getAllType } from '../../Axios/typeAccount';
const ModalEditEmp = (props) => {
    const { isModalOpen, handleOk, handleCancel, state } = props

    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState(true)
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState(true)
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const [dayStart, setDayStart] = useState("")
    const [cccd, setCccd] = useState("")
    const [password, setPassword] = useState('')
    const [idAccount, setIdAccount] = useState("")
    const [typeAccount, setTypeAccount] = useState("")
    const dispatch = useDispatch()

    const [listTypeEmp, setListTypeEmp] = useState([])
    const [listTypeAccount, setListTypeAccount] = useState([])

    const getType = async () => {
        let r = await getAllTypeEmp()
        if (r.status === 400) {
            message.error("Lấy list loại nhân viên thất bại")
        }
        else {
            setListTypeEmp(r)
        }
    }
    const getTypeAccount = async () => {
        let r = await getAllType()
        if (r.status === 400) {
            message.error("Lấy list loại nhân viên thất bại")
        }
        else {
            setListTypeAccount(r)
        }
    }
    const getAccount = async (id) => {
        let res = await getOneById(id)
        console.log(res);
        if (res.statusCode !== 204) {
            setEmail(res.email)
            setStatus(res.trangThai)
            setPassword(res.matKhau)
            setIdAccount(res.idTaiKhoan)
            setTypeAccount(res.maLoai)
        }
        else {
            setEmail("")
            setStatus("")
            setPassword("")
            setIdAccount("")
            setTypeAccount("")
        }
    }


    useEffect(() => {
        getAccount(state.maTaiKhoan && state.maTaiKhoan)
        getType()
        getTypeAccount()
    }, [state])

    useEffect(() => {
        let formattedDate = '';

        if (state.ngaySinh) {
            const dateObj = new Date(state.ngaySinh);

            if (!isNaN(dateObj)) {
                formattedDate = dateObj.toISOString().split('T')[0];
            }
        }
        setId(state.idNhanVien)
        setName(state.tenNhanVien)
        setRole(state.maLoaiNhanVien)
        setPhone(state.soDienThoai)
        setBirthday(formattedDate)
        setGender(state.gioiTinh)
        setAddress(state.diaChi)
        setDayStart(state.ngayVaoLam)
        setCccd(state.canCuocConDan)
        console.log(state);
    }, [state])

    const handleSubmit = async () => {
        let bodyEmp = {
            "idNhanVien": id,
            "maTaiKhoan": null,
            "maLoaiNhanVien": role,
            "tenNhanVien": name,
            "gioiTinh": JSON.parse(gender),
            "soDienThoai": phone,
            "ngaySinh": birthday,
            "canCuocConDan": cccd,
            "ngayVaoLam": dayStart,
            "diaChi": address
        }

        console.log(gender);
        let r = await putUpdateEmp(bodyEmp)
        if (r.status === 400) {
            message.error("Chỉnh sửa viên thất bại")
        }
        else {
            let bodyy = {
                "idTaiKhoan": idAccount,
                "maLoai": typeAccount,
                "soDienThoai": phone,
                "email": email,
                "matKhau": password,
                "trangThai": Boolean(status),
                "ngayLap": moment(),
            }
            let r = await putUpdateAccount(bodyy)
            if (r.status === 400) {
                message.error("Chỉnh sửa tài khoản thất bại")
            }
            else {
                message.success("Chỉnh sửa nhân viên thành công")
                setIsEdit(false)
                getAllEmployee(dispatch)
                handleCancel()
            }

        }
    }

    return (
        <>
            <Modal footer={ null } width={ 800 } title="Chỉnh sửa nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-12'>
                        <h5>Thông tin nhân viên</h5>
                        <div className='mb-3'>
                            <label>Id nhân viên: { <span className='text-danger'>{ id }</span> }</label>
                        </div>
                        <div className='mb-3'>
                            <label>Tên nhân viên</label>
                            <input disabled={ isEdit ? false : true } type='text' value={ name } className='form-control' onChange={ (e) => setName(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Giới tính</label>
                            <select disabled={ isEdit ? false : true } value={ gender } className='form-control' onChange={ (e) => setGender(e.target.value) }>
                                <option value={ true }>Nam</option>
                                <option value={ false }  >Nữ</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Ngày sinh</label>
                            <input disabled={ isEdit ? false : true } type='date' value={ birthday } className='form-control' onChange={ (e) => setBirthday(e.target.value) } />
                        </div>

                        <div className='mb-3'>
                            <label>Số điện thoại</label>
                            <input disabled={ isEdit ? false : true } type='tel' value={ phone } className='form-control' onChange={ (e) => setPhone(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Địa chỉ</label>
                            <input disabled={ isEdit ? false : true } type='text' value={ address } className='form-control' onChange={ (e) => setAddress(e.target.value) } />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12'>
                        <h5>Thông tin tài khoản</h5>
                        <div className='mb-3'>
                            <label>Chức vụ</label>
                            <select disabled={ isEdit ? false : true } className='form-control' value={ role } onChange={ (e) => setRole(e.target.value) }>
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
                        <div className='mb-3'>
                            <label>Email</label>
                            <input disabled={ isEdit ? false : true } type='text' value={ email } className='form-control' onChange={ (e) => setEmail(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Mật khẩu</label>
                            <input disabled={ isEdit ? false : true } type='password' value={ password } className='form-control' onChange={ (e) => setPassword(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <label>Loại tài khoản</label>
                            <select disabled={ isEdit ? false : true } className='form-control' value={ typeAccount } onChange={ (e) => setTypeAccount(e.target.value) }>
                                {
                                    listTypeAccount?.map((item, index) => {
                                        return (
                                            <>
                                                <option key={ index } value={ item.idLoaiTaiKhoan }>{ item.tenLoai }</option>
                                            </>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label>Trạng thái tài khoản</label>
                            <select disabled={ isEdit ? false : true } className='form-control' value={ status } onChange={ (e) => setStatus(e.target.value) }>
                                <option value={ true }>Đang hoạt động</option>
                                <option value={ false }>Đang khóa</option>
                            </select>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        {
                            isEdit ? <Button onClick={ handleSubmit } icon={ <SaveFilled /> }>Lưu</Button>
                                : <Button onClick={ () => setIsEdit(!isEdit) } icon={ <EditFilled /> }>Chỉnh sửa</Button>
                        }

                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalEditEmp;