import { CommentOutlined, StarFilled } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { useState } from 'react'
import avatarDefautl from '../../assets/user-defautl.jpg'
import moment from 'moment'
import FormRepLy from './FormRepLy'
import ListReply from './ListReply'

const Item = (props) => {
    const { username, text, day, idQuestion } = props
    const [showFormReply, setShowFormReply] = useState(false)

    return (
        <>
            <div className='container my-3'>
                <Space size={ 'large' }>
                    <img
                        style={ { width: "60px" } }
                        src={ avatarDefautl }
                        alt='img-user'></img>
                    <Space direction='vertical'>
                        <Space direction='horizontal' size={ 'small' }>
                            <small >{ username }</small>,
                            <small >{ moment(day).format('DD/MM/YYYY') }</small>
                        </Space>
                        <Space wrap>
                            <small>{ text }</small>
                        </Space>
                    </Space>
                    <div className='d-flex justify-content-end'>
                        <Button onClick={ () => setShowFormReply(!showFormReply) } title='Trả lời' type='text' icon={ <CommentOutlined /> }></Button>
                    </div>
                </Space>
            </div>
            <ListReply idQuestion={ idQuestion } />
            <FormRepLy showFormReply={ showFormReply } username={ username } />
        </>
    )
}

export default Item