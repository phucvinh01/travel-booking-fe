import { SaveFilled } from '@ant-design/icons'
import { Button, Select, Space, Spin, message } from 'antd'
import Upload from '../Uploads'
import React, { useState } from 'react'
import { postScheduleTour } from '../../Axios/Tour'
import cloudinary from '../../util/Cloudnary'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const FormCreateSclude = (props) => {
    const { getSclude, id } = props

    const [title, setTitle] = useState("")
    const [day, setDay] = useState(0)
    const [timeBegin, setTimeBegin] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [begin, setBegin] = useState("")
    const [end, setEnd] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [tranpost, setTranport] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [full, setFull] = useState(false)
    const hotel = useSelector((state) => state.hotel.hotel.data);

    useEffect(() => {
        if (title && timeBegin, timeEnd, begin, end, image, description, tranpost)
            setFull(true)
    }, [title, timeBegin, timeEnd, begin, end, description, tranpost, image])

    const onChangeTranpost = (value) => {
        setTranport(value)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let body = {
                "maTour": id,
                "ngayThu": `Thứ ${day}`,
                "buaAn": timeBegin,
                "diemKhoiHanh": begin,
                "diemDen": end,
                "tieuDe": title,
                "moTa": description,
                "hinhAnh": res.data.secure_url,
                "maKhachSan": timeEnd,
                "phuongTien": tranpost
            }
            let result = await postScheduleTour(body)
            if (result) {
                message.success("Thêm thành công")
                getSclude(id)
            }
        }
        setIsLoading(false)

    }


    return (
        <>
            <div className='d-flex justify-content-end'>
                <Button disabled={ !full ? true : false } onClick={ () => handleSubmit() } icon={ <SaveFilled /> }>{ isLoading ? <Spin /> : "Lưu" }</Button>
            </div>
            <Space direction='vertical' style={ { minHeight: 200 } }>
                <Space size={ 'middle' }>
                    <label>Ngày thứ </label>
                    <input onChange={ (e) => setDay(e.target.value) } value={ day } type='number' className='form-control' />
                </Space>
                <Space size={ 'middle' }>
                    <label>Tiêu đề </label>
                    <input onChange={ (e) => setTitle(e.target.value) } value={ title } type='text' className='form-control' />
                </Space>
                <Space size={ 'middle' }>
                    <Space size={ 'middle' }>
                        <label>Bữa ăn</label>
                        <input onChange={ (e) => setTimeBegin(e.target.value) } value={ timeBegin } type='text' className='form-control'></input>
                    </Space>
                </Space>
                <Space size={ 'middle' }>
                    <Space size={ 'middle' }>
                        <label>Nơi khởi hành</label>
                        <input onChange={ (e) => setBegin(e.target.value) } value={ begin } type='text' className='form-control' />
                    </Space>
                    <Space size={ 'middle' }>
                        <label>Nơi đến</label>
                        <input onChange={ (e) => setEnd(e.target.value) } value={ end } type='text' className='form-control' />
                    </Space>
                    <label
                        htmlFor={ id + '-hotel' }
                        className='form-label fw-bolder'>
                        Khách sạn
                    </label>
                    <Select
                        defaultValue={ {
                            value: null,
                            label: "default",
                            key: 1
                        } }
                        size='large'
                        onChange={ (value) => setTimeEnd(value) }
                        id='hotel'
                        placeholder="Search to Select"
                        style={ {
                            width: 200
                        } }
                        showSearch
                        optionFilterProp="children"
                        filterOption={ (input, option) => (option?.label ?? '').includes(input) }
                        filterSort={ (optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={ hotel && hotel.length > 0 && hotel.map((item) => {
                            return (
                                {
                                    value: item.idKhachSan,
                                    label: item.tenKhachSan,
                                    key: item.idKhachSan
                                }
                            )
                        }) }
                    />

                </Space>
                <Space size={ 'middle' }>
                    <label
                        className='form-label'>
                        Phương tiện di chuyển
                    </label>
                    <Select
                        size='large'
                        onChange={ onChangeTranpost }
                        id='tranpost'
                        style={ {
                            width: 200,
                        } }
                        allowClear
                        options={ [
                            {
                                value: "Xe",
                                key: 1
                            },
                            {
                                value: "Máy bay",
                                key: 2
                            },
                        ] }
                    />
                </Space>
                <Space size={ 'middle' }>
                    <label>Mô tả</label>
                    <textarea contentEditable={ true } onChange={ (e) => setDescription(e.target.value) } value={ description } type='text' className='form-control' />
                </Space>
                <Upload setImage={ setImage } />
            </Space>

        </>

    )
}

export default FormCreateSclude