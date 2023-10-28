import React, { useState } from 'react';
import { Button, Modal, Radio, Select, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../Axios/Axios'
import { getflight } from '../../redux/api';
const ModalCreateFlight = () => {

    const ari = useSelector((state) => state.airfield.airfield.data);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [hangBay, setHangBay] = useState("")
    const [gioKhoiHanh, setGioKhoiHanh] = useState("")
    const [gioDen, setGioDen] = useState("")
    const [mayBay, setMayBay] = useState("")
    const [noiDi, setNoiDi] = useState("")
    const [noiDen, setNoiDen] = useState("")



    const showModal = () => {
        setIsModalOpen(true);
    };


    const dispatch = useDispatch()

    const handleOk = async () => {

        let body = {
            "hangBay": hangBay,
            "gioKhoiHanh": gioKhoiHanh,
            "noiKhoiHanh": noiDi,
            "gioDen": gioDen,
            "noiDen": noiDen,
            "khuHoi": false,
            "mayBay": mayBay,
            "trangThai": true,
            "maChuyenVe": null
        }
        let r = await Axios.post('/ChuyenBay/create-one-chuyen-bay', body)
        if (r) {
            message.success("Thêm thành công")
            getflight(dispatch)
            setIsModalOpen(false);
        }
        else {
            message.error("Thêm thất bại")
            return
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button icon={ <PlusCircleFilled /> } type="primary" onClick={ showModal }>
                Thêm một chuyến bay
            </Button>
            <Modal title="Thêm một chuyến bay" open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel }>
                <div className='mb-3'>
                    <label>Hãng bay</label>
                    <select className='form-control' value={ hangBay } onChange={ (e) => setHangBay(e.target.value) }>
                        <option value={ "Vietnam Airlines" }>
                            Vietnam Airlines
                        </option>
                        <option value={ "Vietjet Air" }>
                            Vietjet Air
                        </option>
                        <option value={ "Pacific Airlines" }>
                            Pacific Airlines
                        </option>
                        <option value={ "Bamboo Airways" }>
                            Bamboo Airways
                        </option>
                        <option value={ "Viettravel Airlines" }>
                            Viettravel Airlines
                        </option>
                        <option value={ "Vietstar Airlines" }>
                            Vietstar Airlines
                        </option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label>Giờ khởi hành</label>
                    <input type='datetime-local' className='form-control' value={ gioKhoiHanh } onChange={ (e) => setGioKhoiHanh(e.target.value) }></input>
                </div>
                <div className='mb-3'>
                    <label className='d-block'>Sân bay đi</label>
                    <Select
                        onChange={ (value) => setNoiDi(value) }
                        style={ { width: "100%" } }
                        size='large'
                        options={
                            ari?.length > 0 && ari.map((item) => {
                                return {
                                    value: item.idSanBay,
                                    label: item.tenSanBay,
                                    key: item.idSanBay,
                                }
                            })
                        }
                    />
                </div>
                <div className='mb-3'>
                    <label className='d-block'>Sân bay đến</label>
                    <Select
                        onChange={ (value) => setNoiDen(value) }
                        style={ { width: "100%" } }
                        size='large'
                        options={
                            ari?.length > 0 && ari.map((item) => {
                                return {
                                    value: item.idSanBay,
                                    label: item.tenSanBay,
                                    key: item.idSanBay,
                                }
                            })
                        }
                    />
                </div>
                <div className='mb-3'>
                    <label>Giờ đến</label>
                    <input type='datetime-local' className='form-control' value={ gioDen } onChange={ (e) => setGioDen(e.target.value) }></input>
                </div>
                <div className='mb-3'>
                    <label>Tên máy bay</label>
                    <input value={ mayBay } type='text' className='form-control' onChange={ (e) => setMayBay(e.target.value) } />
                </div>
                <div className='mb-3'>
                    <Radio.Group  >
                        <Radio value={ 1 }>Khứ hồi</Radio>
                    </Radio.Group>
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateFlight;