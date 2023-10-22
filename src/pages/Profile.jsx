import React, { useId } from 'react'
import { Breadcrumb, Button, Card, Form, Input, message, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneCusTomerById, getOneCusTomerByIdAccoutn } from '../Axios/customer';
import { useState } from 'react';
import { EditFilled, SaveFilled } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
const Profile = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [info, setInfo] = useState({})
    const [img, setImg] = useState('')
    const [disenable, setDisenable] = useState(false)
    const id = useId()
    const [name, setName] = useState("")
    const [day, setDay] = useState("")
    const [email, setEmail] = useState("")

    const getInfo = async () => {
        try {
            let r = await getOneCusTomerByIdAccoutn(user.idTaiKhoan)
            if (r) {
                setInfo(r)
            }
        } catch (error) {
            message.error(error)
        }
    }

    useEffect(() => {
        getInfo()
    }, [user])
    return (
        <>
            <div className='container ' style={ { marginTop: "100px" } }>
                <div className='row'>
                    <div className='col-4'>
                        <img className='w-100 rounded-3' height={ 400 } src="https://source.unsplash.com/random">
                        </img>
                    </div>
                    <div className='col-8'>
                        <Breadcrumb className='mb-3'
                            items={ [
                                {
                                    title: <Link to={ '/' }>Trang chủ</Link>,
                                },
                                {
                                    title: <span>Tài khoản</span>,
                                },
                            ] }
                        />
                        <section>
                            <h2>Tài khoản</h2>
                        </section>
                        <section>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'name' }>Tên <span className='text-danger'>*</span> </label>
                                        <input disabled={ !disenable ? true : false } value={ info.hoTen } id={ id + 'name' } type='text' className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'email' }>Email  <span className='text-danger'>*</span></label>
                                        <input disabled={ !disenable ? true : false } value={ user.email } id={ id + 'email' } type='text' className='form-control w-100'></input>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'last-name' } >Ngày sinh <span className='text-danger'>*</span> </label>
                                        <input disabled={ !disenable ? true : false } value={ moment(info.ngaySinh).format('DD/MM/YYYY') } id={ id + 'last-name' } type='text' className='form-control w-100'></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'phone' }>Số điện thoại  <span className='text-danger'>*</span></label>
                                        <input disabled={ !disenable ? true : false } value={ user.soDienThoai } id={ id + 'phone' } type='tel' className='form-control w-100'></input>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='mb-3'>
                                        <label htmlFor={ id + 'last-name' }>Địa chỉ <span className='text-danger'>*</span> </label>
                                        <input disabled={ !disenable ? true : false } value={ info.diaChi } id={ id + 'last-name' } type='text' className='form-control w-100'></input>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className='d-flex justify-content-end'>
                                {
                                    disenable ?
                                        <Button onClick={ () => setDisenable(!disenable) } icon={ <SaveFilled /> }>Lưu</Button>
                                        : <Button onClick={ () => setDisenable(!disenable) } icon={ <EditFilled /> }>Chỉnh sửa</Button>
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile