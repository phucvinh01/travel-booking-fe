import React, { useEffect, useState } from 'react';
import { Button, Modal, Popconfirm, Space, message } from 'antd';
import { Image } from 'phosphor-react';
import Axios from '../../Axios/Axios';
import Slider from 'react-slick';
import Upload from '../Uploads';
import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import './Slider.scss'
import cloudinary from '../../util/Cloudnary';
import ModalAddImgListTour from '../ModalAddImgListTour';
const ModalListImgTour = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [img, setImg] = useState([]);
    const [image, setImage] = useState("")
    const [imgData, setImgData] = useState("")

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const { idTour } = props

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getImg = async (id) => {
        let imgList = await Axios.get(
            `/DanhMucHinh/get-all-danh-muc-hinh-tour?maTour=${id}`
        );
        if (imgList) {
            setImg(imgList);
        }
    };

    const handleImageError = (event, item) => {
        console.log(item);
        event.target.src = item;
    };

    useEffect(() => {
        if (isModalOpen) {
            getImg(idTour);
        }
    }, [idTour, isModalOpen]);

    const confirm = async (e) => {
        let r = await Axios.delete(`/DanhMucHinh/delete-danh-muc-hinh-tour?Id=${idTour}`)
        if (r) {
            message.success("Xóa thành công")
            getImg(idTour)
        } else {
            message.error("Xóa thất bại")
        }
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const handleDeleteAllImg = async () => {
        let r = await Axios.delete(`/DanhMucHinh/delete-list-danh-muc-hinh-tour?maTour=${idTour}`)
        if (r) {
            message.success("Xóa thành công")
            getImg(idTour)
        } else {
            message.error("Xóa thất bại")
        }
    }

    return (
        <>
            <Button icon={ <Image /> } onClick={ showModal } />
            <Modal footer={ null } title="Danh sách hình ảnh" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='mb-3 d-flex justify-content-end gap-3'>
                    <Button danger icon={ <DeleteFilled /> } onClick={ handleDeleteAllImg }>Xóa tất cả hình</Button>
                    <ModalAddImgListTour idTour={ idTour } getImg={ getImg } />
                </div>
                <div className='row'>
                    <div className='mb-5 slide-newproduct col-12'>
                        <Slider  { ...settings }>
                            { img &&
                                img?.length > 0 &&
                                img.map((item, index) => {
                                    return (
                                        <>
                                            <div
                                                key={ index }
                                            >
                                                <img
                                                    loading='lazy'
                                                    width={ "100%" }
                                                    onLoadCapture={ () => setImgData(`..//..//..//src/assets/Images/${item.fileName}`) }
                                                    src={ `..//..//..//src/assets/Images/${item.fileName}` }
                                                    onError={ (event) => event.target.src = item.fileName }
                                                ></img>
                                                <div className='d-flex gap-3 mt-3'>
                                                    <Popconfirm
                                                        title="Xóa"
                                                        description="Có chắc chắn muốn xóa?"
                                                        onConfirm={ confirm }
                                                        onCancel={ cancel }
                                                        okText="Có"
                                                        cancelText="Không"
                                                    >
                                                        <Button danger>Delete</Button>
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }) }
                        </Slider>
                    </div>

                </div>

            </Modal>
        </>
    );
};
export default ModalListImgTour;