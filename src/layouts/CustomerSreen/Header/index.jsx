import React from 'react'
import logo from '../../../assets/logo-main.jpg'
import { NavLink, Link } from 'react-router-dom'
import { Space, Dropdown } from 'antd'
import { UserOutlined, LoginOutlined } from '@ant-design/icons'
import './header.scss'
import Login from '../../../components/Login'
import Regsiter from '../../../components/Register'


const items = [
    {
        key: '1',
        label: (
            <>
                <Login />
            </>
        ),
    },
    {
        key: '2',
        label: (
            <>
                <Regsiter />
            </>
        ),
    }

];


const Header = () => {
    return (
        <>
            <div className='header px-3'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src={ logo } width={ 60 }></img>
                    </div>
                    <Space size={ 'large' }>
                        <NavLink to={ '/' } className={ 'nav-item' }>Home</NavLink>
                        <NavLink to={ '/tours' } className={ 'nav-item' }>Tours</NavLink>
                        <NavLink to={ '/about' } className={ 'nav-item' }>About</NavLink>
                    </Space>
                    <Space>
                        <Dropdown menu={ {
                            items,
                        } }
                            trigger={ ['click'] }
                        >
                            <Space style={ { cursor: 'pointer' } }>
                                <UserOutlined />
                                <p>Tài khoản</p>
                            </Space>
                        </Dropdown>
                    </Space>

                </div>
            </div>

        </>
    )
}

export default Header