import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TableOrder from '../TableOrder';
import { SendOutlined } from '@ant-design/icons';
import { useEffect } from 'react';


const ModalOrder = (props) => {

    const { quantity, idTour, dayOrder } = props


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
            <Button type="primary" block onClick={showModal} >
                Yêu cầu đặt tour
            </Button>
            <Modal footer={null} width={600} title="Hãy cung cấp cho chúng tôi thông tin về bạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TableOrder quantity={quantity} idTour={idTour} dayOrder={dayOrder} />
            </Modal>
        </>
    );
};
export default ModalOrder;