import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Tabs } from 'antd';
import { getScheduleTour } from '../../Axios/Tour';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import FormCreateSclude from '../FormCreateSclude';
import { useSelector } from 'react-redux';

const TabEditCreateScludeTour = (prop) => {
    const [img, setImg] = useState("")
    useEffect(() => {
        getSclude(prop.id)
    }, [prop.id])
    const [state, setState] = useState([])
    const handleImageError = (event, item) => {
        event.target.src = item.hinhAnh; // Đặt lại nguồn ảnh thành URL từ server khi xảy ra lỗi khi tải ảnh từ folder asset
    };
    const hotel = useSelector((state) => state.hotel.hotel.data);

    function findNameHotelById(arr, id) {
        const foundObject = arr.find(obj => obj.idKhachSan === id);
        if (foundObject) {
            return foundObject.tenKhachSan;
        }
        return null; // Trả về null nếu không tìm thấy đối tượng với id tương ứng
    }

    const defaultPanes = state && state.map((item, index) => {
        return {
            label: `Ngày ${index + 1}`,
            children: <>
                <div className='d-flex justify-content-end'><Button icon={ <EditOutlined /> }></Button></div>
                <Space direction='vertical' style={ { minHeight: 300 } }>
                    <h5>{ item.tieuDe }</h5>
                    <p> { item.diemKhoiHanh } đến { item.diemDen }</p>
                    <p>{ item.buaAn }</p>
                    <p>{ findNameHotelById(hotel, item.maKhachSan) }</p>
                    { item.hinhAnh === "null" ? "" : <img width={ 200 } src={ `..//..//src/assets/Images/${item.hinhAnh}` } onError={ (e) => handleImageError(e, item) } /> }

                    <p>
                        { item.moTa }
                    </p>
                </Space>

            </>,
            key: index
        };
    });

    useEffect(() => {
        setItems(defaultPanes)
        setActiveKey(defaultPanes[0]?.key)
    }, [state])


    const [activeKey, setActiveKey] = useState();
    const [items, setItems] = useState([]);
    const newTabIndex = useRef(0);
    const onChange = (key) => {
        setActiveKey(key);
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([
            ...items,
            {
                label: <>{ "Ngày " + (defaultPanes.length++) }</>,
                children: <>
                    <FormCreateSclude id={ prop.id } getSclude={ getSclude } />
                </>,
                key: newActiveKey,
            },
        ]);
        setActiveKey(newActiveKey);
    };
    const remove = (targetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };


    const getSclude = async (id) => {
        let res = await getScheduleTour(id)
        if (res) {
            setState(res)
        }
    }




    return (
        <div>
            <div
                style={ {
                    marginBottom: 16,
                } }
            >
                <Button onClick={ add }>ADD</Button>
            </div>
            <Tabs
                tabPosition={ 'left' }
                hideAdd
                onChange={ onChange }
                activeKey={ activeKey }
                type="editable-card"
                onEdit={ onEdit }
                items={ items }
            />
        </div>
    );
};
export default TabEditCreateScludeTour;