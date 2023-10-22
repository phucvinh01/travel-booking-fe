import { StarFilled } from '@ant-design/icons'
import { Space } from 'antd'
import React, { useEffect, useState } from 'react'
import avatarDefautl from '../../assets/user-defautl.jpg'
import { getOneCusTomerById } from '../../Axios/customer'

const Item = (props) => {
    const { username, reviewText, rating } = props
    const [customer, setCustomer] = useState({})

    const getNameCustomer = async (username) => {
        let r = await getOneCusTomerById(username)
        if (r) {
            setCustomer(r)
        }
    }

    useEffect(() => {
        getNameCustomer(username)
    }, [username])
    return (
        <>
            <div className='container my-3 border'>
                <Space size={ 'large' }>
                    <img
                        style={ { width: "60px" } }
                        src={ avatarDefautl }
                        alt='img-user'></img>
                    <Space>
                        <Space direction='vertical' size={ 'small' }>
                            <small >{ customer?.hoTen }</small>
                            <Space wrap>
                                <small >{ reviewText }</small>
                                <small>{ rating } <StarFilled /></small>
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </div>
        </>
    )
}

export default Item