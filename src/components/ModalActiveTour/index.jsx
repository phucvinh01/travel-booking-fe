import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Axios from '../../Axios/Axios';
import { BlockOutlined, PushpinOutlined, RedoOutlined, StopFilled } from '@ant-design/icons';
import { getItems, getItemsAdmin } from '../../redux/api';
import { useDispatch } from 'react-redux';
const ModalActiveTour = (prop) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let r = await Axios.put(`/Tour/kich-hoat-one-tour?IdTour=${prop.record.idTour}`)
        if (r) {
            message.success("Cập nhập thành công")
            getItemsAdmin(dispatch)
            setIsModalOpen(false)
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={ () => showModal() } icon={ <RedoOutlined /> } title='Hoạt động lại tour' />
            <Modal title="Hoạt động lại tour" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <p>Cập nhật hoạt động lại tour <strong>{ prop.record.tenTour }</strong></p>
            </Modal>
        </>
    );
};
export default ModalActiveTour;