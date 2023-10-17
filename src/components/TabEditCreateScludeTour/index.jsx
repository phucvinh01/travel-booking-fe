import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Tabs } from 'antd';
import { getScheduleTour } from '../../Axios/Tour';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';
import FormCreateSclude from '../FormCreateSclude';

const TabEditCreateScludeTour = (prop) => {
    useEffect(() => {
        getSclude(prop.id)
    }, [prop.id])
    const [state, setState] = useState([])

    const defaultPanes = state && state.map((item, index) => {
        return {
            label: `Ngày ${index + 1}`,
            children: <>
                <div className='d-flex justify-content-end'><Button icon={<EditOutlined />}></Button></div>
                <Space direction='vertical' style={{ minHeight: 300 }}>
                    <h5>{item.tieuDe}</h5>
                    <p>Từ {item.diemKhoiHanh} đến {item.diemDen}</p>
                    <p>Từ {moment(item.thoiGianBatDau).format('HH:mm')} đến {moment(item.thoiGianKetThuc).format('HH:mm')}</p>
                    {item.hinhAnh==="null" ?"" : <img width={200} src={"..//..//src/assets/Images/"+item.hinhAnh}/>}
                    
                    <p>
                        {item.moTa}
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
                label: <>{"Ngày " + (defaultPanes.length++)}</>,
                children: <>
                    <FormCreateSclude id={prop.id} getSclude={getSclude} />
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
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={add}>ADD</Button>
            </div>
            <Tabs
                tabPosition={'left'}
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
                items={items}
            />
        </div>
    );
};
export default TabEditCreateScludeTour;