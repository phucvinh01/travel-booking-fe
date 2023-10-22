import React, { useState } from 'react';
import { Button, Empty, Modal, message } from 'antd';
import { EyeSlash } from 'phosphor-react';
import { EyeFilled } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOneCusTomerById } from '../../Axios/customer';
import moment from 'moment';
import formatCurrency from '../../util/formatCurrency';
import Axios from '../../Axios/Axios';
import { set } from 'lodash';
const ModalDetaiOrder = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({})
    const { data } = props

    const tour = useSelector((state) => state.tour.tours.data);
    const hotel = useSelector((state) => state.hotel.hotel.data);
    const flight = useSelector((state) => state.flight.flight.data);
    const [member, setMember] = useState([])
    const [customer, setCustomer] = useState({})


    const postCheckout = async () => {
        try {
            let body = {
                "idDatTour": state.idDatTour,
                "maKhach": state.maKhach,
                "maHuongDanVien": state.maHuongDanVien,
                "maTour": state.maTour,
                "soLuong": state.soLuong,
                "ngayDat": state.ngayDat,
                "trangThai": true,
                "thanhViens": member.map((item) => {
                    return ({
                        "idThanhVien": item.idThanhVien,
                        "hoTen": item.hoTen,
                        "gioiTinh": item.gioiTinh,
                        "canCuocConDan": item.canCuocConDan,
                        "ngaySinh": item.ngaySinh,
                        "maDatTour": item.maDatTour
                    })
                })
            }

            let r = await Axios.put(`/DatTour/thanh-toan-dat-tour`, body)
            if (r) {
                message.success("Thanh toán thành công")
                setIsModalOpen(false);
            }

        }
        catch (err) {
            message.success(err)

        }
    }

    const getMember = async (id) => {
        let r = await Axios.get(`/ThanhVien/get-all-thanh-vien?maDatTour=${id}`)
        if (r) {
            setMember(r)
        }
    }

    const getNameTour = () => {
        const comparisonItem = tour.find(item => item.idTour === state?.maTour);
        return comparisonItem;
    }

    const getFlight = () => {
        const comparisonItem = flight.find(item => item.idChuyenBay === getNameTour()?.maChuyenBay);
        return comparisonItem;
    }

    const getHotel = () => {
        const comparisonItem = hotel.find(item => item.idKhachSan === getNameTour()?.maKhachSan);
        return comparisonItem;
    }

    const getCustomer = async (id) => {
        let r = await getOneCusTomerById(id)
        if (r) {
            setCustomer(r)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            setState(data)
            getCustomer(state.maKhach)
            getMember(state.idDatTour)
            console.log(data);

        }
    }, [state, isModalOpen])



    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        postCheckout()

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button style={ { backgroundColor: "black", color: "white" } } icon={ <EyeFilled /> } onClick={ showModal }>
            </Button>
            <Modal footer={ [
                <Button key="back" onClick={ handleCancel }>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={ handleOk }>
                    { state.trangThai ? "Thanh toán" : "" }
                </Button>,
            ] } style={ { overflow: 'auto' } }
                bodyStyle={ { maxHeight: 'calc(100vh - 200px)', overflow: 'auto' } } title="Chi tiết order" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='mb-3'>
                    <p><strong>Tour</strong></p>
                    <p>Mã đặt tour: <strong>{ state.idDatTour }</strong></p>
                    <p>Tên tour: <strong>{ getNameTour()?.tenTour }</strong>  </p>
                    <p>Ngày khởi hành: <strong>{ moment(state.ngayDat).format("DD/MM/YYYY") }</strong></p>
                </div>
                <div className='mb-3'>
                    <p><strong>Chi tiết tour</strong></p>
                    <p>Phương tiện di chuyển: <strong>{ getNameTour()?.phuongTienDiChuyen }</strong></p>
                    {
                        getNameTour()?.phuongTienDiChuyen !== "Xe" && <p>Hãng bay: <strong>{ getFlight()?.hangBay }</strong></p>

                    }
                    <p>Ngày khởi hành: <strong>{ moment(state.ngayDat).format("DD/MM/YYYY") }</strong></p>
                    <p>Giá: <strong>{ formatCurrency.format(getNameTour()?.chiPhi) }</strong></p>
                </div>

                <div className='mb-3'>
                    <p><strong>Khách sạn</strong></p>
                    <p>Tên khách sạn: <strong>{ getHotel()?.tenKhachSan }</strong> </p>
                    <p>Hạng sao: <strong>{ getHotel()?.hangSao }</strong>  </p>
                    <p>Địa chỉ: <strong>{ getHotel()?.diaChi } </strong> </p>
                </div>

                <div className='mb-3'>
                    <p><strong>Người đặt</strong></p>
                    <p>Tên khách sạn: <strong>{ customer?.hoTen }</strong> </p>
                    <p>Số điện thoại: <strong>{ customer?.soDienThoai }</strong></p>
                    <p>Email: <strong>{ customer?.email }</strong></p>
                </div>

                <div className='mb-3'>
                    <p><strong>Thành viên</strong></p>
                    {
                        member && member.map((item, index) => {
                            return (<>
                                <div key={ index } className='mb-1'>
                                    <p><strong>{ item.hoTen } , <strong>{ item.gioiTinh ? "Nam" : "Nữ" }</strong> ,<strong>{ moment(item.ngaySinh).format('DD/MM/YYYY') }</strong> </strong></p>
                                </div>
                            </>)
                        })
                    }
                </div>

                <div className='mb-3'>
                    <p><strong>Hóa đơn</strong></p>
                    <p>Số lượng người: <strong>{ state.soLuong }</strong> </p>
                    <p>Tổng: <strong>{ formatCurrency.format(+getNameTour()?.chiPhi * +state.soLuong) }</strong></p>
                </div>
            </Modal>
        </>
    );
};
export default ModalDetaiOrder;