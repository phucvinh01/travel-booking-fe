import { Button, Modal, Space } from 'antd';
import logo from '../../assets/logo-main.jpg'
import React, { useEffect, useRef, useState } from 'react'
import emailValidator from 'email-validator';
const Regsiter = () => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isFull, setIsFull] = useState(false)
    const [errors, setErrors] = useState([])
    const [isValidEmail, setIsValidEmail] = useState("");
    const [isValidPhone, setIsValidPhone] = useState("");
    const [isValidPassword, setIsValidPassword] = useState("");

    const phoneRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        if (email && phone, password, repeatPassword) {
            setIsFull(true)
        }
        if (!email) {
            setIsValidEmail("")
        }
        if (!phone) {
            setIsValidPhone("")
        }
        if (!password || !repeatPassword) {
            setIsValidPassword("")
        }
    }, [email, phone, password, repeatPassword])


    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;
        return phoneNumberRegex.test(phoneNumber);
    };

    const handleSubmit = () => {
        if (!emailValidator.validate(email)) {
            setIsValidEmail("Email không đúng định dạng")
            emailRef.current.focus();
        }
        if (!validatePhoneNumber(phone)) {
            setIsValidPhone("Số điện thoại không hợp lệ")
            phoneRef.current.focus();
        }
        if (password != repeatPassword) {
            setIsValidPassword("Mật khẩu không khớp")
            passwordRef.current.focus()
        }

        let body = {

        }

    }



    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Space onClick={showModal}>
                <Space>
                    <p>Chưa có tài khoản ? <strong>Đăng ký</strong> ngay</p>
                </Space>
            </Space>
            <Modal width={400} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='d-flex justify-content-center'>
                    <img src={logo} width={80}></img>
                </div>
                <h4 className="text-center">Đăng Ký</h4>
                <div className='' >
                    <Space direction='vertical' size={'large'} className='w-100'>
                        <div className='d-flex align-items-center gap-1'>
                            <input
                                ref={emailRef}
                                className='form-control'
                                required
                                name='email'
                                type='email'
                                value={email}
                                id='email'
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}></input>
                            <span className='text-danger'>*</span>
                        </div>
                        {isValidEmail && <p style={{ color: 'red' }}>{isValidEmail}</p>}
                        <div className='d-flex align-items-center gap-1'>
                            <input
                                ref={phoneRef}
                                className='form-control'
                                required
                                type='tel'
                                id="phone"
                                name="phone"
                                value={phone}
                                maxLength={11}
                                placeholder='Phone Number'
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
                            <span className='text-danger'>*</span>
                        </div>
                        {isValidPhone && <p style={{ color: 'red' }}>{isValidPhone}</p>}

                        <div className='d-flex align-items-center gap-1'>
                            <input
                                className='form-control'
                                required
                                type='password'
                                id="password"
                                name="password"
                                value={password}
                                placeholder='***********'
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <span className='text-danger'>*</span>
                        </div>

                        <div className="d-flex align-items-center gap-1">
                            <input
                                ref={passwordRef}
                                className='form-control w-100'
                                type="password"
                                id="confirmedPassword"
                                name="confirmedPassword"
                                value={repeatPassword}
                                placeholder="Confirmed Password"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            >

                            </input>
                            <span className='text-danger'>*</span>

                        </div>
                        {isValidPassword && <p style={{ color: 'red' }}>{isValidPassword}</p>}
                        <div className='mb-3'>
                            <Button className='btn-primary-main'
                                disabled={!isFull ? true : false}
                                block
                                onClick={() => handleSubmit()}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </Space>
                </div>
            </Modal>
        </>
    )
}

export default Regsiter