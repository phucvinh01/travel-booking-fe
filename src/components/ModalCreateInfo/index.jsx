import React, { useState } from 'react';
import { Button, Modal, Radio, message } from 'antd';
import { add } from 'lodash';
import { date } from 'yup';
import { useEffect } from 'react';
import { postCreateCustomer } from '../../Axios/customer';
import { Toast } from 'bootstrap';
const ModalCreateInfo = (props) => {


    const { state } = props
    const [age, setAge] = useState(0);
    const [name, setName] = useState("")
    const [gender, setGender] = useState(true)
    const [address, setAddress] = useState("")
    const [day, setDay] = useState("")
    const [full, setFull] = useState(false)

    const onChange = (e) => {
        setGender(e.target.value);
    };
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDay(selectedDate);

        const today = new Date();
        const birthDate = new Date(selectedDate);
        const diffTime = Math.abs(today - birthDate);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        console.log(diffYears);
        if (diffYears < 18) {
            message.error("Yêu cầu lớn hơn 18 tuổi")
            setDay("")
            return
        }
        setDay(selectedDate);
    };

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
            "gioiTinh": JSON.parse(gender),
            "diaChi": address.trim(),
            "email": state.email,
            "ngaySinh": day,
            "soDienThoai": state.soDienThoai,
            "maTaiKhoan": state.idTaiKhoan
        }
        let r = await postCreateCustomer(body)
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
                    <Radio.Group onChange={onChange} value={gender}>
                        <Radio value={true}>Nam</Radio>
                        <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                </div>
                <div className='mb-3'>
                    <label>Địa chỉ</label>
                    <input type='text' value={address} className='form-control' onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Ngày sinh</label>
                    <input type='date' value={day} className='form-control' onChange={(e) => handleDateChange(e)} />
                </div>
                <div className='d-flex justify-content-end'>
                    <Button disabled={!full ? true : false} onClick={handleSave}>Lưu</Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalCreateInfo;