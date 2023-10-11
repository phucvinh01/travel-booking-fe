import { Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'antd';
import formatCurrency from '../../../util/formatCurrency';
import { date } from 'yup';
import dayjs from 'dayjs';
const { Title } = Typography;
import moment from 'moment'
const ItemVer2 = (props) => {
    const { data } = props
    const date = moment();
    const navigate = useNavigate()
    return (
        <>
            <div className='border p-2 rounded-3 row mb-3'>
                <div className='col-4'>
                    <img width={ 140 } height={ 140 } src={ data.anhBia }></img>
                </div>
                <div className='col-4'>
                    <Space direction='vertical' size={ 'small' }>
                        <p> <strong> { data.tenTour }</strong></p>
                        <p>{ data.moTa }</p>
                        <p>{ data.phuongTienDiChuyen }</p>
                    </Space>
                </div>
                <div className='col-2'>
                    <Space direction='vertical'>
                        <p>Ngày khởi hành: <small>{ moment(data.ngayLap).format('MM/DD/YYYY') }</small></p>
                        <p> { formatCurrency.format(data?.chiPhi) }</p>
                    </Space>
                </div>
            </div>
        </>
    )
}

export default ItemVer2