import React from 'react'
import logo from '../../../assets/logo-main.jpg'
import { NavLink, Link } from 'react-router-dom'
import { Space, Dropdown, Button } from 'antd'
import { UserOutlined, LoginOutlined } from '@ant-design/icons'
import './header.scss'
import Login from '../../../components/Login'
import Regsiter from '../../../components/Register'
import { useSelector } from 'react-redux'
import DropdownAuth from '../../../components/DropdownAuth'


const Header = () => {

    const user = useSelector((state) => state.auth.login.currentUser);

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



    return (
        <>
            <div className='header px-3 fixed-top'>
                <div className='row'>
                    <div className='col-2'>
                        <img src={ logo } width={ 60 }></img>
                    </div>
                    <div className='col-8 d-flex justify-content-center'><Space size={ 'large' }>
                        <NavLink to={ '/' } className={ 'nav-item' }>HOME</NavLink>
                        <NavLink to={ '/tours' } className={ 'nav-item' }>TOURS</NavLink>
                        <NavLink to={ '/about' } className={ 'nav-item' }>ABOUT</NavLink>
                    </Space></div>
                    <div className='col-2 d-flex justify-content-center'><Space>
                        {
                            !user ? <Dropdown key={ 1 } menu={ {
                                items,
                            } }
                                trigger={ ['click'] }
                            >
                                <Space style={ { cursor: 'pointer' } }>
                                    <UserOutlined />
                                    <p>Tài khoản</p>
                                </Space>
                            </Dropdown> : <DropdownAuth user={ user } />
                        }
                    </Space></div>

                </div>
            </div>

        </>
    )
}

export default Header