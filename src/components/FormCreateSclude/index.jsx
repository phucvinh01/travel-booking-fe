import { SaveFilled } from '@ant-design/icons'
import { Button, Select, Space, message } from 'antd'
import Upload from '../Uploads'
import React, { useState } from 'react'
import { postScheduleTour } from '../../Axios/Tour'
import cloudinary from '../../util/Cloudnary'

const FormCreateSclude = (props) => {
    const { getSclude, id } = props

    const [title, setTitle] = useState("")
    const [timeBegin, setTimeBegin] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [begin, setBegin] = useState("")
    const [end, setEnd] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [tranpost, setTranport] = useState("")

    const onChangeTranpost = (value) => {
        setTranport(value)
    }

    const handleSubmit = async () => {

        let res = await cloudinary(image)
        if (res.statusText === "OK") {
            let body = {
                "maTour": id,
                "thoiGianBatDau": timeBegin,
                "thoiGianKetThuc": timeEnd,
                "diemKhoiHanh": begin,
                "diemDen": end,
                "tieuDe": title,
                "moTa": description,
                "hinhAnh": res.data.secure_url,
                "maKhachSan": '1',
                "phuongTien": tranpost
            }
            let result = postScheduleTour(body)
            console.log(result);
            if (result) {
                message.success("Thêm thành công")
                getSclude(id)
            }
        }
    }


    return (
        <>
            <div className='d-flex justify-content-end'>
                <Button onClick={ () => handleSubmit() } icon={ <SaveFilled /> }>Lưu</Button>
            </div>
            <Space direction='vertical' style={ { minHeight: 200 } }>
                <Space size={ 'middle' }>
                    <label>Tiêu đề </label>
                    <input onChange={ (e) => setTitle(e.target.value) } value={ title } type='text' className='form-control' />
                </Space>
                <Space size={ 'middle' }>
                    <Space size={ 'middle' }>
                        <label>Giờ bắt đầu</label>
                        <input onChange={ (e) => setTimeBegin(e.target.value) } value={ timeBegin } type='datetime-local' className='form-control'></input>
                    </Space>
                    <Space size={ 'middle' }>
                        <label>Giờ kết thúc</label>
                        <input onChange={ (e) => setTimeEnd(e.target.value) } value={ timeEnd } type='datetime-local' className='form-control'></input>
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
                            {
                                value: "Tàu",
                                key: 3
                            }
                        ] }
                    />
                </Space>
                <Space size={ 'middle' }>
                    <label>Mô tả</label>
                    <input onChange={ (e) => setDescription(e.target.value) } value={ description } type='text' className='form-control' />
                </Space>
                <Upload setImage={ setImage } />
            </Space>

        </>

    )
}

export default FormCreateSclude