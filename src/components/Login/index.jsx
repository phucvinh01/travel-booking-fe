import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Space } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import logo from '../../assets/logo-main.jpg'
import { useFormik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidEmail, setIsValidEmail] = useState("");
    const [isValidPassword, setIsValidPassword] = useState("");
    const [isFull, setIsFull] = useState(false)
    const [errors, setErrors] = useState([])
    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        if (email && password) {
            setIsFull(true)
        }
        if (!email) {
            setIsValidEmail("")
            setIsFull(false)

        }
        if (!password) {
            setIsValidPassword("")
            setIsFull(false)

        }
    }, [email, password])

    const handleSubmit = () => {
        if (!EmailValidator.validate(email)) {
            setIsValidEmail("Email không đúng định dạng")
            emailRef.current.focus();
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
            <Space onClick={ showModal }>
                <LoginOutlined />
                <p>Đăng nhập</p>
            </Space>
            <Modal width={ 400 } footer={ null } open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='d-flex justify-content-center'>
                    <img src={ logo } width={ 80 }></img>
                </div>
                <h4 className="text-center">Đăng nhập</h4>
                <div className='' >
                    <Space direction='vertical' size={ 'large' } className='w-100'>
                        <div className='d-flex align-items-center gap-1'>
                            <input
                                ref={ emailRef }
                                className='form-control'
                                required
                                name='email'
                                type='email'
                                value={ email }
                                id='email'
                                placeholder='Email'
                                onChange={ (e) => setEmail(e.target.value) }></input>
                            <span className='text-danger'>*</span>
                        </div>
                        { isValidEmail && <p style={ { color: 'red' } }>{ isValidEmail }</p> }

                        <div className='d-flex align-items-center gap-1'>
                            <input
                                className='form-control'
                                required
                                type='password'
                                id="password"
                                name="password"
                                value={ password }
                                placeholder='***********'
                                onChange={ (e) => setPassword(e.target.value) }
                            ></input>
                            <span className='text-danger'>*</span>
                        </div>
                        { isValidPassword && <p style={ { color: 'red' } }>{ isValidPassword }</p> }

                        <p className='text-end'>
                            <a style={ { color: "blue" } }>Forgot your password?</a>
                        </p>
                        <div className='mb-3'>
                            <Button className='btn-primary-main'
                                disabled={ !isFull ? true : false }
                                onClick={ () => handleSubmit() }
                                block
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </Space>
                </div>
            </Modal>
        </>
    );
}

export default Login