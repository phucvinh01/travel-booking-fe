import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, Space } from "antd";
import { ClearOutlined, SearchOutlined } from '@ant-design/icons'
import './search.scss'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getToursFailed, getToursStart, getToursSuccess } from '../../redux/tourSlice';
import { useDispatch } from 'react-redux';
import { getAllActive, getListTourByName } from '../../Axios/Tour';
dayjs.extend(customParseFormat);
//import { getDataListSelect } from '../service/DataService';
const SearchFrom = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [dataList, setDataList] = useState([])
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const dateFormat = 'YYYY-MM-DD';
    const onChange = (date, dateString) => {
        setStartDate(dateString)
    };
    // console.log(startDate);
    const getDay = () => {
        const dayNumber = new Date(startDate).getDay();
        if (dayNumber == 0) {
            return 'Chủ nhật'
        }
        return 'Thứ ' + (dayNumber + 1);
    };

    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const handleSearch = async (text) => {
        dispatch(getToursStart());
        try {
            const res = await getListTourByName(text)
            if (res.statusCode && res.statusCode === 204) {
                dispatch(getToursFailed())
            }
            else {
                dispatch(getToursSuccess(res))
            }
        }
        catch (err) {
            dispatch(getToursFailed())
        }
    }

    const handleClear = async () => {
        dispatch(getToursStart());
        try {
            const res = await getAllActive()
            if (res.statusCode && res.statusCode === 204) {
                dispatch(getToursFailed())
            }
            else {
                dispatch(getToursSuccess(res))
            }
        }
        catch (err) {
            dispatch(getToursFailed())
        }
    }



    return (
        <div className='search rounded-2' >
            <Space direction='horizontal' >
                <input className='form-control fc' type="text" placeholder="Bạn muốn đi đâu?" onChange={(e) => setSearch(e.target.value)} />
                <Button style={{border: 'solid 1.5px rgb(172, 98, 0)'}} onClick={() => handleSearch(search)} icon={<SearchOutlined />} size='large'>
                    Tìm
                </Button>
                <Button  style={{border: 'solid 1.5px rgb(172, 98, 0)'}} onClick={() => handleClear()} icon={<ClearOutlined />} size='large'>
                </Button></Space>
        </div>
    )
}
export default SearchFrom;

