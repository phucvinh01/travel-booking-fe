import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { add } from 'lodash';
import { date } from 'yup';
import { useEffect } from 'react';
import { postCreateCustomer } from '../../Axios/customer';
const ModalCreateInfo = (props) => {


    const { state } = props
    console.log(state);
    const [name, setName] = useState("")
    const [gender, setGender] = useState(true)
    const [address, setAddress] = useState("")
    const [day, setDay] = useState("")
    const [full, setFull] = useState(false)

    useEffect(() => {
        if (name && gender, address, day) {
            setFull(true)
        }
        else {
            setFull(false)
        }
    }, [name, gender, address, day])

    const handleSave = async () => {
        let body = {
            "hoTen": name.trim(),
            "gioiTinh": gender,
            "diaChi": address.trim(),
            "email": state.email,
            "ngaySinh": day,
            "soDienThoai": state.soDienThoai,
            "maTaiKhoan": state.idTaiKhoan
        }
        let r = await postCreateCustomer(body)
        console.log(r);
        if (r.status === 400) {
            message.error("Có cái gì đó không đúng?")
            return
        }
        else {
            message.success("Cập nhật thông tin thành công")
            props.handleCancel();
        }
    }

    return (
        <>
            <Modal maskClosable={false} footer={null} closeIcon={null} title="Thông tin của bạn" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
                <div className='mb-3'>
                    <label>Họ và tên</label>
                    <input type='text' value={name} className='form-control' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Giới tính</label>
                    <select value={gender} defaultValue={true} className='form-control' onChange={(e) => setGender(e.target.value)}>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label>Địa chỉ</label>
                    <input type='text' value={address} className='form-control' onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Ngày sinh</label>
                    <input type='date' value={day} className='form-control' onChange={(e) => setDay(e.target.value)} />
                </div>
                <div className='d-flex justify-content-end'>
                    <Button disabled={!full ? true : false} onClick={handleSave}>Lưu</Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalCreateInfo;