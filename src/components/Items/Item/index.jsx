import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
const { Meta } = Card;
import './Item.scss';
import formatCurrency from '../../../util/formatCurrency';
import _, { includes } from 'lodash';
import { useDispatch } from 'react-redux';
import { Airplane, Train } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';
// import { deleteProduct } from '../../axios/ProductRequest';
// import { getProductList } from '../../redux/api';
// import { useDispatch, useSelector } from 'react-redux';
//import ModalEdit from '../ModalEdit';
const Item = (props) => {

    const { data } = props

    const navigate = useNavigate()

    // const [open, setOpen] = useState(false);
    // const [openEdit, setOpenEdit] = useState(false);
    // const [openDetail, setOpenDetail] = useState(false);
    // const [stateEdit, setStateEdit] = useState({});
    // const [stateProduct, setStateProduct] = useState({})

    // const handleEdit = (props) => {
    //     setOpenEdit(true);
    //     setStateEdit(props);
    // };

    // const handleShowDetail = (props) => {
    //     setOpenDetail(true)
    //     setStateProduct(props)
    // }


    // const showModal = (type) => {
    //     switch (type) {
    //         case 'EDIT':
    //             setOpenEdit(true);
    //             break;
    //         case 'DEL':
    //             setOpen(true);
    //             break;
    //         case 'DETAIL':
    //             setOpenDetail(true);
    //             break;
    //         default:
    //             break;
    //     }
    // };
    // const handleOk = () => {
    //     setOpen(false);
    // };

    // const handleCancel = (type) => {
    //     switch (type) {
    //         case 'EDIT':
    //             setOpenEdit(false);
    //             break;
    //         case 'DEL':
    //             setOpen(false);
    //             break;
    //         case 'DETAIL':
    //             setOpenDetail(false);
    //             break;
    //         default:
    //             break;
    //     }
    // };

    // const handleDelete = async (id) => {
    //     let res = await deleteProduct(id);
    //     if (res.success) {
    //         // toast.success('Deleted.......');
    //         getProductList(dispatch);
    //     } else {
    //         //toast.error('Delete failed.......');
    //     }
    // };

    return (
        <>


            <div
                className='col-lg-3 col-md-6 col-sm-12 mb-3'
                key={ props._id }>
                <Card
                    bordered={ false }
                    className='position-relative card-product'
                    hoverable
                    style={ {
                        width: 280,
                    } }
                    cover={
                        <img
                            loading='lazy'
                            alt='example'
                            src={ data.anhBia }
                            style={ { height: '280px' } }
                        />
                    }>
                    <div className='p-2'>
                        <div className='card-content-inner'>
                            <p className='card-content__decsrciption'>{ data?.tenTour }</p>
                            <Space size={ 'large' } align='center' className='d-flex justify-content-between' >
                                <Space >
                                    <ClockCircleOutlined />
                                    <p>{ data.moTa }</p>
                                </Space>
                                <Space >
                                    {
                                        data.phuongTienDiChuyen.includes('xe') ? <CarOutlined /> : data.phuongTienDiChuyen.includes('maybay') ? <Airplane size={ 16 } /> : <Train size={ 16 } />
                                    }
                                </Space>
                            </Space>
                            <p className='text-end text-danger fw-bolder' style={ { fontSize: 18 } }>
                                { formatCurrency.format(data?.chiPhi) }
                            </p>
                        </div>
                    </div>
                    <button onClick={ () => navigate('/tours:id') }
                        className='btn-quick'
                    >
                        <span>XEM CHI TIẾT</span>
                    </button>
                    {/* { props?.user?.role === 1 && (
                        <div className='d-flex p-3 gap-2'>
                            <Button
                                block
                                danger
                                onClick={ () => showModal('DEL') }>
                                <DeleteOutlined />
                            </Button>
                            <Button
                                block
                                onClick={ () => handleEdit(props) }>
                                <EditOutlined />
                            </Button>
                        </div>
                    ) } */}
                </Card>
            </div>
        </>
    );
};

{/* <Modal
                open={ open }
                onOk={ handleOk }
                onCancel={ () => handleCancel('DEL') }
                footer={ false }>
                <strong className='text-danger'>Delete?</strong>
                <p>
                    Bạn có chắc muốn xóa <strong>{ data.tenTour }</strong>?
                </p>
                <div className='d-flex p-3 gap-3 justify-content-end'>
                    <button
                        className='btn btn-info'
                        onClick={ handleCancel }>
                        Hủy
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={ () => handleDelete(props._id) }>
                        Xóa
                    </button>
                </div>
            </Modal> */}

{/* <ModalDetail
                open={ openDetail }
                onOk={ handleOk }
                onCancel={ () => handleCancel('DETAIL') }
                footer={ false }
                state={ stateProduct }
                user={ props.user && props.user }
            />

            <ModalEdit
                handleCancel={ handleCancel }
                openEdit={ openEdit }
                state={ stateEdit }
            /> */}

export default Item;
