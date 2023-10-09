import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Button, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import './search.scss'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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

    return (
        <div className='search rounded-2'>
            <Space direction='vertical' >
                <input className='form-control' type="text" placeholder="Bạn muốn đi đâu?" />
                <Space direction='horizontal' >

                    <Space className='bg-white p-1 rounded-2'>
                        <label className='d-block'>{ getDay() } </label>
                        <DatePicker onChange={ onChange } defaultValue={ dayjs(date, dateFormat) } />
                    </Space>
                    <Space className='bg-white p-1 rounded-2'><label className='text-dark'>Xuất phát từ</label>
                        <Select style={ { width: 150 } }>
                            {/* {
                                dataList && dataList.map((item, index) => {
                                    return (<option key={ index } value={ item.name }>{ item.name }</option>)
                                })
                            } */}
                        </Select>
                    </Space>
                    <Button icon={ <SearchOutlined /> } size='large'>
                        Tìm
                    </Button>
                </Space>
            </Space>
        </div>
    )
}
export default SearchFrom;

