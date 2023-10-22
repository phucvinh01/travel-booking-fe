import { CommentOutlined, DownCircleFilled, DownCircleOutlined, StarFilled, UpCircleOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import avatarDefautl from '../../assets/user-defautl.jpg'
import moment from 'moment'
import FormRepLy from './FormRepLy'
import ListReply from './ListReply'
import { getOneCusTomerById } from '../../Axios/customer'

const Item = (props) => {
    const { username, text, day, idQuestion, repley, idTour, hidden } = props
    const [showFormReply, setShowFormReply] = useState(false)
    const [showReply, setShowReply] = useState(false)
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
            <div className='container my-3'>
                <Space size={ 'large' }>
                    <img
                        style={ { width: "60px" } }
                        src={ avatarDefautl }
                        alt='img-user'></img>
                    <Space direction='vertical'>
                        <Space direction='horizontal' size={ 'small' }>
                            <small >{ customer?.hoTen }</small>,
                            <small >{ moment(day).format('DD/MM/YYYY') }</small>
                        </Space>
                        <Space wrap>
                            <small>{ text }</small>
                        </Space>
                    </Space>
                    <div hidden={ hidden }>
                        <div className='d-flex justify-content-end'>
                            <Button onClick={ () => setShowFormReply(!showFormReply) } title='Trả lời' type='text' icon={ <CommentOutlined /> }></Button>
                        </div>
                    </div>
                    {
                        repley?.length > 0 ? <div hidden={ hidden }>
                            {
                                showReply ? <Button title='Show các câu trả lời' onClick={ () => setShowReply(!showReply) } type='text' icon={ <DownCircleOutlined /> }>Có { repley?.length } câu trả lời</Button>
                                    : <Button type='text' onClick={ () => setShowReply(!showReply) } title='Thu gọn' icon={ <UpCircleOutlined /> } />
                            }
                        </div> : ""
                    }
                </Space>
            </div>
            <ListReply idQuestion={ idQuestion } repley={ repley && repley } showReply={ showReply } />
            <FormRepLy idTour={ idTour } setShowFormReply={ setShowFormReply } showFormReply={ showFormReply } username={ username } idQuestion={ idQuestion } />
        </>
    )
}

export default Item