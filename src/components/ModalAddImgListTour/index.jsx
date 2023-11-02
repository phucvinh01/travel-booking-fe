import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import Upload from '../Uploads';
import Axios from '../../Axios/Axios';
import cloudinary from '../../util/Cloudnary';

const ModalAddImgListTour = (props) => {
    const [image, setImage] = useState("")

    const { idTour, getImg } = props

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        uploadImg()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const uploadImg = async () => {
        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let body = {
                "fileName": res.data.secure_url,
                "maTour": idTour
            }
            let r = await Axios.post(`/DanhMucHinh/create-danh-muc-hinh-tour`, body)
            if (r) {
                message.success('Thêm hình thành công')
                handleCancel();
                getImg(idTour)
            }
            else {
                message.error("Thêm hình thất bại")
                return
            }
        }

    }
    return (
        <>
            <Button icon={ <PlusCircleFilled /> } type="primary" onClick={ showModal }>
                Thêm hình ảnh
            </Button>
            <Modal title="Basic Modal" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <Upload setImage={ setImage } />
            </Modal>
        </>
    );
};
export default ModalAddImgListTour;