import { FacebookFilled, InstagramFilled } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo-main.jpg'

const Footer = () => {
    return (
        <footer className='container bg-light mt-3' style={ { borderTop: "1px solid #333" } }>
            <div className='row mt-3'>
                <div className='col-lg-4 col-md-6 col-sm-12 text-center' >
                    <img className='w-25 footer-logo' src={ logo } alt='logo'>
                    </img>
                    <p className='mb-1'>Let Travel</p>
                    <Space >
                        <InstagramFilled />
                        <FacebookFilled />
                    </Space>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12 text-center' ><h5>Discover</h5>
                    <Space direction='vertical'>
                        <NavLink to={ "/" }>Home</NavLink>
                        <NavLink to={ "/about" }>About</NavLink>
                        <NavLink to={ "/tours" }>Tours</NavLink>
                    </Space>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12 text-center' ><h5>Quick Links</h5>
                    <Space direction='vertical'>
                        <NavLink to={ "/" }>Gallery</NavLink>
                        <NavLink to={ "/about" }>Login</NavLink>
                        <NavLink to={ "/tours" }>Register</NavLink>
                    </Space>
                </div>
            </div>
        </footer>
    )
}

export default Footer