import React, { useRef, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Ladder } from 'phosphor-react';
import { putChangePassword } from '../../Axios/Account';
const ModalChangePassword = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [passwordNew, setPasswordNew] = useState("")
    const [comfrimPassword, setComfrimPassword] = useState("")
    const passRef = useRef()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleChangePassword();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangePassword = async () => {

        if (passwordNew !== comfrimPassword) {
            message.error("Mật khẩu không đúng")
            passRef.current.focus();
            return
        }

        let body = {
            "email": email,
            "matKhau": passwordNew
        }
        let r = await putChangePassword(body)
        if (r) {
            message.success("Thay đổi mật khẩu thành công")
            handleCancel();
        }
        else {
            message.error("Thay đổi mật khẩu thất bại")
        }
    }

    return (
        <>
            <Button icon={ <ReloadOutlined /> } onClick={ showModal }>
                Đổi mật khẩu
            </Button>
            <Modal width={ 400 } title="Đổi mật khẩu" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type='email' value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control' />
                </div>
                <div className='mb-3'>
                    <label>Mật khẩu mới</label>
                    <input type='password' value={ passwordNew } onChange={ (e) => setPasswordNew(e.target.value) } className='form-control' />
                </div>
                <div className='mb-3'>
                    <label>Lặp lại Mật khẩu</label>
                    <input ref={ passRef } type='password' value={ comfrimPassword } onChange={ (e) => setComfrimPassword(e.target.value) } className='form-control' />
                </div>
            </Modal>
        </>
    );
};
export default ModalChangePassword;