import { StarFilled } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'
import avatarDefautl from '../../assets/user-defautl.jpg'

const Item = (props) => {
    const { username, reviewText, rating } = props
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
                            <small >{ username }</small>
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