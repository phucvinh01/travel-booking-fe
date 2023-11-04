import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { putForgotPassword } from '../../Axios/Account';
const ModalForgotPassword = (props) => {

    const { handleCloes } = props



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [done, setDone] = useState(false)

    useEffect(() => {
        handleCloes()
        setDone(false)
    }, [isModalOpen])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let r = await putForgotPassword(email)
        if (r) {
            message.success("Mật khẩu đã gữi đến email của bạn")
            setDone(true)
        }
        else {
            message.success("Email không tồn tại")
            setDone(false)
        }
    };
    const handleCancel = () => {
        setDone(false)
        setIsModalOpen(false);
    };
    return (
        <>
            <Button style={ { color: "blue" } } type="text" onClick={ showModal }>
                Quên Mật Khẩu
            </Button>
            <Modal footer={ null } title="Quên Mật Khẩu" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div hidden={ done }>
                    <p className='text-center'><strong >Mật khẩu mới sẽ được gữi tới email của bạn</strong></p>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input className='form-control' type='email' value={ email } onChange={ (e) => setEmail(e.target.value) } />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button icon={ <SendOutlined /> } onClick={ () => handleOk() } ></Button>
                    </div>
                </div>
                <div hidden={ !done }>
                    <p>Đã gữi mật khẩu mới tới email của bạn!!!</p>
                </div>

            </Modal>
        </>
    );
};
export default ModalForgotPassword;