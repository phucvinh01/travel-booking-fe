import { HistoryOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd'
import React from 'react'
import Login from '../Login';
import Regsiter from '../Register';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutFailed, logoutStart, logoutSuccess } from '../../redux/authSlice';

const DropdownAuth = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        dispatch(logoutStart());
        try {
            dispatch(logoutSuccess())
            navigate('/')
        }
        catch (err) {
            dispatch(logoutFailed())

        }
    }
    const items = [
        {
            key: '1',
            label: (
                <Space>
                    <UserOutlined />
                    <NavLink to={'/me/profile'}>Profile</NavLink>
                </Space>
            ),
        },
        {
            key: '2',
            label: (
                <Space>
                    <HistoryOutlined />
                    <NavLink to={'/me/history'}>Lịch sử</NavLink>
                </Space>
            ),
        }
        ,
        {
            key: '3',
            label: (
                <Space>
                    <LogoutOutlined />
                    <NavLink onClick={handleLogOut}>LogOut</NavLink>
                </Space>
            ),
        }

    ];
    return (
        <>
            <Dropdown menu={{
                items,
            }}
                trigger={['click']}
            >
                <Space style={{ cursor: 'pointer' }}>
                    <UserOutlined />
                    <p>Xin chào {props.user?.email}</p>
                </Space>
            </Dropdown>
        </>
    )
}


export default DropdownAuth