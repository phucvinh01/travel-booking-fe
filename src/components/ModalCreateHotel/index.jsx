import React, { useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { getCityList } from '../../Axios/VnProvinces';
import Axios from '../../Axios/Axios'
import { PlusCircle } from 'phosphor-react';
import { useEffect } from 'react';
import { set } from 'lodash';
import { postCreateOneHotel } from '../../Axios/Hotel';
import { getHotel } from '../../redux/api';
import { useDispatch } from 'react-redux';



const ModalCreateHotel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listCity, setListCity] = useState([]);
    const [listDist, setListDist] = useState([]);
    const [listWard, setListWard] = useState([]);
    const [cityCode, setCityCode] = useState(0);
    const [distCode, setDistCode] = useState(0);

    const dispatch = useDispatch()

    const [nameHotel, setNameHotel] = useState("")
    const [star, setStar] = useState("")
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("")
    const [dist, setDist] = useState("");
    const [ward, setWard] = useState("");
    const [detail, setDetail] = useState("");
    const [isFull, setIsFull] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        let body = {
            "tenKhachSan": nameHotel.trim(),
            "hangSao": star,
            "diaChi": `${detail.trim()}, ${ward},${dist}, ${city}`,
            "id_Xa": cityCode,
            "soDienThoai": phone.trim()
        }

        let r = await postCreateOneHotel(body)
        if (r) {
            message.success(`Thêm khách sạn ${nameHotel} thành công`)
            getHotel(dispatch)
            setIsModalOpen(false);
        }
        else {
            message.error(`Thêm khách sạn ${nameHotel} thất bại`)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function getValue(e) {
        return e.target.children[e.target.selectedIndex].getAttribute('data-name');
    }

    const getCity = async () => {
        let res = await getCityList();
        if (res) {
            setListCity(res);
        }
    };

    const getDist = async (cityCode) => {
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
        );
        if (res) {
            setListDist(res.districts);
        }
    };

    const getWards = async (distCode) => {
        let res = await Axios.get(
            `https://provinces.open-api.vn/api/d/${distCode}?depth=2`
        );
        if (res) {
            setListWard(res.wards);
        }
    };

    useEffect(() => {
        if (cityCode) {
            getDist(cityCode);
        }
        if (distCode) {
            getWards(distCode);
        }
    }, [cityCode, distCode]);

    useEffect(() => {
        getCity();
    }, []);

    useEffect(() => {
        if (nameHotel && phone, star, city, dist, ward, detail) {
            setIsFull(true)
        }
    }, [nameHotel, phone, star, city, detail, dist, ward])

    // {
    //     "tenKhachSan": "string",
    //         "hangSao": "string",
    //             "diaChi": "string",
    //                 "id_Xa": "string",
    //                     "soDienThoai": "string"
    // }
    return (
        <>
            <Button type="primary" onClick={showModal} icon={<PlusCircle />}>
                Thêm một khách sạn
            </Button>
            <Modal okButtonProps={
                { disabled: !isFull ? true : false }
            } title="Thêm một khách sạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='row'>
                    <div className='col-6'>
                        <Space direction='vertical'>
                            <Space>
                                <label>Tên khách sạn</label>
                                <input type='text' value={nameHotel} className='form-control' onChange={(e) => setNameHotel(e.target.value)} />
                            </Space>
                            <Space>
                                <label>Số điện thoại</label>
                                <input type='tel' value={phone} className='form-control' onChange={(e) => setPhone(e.target.value)} />
                            </Space>
                            <Space>
                                <label>Hạng sao</label>
                                <input type='number' min={0} max={5} value={star} className='form-control' onChange={(e) => setStar(e.target.value)} />
                            </Space>
                        </Space>
                    </div>
                    <div className='col-6'>
                        <Space direction='vertical'>
                            <select
                                required
                                onChange={(e) => { setCityCode(e.target.value), setCity(getValue(e)) }}
                                value={cityCode}
                                className='form-control'
                            >
                                <option
                                    key={0}
                                    value={0}>
                                    Tỉnh/Thành phố
                                </option>
                                {listCity &&
                                    listCity.map((item) => {
                                        return (
                                            <option
                                                data-name={item.name}
                                                key={item.code}
                                                value={item.code}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                            <select
                                required
                                onChange={(e) => { setDistCode(e.target.value), setDist(getValue(e)) }}
                                value={distCode}
                                className='form-control'
                            >
                                <option
                                    key={0}
                                    value={0}>
                                    Quận/Huyện
                                </option>
                                {listDist &&
                                    listDist.map((item) => {
                                        return (
                                            <option
                                                data-name={item.name}
                                                key={item.code}
                                                value={item.code}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                            <select
                                required
                                onChange={(e) => setWard(getValue(e))}
                                className='form-control'
                            >
                                <option
                                    key={0}
                                    value={0}>
                                    Chọn Xã/Phường
                                </option>
                                {listWard &&
                                    listWard.map((item) => {
                                        return (
                                            <option
                                                data-name={item.name}
                                                title={item.name}
                                                key={item.code}
                                                value={item.code}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </Space>
                    </div>
                    <div className='mt-3'>
                        <input className='form-control' placeholder='Số nhà, tên đường' value={detail} onChange={(e) => setDetail(e.target.value)} />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalCreateHotel;