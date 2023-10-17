import React, { useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { getCityList } from '../../Axios/VnProvinces';
import Axios from '../../Axios/Axios'
import { EyeSlash, PlusCircle } from 'phosphor-react';
import { useEffect } from 'react';
import { set } from 'lodash';
import { postCreateOneHotel, putUpdateOneHotel } from '../../Axios/Hotel';
import { getHotel } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { EditFilled, SaveFilled } from '@ant-design/icons';



const ModalEditHotel = (props) => {


    const { state, isModalOpen, handleCancel, handleOk } = props

    useEffect(() => {
        console.log(state);
        if (isModalOpen) {
            setAddress(state.diaChi)
            setNameHotel(state.tenKhachSan)
            setPhone(state.soDienThoai)
            setStar(state.hangSao)
            setId(state.idKhachSan)
        }
    }, [state])

    const dispatch = useDispatch()

    const [nameHotel, setNameHotel] = useState("")
    const [star, setStar] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("");
    const [isFull, setIsFull] = useState(false)
    const [id, setId] = useState("")


    useEffect(() => {
        if (nameHotel && phone, star, address) {
            setIsFull(true)
        }
    }, [nameHotel, phone, star, address])

    const handleSave = async () => {
        let body = {
            "idKhachSan": id,
            "tenKhachSan": nameHotel.trim(),
            "hangSao": star,
            "diaChi": address.trim(),
            "soDienThoai": phone
        }

        let r = await putUpdateOneHotel(body)
        if (r) {
            message.success(`Chỉnh sửa ${nameHotel} thành công`)
            getHotel()
            handleCancel()
        }
        else {
            message.error(`Chỉnh sửa ${nameHotel} thất bại`)
        }
    }



    return (
        <>
            <Modal footer={null} title="Thêm một khách sạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='row'>
                    <div>
                        <div className="mb-3">
                            <label>Tên khách sạn</label>
                            <input type='text' value={nameHotel} className='form-control w-100' onChange={(e) => setNameHotel(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Số điện thoại</label>
                            <input type='tel' value={phone} className='form-control w-100' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Hạng sao</label>
                            <input type='number' min={0} max={5} value={star} className='form-control w-100' onChange={(e) => setStar(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Địa chỉ</label>
                            <input className='form-control' placeholder='Số nhà, tên đường' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={handleSave} type='primary' icon={<SaveFilled />}>Lưu</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalEditHotel;