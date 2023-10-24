import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Axios from '../../Axios/Axios';
import { BlockOutlined } from '@ant-design/icons';
import { getItems, getItemsAdmin } from '../../redux/api';
import { useDispatch } from 'react-redux';
const ModalBLockTour = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let r = await Axios.delete(`/Tour/delete-one-tour?Id=${prop.record.idTour}`)
        if (r) {
            message.success("Del thanh cong")
            getItemsAdmin(dispatch)
            setIsModalOpen(false)
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async (id) => {

    }
    return (
        <>
            <Button onClick={ () => showModal() } icon={ <BlockOutlined /> } title='Ngưng hoạt động' />
            <Modal title="Ngưng hoạt động" open={ isModalOpen } onOk={ handleOk } okButtonProps={ { style: { backgroundColor: "red" } } } onCancel={ handleCancel }>
                <p>Bạn có chắc chắn sẽ ngưng hoạt động tour <strong>{ prop.record.tenTour }</strong></p>
            </Modal>
        </>
    );
};
export default ModalBLockTour;