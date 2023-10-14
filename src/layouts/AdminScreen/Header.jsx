import React from 'react'
import logo from '../../assets/logo-main.jpg'
import { Button, Dropdown, Space } from 'antd'
import { Airplane, Article, House, Path, TrainSimple, UserCircle, UserFocus, UsersFour } from 'phosphor-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./Header.scss";
import { DownOutlined, LoginOutlined } from '@ant-design/icons'
import { logoutFailed, logoutStart, logoutSuccess } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'




const Header = () => {

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
                    <Button onClick={handleLogOut} icon={<LoginOutlined />}
                    >
                        <span>Đăng xuất</span>
                    </Button>
                </Space>

            ),
        },
    ];
    return (
        <header>
            <nav
                id='sidebarMenu'
                className='collapse d-lg-block sidebar collapse bg-white'>
                <div className='position-sticky'>
                    <div className='list-group list-group-flush mx-3 mt-4'>
                        <Space size={'large'} direction='vertical'>
                            <NavLink
                                to={'/admin/tour'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <Path size={32} weight="fill" />
                                    <p>Quản lý Tour</p>
                                </Space>

                            </NavLink>
                            <NavLink to={'/admin/emp'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <UsersFour size={32} weight="fill" />
                                    <p>Quản lý nhân viên</p>
                                </Space>
                            </NavLink>
                            <NavLink to={'/admin/customer'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <UserFocus size={32} weight="fill" />
                                    <p>Quản lý khách hàng</p>
                                </Space>

                            </NavLink>
                            <NavLink to={'/admin/order'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <Article size={32} weight="fill" />
                                    <p>Quản lý đặt tua</p>
                                </Space>

                            </NavLink>
                            <NavLink to={'/admin/hotel'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <House size={32} weight="fill" />
                                    <p>Quản lý khách sạn</p>
                                </Space>

                            </NavLink>
                            <NavLink to={'/admin/tranpost'}
                                className='list-group-item list-group-item-action py-2 ripple'
                                aria-current='true'>
                                <Space size={'large'}>
                                    <Airplane size={32} weight="fill" />
                                    <p>Quản lý phương tiện</p>
                                </Space>

                            </NavLink>

                        </Space>
                    </div>
                </div>
            </nav>
            <nav
                id='main-navbar'
                className='navbar navbar-expand-lg navbar-light bg-white fixed-top' style={{ zIndex: 500 }}>
                <div className='container-fluid'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#sidebarMenu'
                        aria-controls='sidebarMenu'
                        aria-expanded='false'
                        aria-label='Toggle navigation'>
                    </button>
                    <Link
                        className='navbar-brand'
                        to={'/admin'}>
                        <img
                            src={logo}
                            height='50'
                            alt=''
                            loading='lazy'
                        />
                    </Link>
                    <ul className='navbar-nav ms-auto d-flex flex-row'>
                        <Dropdown
                            trigger={['click']}
                            menu={{
                                items,
                            }}
                        >
                            <Space>
                                <UserCircle size={32} />
                                <DownOutlined />
                            </Space>
                        </Dropdown>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header