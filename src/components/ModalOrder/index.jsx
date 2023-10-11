import React, { useState } from 'react';
import { Button, Modal } from 'antd';


const renderForm = () => {
    const form = [];
    for (let i = 1; i <= n; i++) {
        form.push(
            <button key={ i } onClick={ () => handleClick(i) }>
                Button { i }
            </button>
        );
    }
    return form;
};
const ModalOrder = (props) => {

    const { quantity } = props

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
            <Button type="primary" block onClick={ showModal }>
                Yêu cầu đặt tour
            </Button>
            <Modal title="Thành viên" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>

            </Modal>
        </>
    );
};
export default ModalOrder;