import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
const { Meta } = Card;
import './Item.scss';
import formatCurrency from '../../../util/formatCurrency';
import _, { includes } from 'lodash';
import { useDispatch } from 'react-redux';
import { Airplane, Train } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom';
import ModalEditTour from '../../ModalEditTour';
import ModalScludeTour from '../../ModalScludeTour/inde';
// import { deleteProduct } from '../../axios/ProductRequest';
// import { getProductList } from '../../redux/api';
// import { useDispatch, useSelector } from 'react-redux';
//import ModalEdit from '../ModalEdit';
const Item = (props) => {

    const { data } = props

    const navigate = useNavigate()

    const location = useLocation()

    const [imgSrc, setImgSrc] = useState('')

    const [state, setState] = useState({})

    useEffect(() => {
        setImgSrc(data.anhBia)
    }, [data])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setState(data)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
            <ModalEditTour isModalOpen={ isModalOpen } handleOk={ handleOk } handleCancel={ handleCancel } state={ state } />
            {/* className='col-lg-4 col-md-6 col-sm-12 mb-4' */ }
            {

                data.trangThai &&
                <div
                    key={ data.idTour }>
                    <Card
                        bordered={ false }
                        className='card-product'
                        hoverable={ true }
                        style={ {
                            width: "100%",
                        } }>
                        <div class="card_view">
                            <div class="card_image">
                                <img loading='lazy' alt='example' src={ "..//..//..//src/assets/Images/" + imgSrc } onError={ () => setImgSrc(data.anhBia) } style={ { width: '100%' } } />
                            </div>

                            <div class="card_view_back">
                                <p>{ data.moTa }</p>
                            </div>

                            {/* <div class="card_promotion">
                            <p>Giảm ngay    : 100%</p>
                        </div> */}
                            <div class="card_main">
                                <div class="card_body">
                                    <h5>{ data?.tenTour.length > 60 ? data?.tenTour.slice(0, 60) + "..." : data?.tenTour }</h5>
                                    <div className='p-2'>
                                        <Space size={ 'large' } align='center' className='d-flex justify-content-between' >
                                            <Space style={ { margin: "-5%" } } >
                                                <ClockCircleOutlined />
                                                <p>{ data.moTa.length > 100 ? data.moTa.slice(0, 100) + "..." : data.moTa }</p>
                                            </Space>
                                        </Space>
                                        <br />
                                        <p className='text-end text-danger fw-bolder' style={ { fontSize: 18, marginRight: "5%" } }  >
                                            { formatCurrency.format(data?.chiPhi) }
                                        </p>
                                    </div>

                                </div>
                                <div className='card_link'>
                                    {
                                        location.pathname.includes('admin') ? <><Button icon={ <EditOutlined /> } className='btn-quick' type="primary" onClick={ showModal }>
                                            Chỉnh sửa
                                        </Button></>
                                            : <Button size='large' onClick={ () => navigate(`/tours/${data?.idTour}`) }
                                                className='see'
                                            >
                                                <span className='fw-bolder'>XEM CHI TIẾT</span>
                                            </Button>
                                    }

                                </div>
                            </div>

                        </div>
                    </Card>
                </div>
            }
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
