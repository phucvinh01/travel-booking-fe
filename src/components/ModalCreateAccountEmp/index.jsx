import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypeEmp } from '../../Axios/TypeEmp';
import { getAllType } from '../../Axios/typeAccount';
import moment from 'moment';
import { postRegiser } from '../../Axios/Account';
import { getAllEmployee } from '../../redux/api';
import { putUpdateEmp } from '../../Axios/Employee';
const ModalCreateAccountEmp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listTypeEmp, setListTypeEmp] = useState([])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [empData, setEmpData] = useState({})

    const getType = async () => {
        let r = await getAllType()
        if (r.status === 400) {
            message.error("Lấy list loại nhân viên thất bại")
        }
        else {
            setListTypeEmp(r)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        createAccountEmp();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setPhone(e)
        const data = emp?.find((item) => {
            return item.soDienThoai === e
        })
        setEmpData(data)
        console.log(data);
    }

    const createAccountEmp = async () => {
        let body = {
            "maLoai": type,
            "soDienThoai": phone,
            "email": email,
            "matKhau": password,
            "trangThai": true,
            "ngayLap": moment()
        }
        let r = await postRegiser(body)
        if (r.status === 400) {
            message.error("Tạo tài khoản thất bại")
        }
        else {
            let bodyy = {
                "idNhanVien": empData?.idNhanVien,
                "maTaiKhoan": r.idTaiKhoan,
                "maLoaiNhanVien": empData?.maLoaiNhanVien,
                "tenNhanVien": empData?.tenNhanVien,
                "gioiTinh": empData?.gioiTinh,
                "soDienThoai": empData?.soDienThoai,
                "ngaySinh": empData?.ngaySinh,
                "ngayVaoLam": empData?.ngayVaoLam,
                "canCuocConDan": empData?.canCuocConDan,
                "diaChi": empData?.diaChi
            }
            console.log(bodyy);
            let res = await putUpdateEmp(bodyy)
            if (res) {
                message.success("Tạo tài khoản thành công")
                getAllEmployee(dispatch)
                handleCancel()
            }
            else {
                message.error("Tạo tài khoản thất bại")
            }

        }

    }


    useEffect(() => {
        if (isModalOpen) {
            getType()
        }
    }, [isModalOpen])



    const emp = useSelector((state) => state.emp.emp.data)

    return (
        <>
            <Button onClick={ showModal } size='large' icon={ <PlusCircleOutlined /> }>Tạo tài khoản cho nhân viên</Button>

            <Modal title="Tạo tài khoản cho nhân viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='container'>
                    <div className='mb-3'>
                        <label>Lựa chọn nhân viên</label>
                        <select className='form-control' onChange={ (e) => handleChange(e.target.value) } value={ phone }>
                            <option disabled>Danh sách nhân viên chưa có tài khoản</option>
                            {
                                emp?.map((item, index) => {
                                    return (
                                        <option disabled={ item.maTaiKhoan ? true : false } key={ index } value={ item.soDienThoai }>{ item.tenNhanVien }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Loại tài khoản</label>
                        <select className='form-control' onChange={ (e) => setType(e.target.value) }>
                            {

                                listTypeEmp?.map((item, index) => {
                                    return (
                                        <option key={ index } value={ item.idLoaiTaiKhoan }>{ item.tenLoai }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input type='email' className='form-control' value={ email } onChange={ (e) => setEmail(e.target.value) } />
                    </div>
                    <div className='mb-3'>
                        <label>Số điện thoại</label>
                        <input type='email' className='form-control' value={ phone } onChange={ (e) => setPhone(e.target.value) } />
                    </div>
                    <div className='mb-3'>
                        <label>Mật khẩu</label>
                        <input type='password' className='form-control' value={ password } onChange={ (e) => setPassword(e.target.value) } />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateAccountEmp;